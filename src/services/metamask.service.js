import { assetAmount, assetToBase, baseAmount } from '@xchainjs/xchain-util';
import { ethers } from 'ethers';
import { BehaviorSubject } from 'rxjs';
import { erc20ABI } from './erc20.abi';


import { ETH_DECIMAL, getTokenAddress } from '@xchainjs/xchain-ethereum';
import { TCAbi } from './thorchain.abi';



window.ethereum = window.ethereum || {};

export class MetamaskService {
    _provider = new BehaviorSubject(null);
    provider$ = this._provider.asObservable();

    _metaMaskNetwork = new BehaviorSubject(null);
    metaMaskNetwork$ = this._metaMaskNetwork.asObservable();

    constructor(userService) {
        if (window.ethereum && window.ethereum.on) {
            window.ethereum.on('accountsChanged', (a) =>
                this.handleAccountsChanged(a, this._provider)
            );

            window.ethereum.on('chainChanged', (_chainId) => {
                switch (+_chainId) {
                    case 1:
                        window.location.href = 'https://app.asgard.exchange';
                        this._metaMaskNetwork.next('mainnet');
                        break;

                    case 3:
                        window.location.href = 'https://testnet.asgard.exchange';
                        this._metaMaskNetwork.next('testnet');
                        break;

                    default:
                        this._metaMaskNetwork.next(null);
                        window.location.reload();
                        break;
                }
            });
            this.init();
        }
    }

    async handleAccountsChanged(
        accounts,
        provider,
    ) {
        const ethProvider = new ethers.providers.Web3Provider(window.ethereum);
        if (provider && accounts.length > 0) {
            provider.next(ethProvider);
            this.setMetaMaskNetwork(ethProvider);
        } else {
            this.userService.setUser(null);
        }
    }

    async callDeposit({
        ethInboundAddress,
        asset,
        input,
        memo,
        userAddress,
        signer,
    }) {
        const gasPrice = baseAmount(
            ethers.utils.parseUnits(ethInboundAddress.gas_rate, 'gwei').toString(),
            ETH_DECIMAL
        )
            .amount()
            .toFixed(0);

        let hash;
        let decimal;
        const vaultContract = new ethers.Contract(ethInboundAddress.router, TCAbi);

        if (asset.symbol === 'ETH') {
            decimal = ETH_DECIMAL;
        } else {
            const tokenAddress = getTokenAddress(asset);
            const tokenContract = new ethers.Contract(tokenAddress, erc20ABI, signer);
            decimal = await tokenContract.decimals();
        }

        let amount = assetToBase(assetAmount(input, decimal)).amount();
        let resp;

        if (asset.ticker === 'ETH') {
            const unsignedTx = await vaultContract.populateTransaction.deposit(
                ethInboundAddress.address,
                '0x0000000000000000000000000000000000000000',
                amount.toFixed(),
                memo,
                { from: userAddress, value: amount.toFixed(), gasPrice }
            );
            resp = await signer.sendTransaction(unsignedTx);
        } else {
            const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
            const strip0x = assetAddress.substr(2);
            const checkSummedAddress = ethers.utils.getAddress(strip0x);
            const params = [
                ethInboundAddress.address, // vault
                checkSummedAddress, // asset
                amount.toFixed(), // amount
                memo,
            ];
            const unsignedTx = await vaultContract.populateTransaction.deposit(
                ...params,
                { from: userAddress, gasPrice }
            );
            resp = await signer.sendTransaction(unsignedTx);
            console.log('resp is: ', resp);
        }

        // prettier-ignore
        hash = typeof (resp) === 'string' ? resp : resp?.hash || '';
        return hash;
    }

    async init() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const lastLoginType = localStorage.getItem('lastLoginType');
        if (provider && lastLoginType === 'metamask') {
            this.setProvider(provider);
            this.setMetaMaskNetwork(provider);
        } else {
            this.setProvider(null);
        }
    }

    setProvider(provider) {
        this._provider.next(provider);
    }

    async setMetaMaskNetwork(provider) {
        if (!provider) {
            this._metaMaskNetwork.next(null);
            return;
        }

        const network = await provider.getNetwork();

        if (network.chainId === 3) {
            this._metaMaskNetwork.next('testnet');
        } else if (network.chainId === 1) {
            this._metaMaskNetwork.next('mainnet');
        } else {
            this._metaMaskNetwork.next(null);
        }
    }

    async connect() {
        const enable = await window.ethereum.enable();
        if (enable instanceof Array && enable.length > 0) {
            this.handleAccountsChanged(enable, this._provider);
        }
        return enable;
    }
}

import { Injectable } from '@angular/core';
import { get } from 'lodash';
import { environment } from '../environments';
import {
  ApproveParams,
  estimateDefaultFeesWithGasPricesAndLimits,
  ETHAddress,
  getTokenAddress,
  TxOverrides,
} from '@xchainjs/xchain-ethereum/lib';
import { User } from './user';
import { BigNumber } from '@ethersproject/bignumber';
import { ethers } from 'ethers';
import { erc20ABI } from './erc20.abi';
import { AssetETH, assetToString } from '@xchainjs/xchain-util';
import { toUtf8Bytes } from '@ethersproject/strings';
import { Address } from '@xchainjs/xchain-client';
import { hexlify } from '@ethersproject/bytes';
import { MockClientService } from './mock-client.service';
import { Client as binanceClient } from '@xchainjs/xchain-binance';
import { Client as bitcoinClient } from '@xchainjs/xchain-bitcoin';
import { Client as thorchainClient } from '@xchainjs/xchain-thorchain';
import { Client as litecoinClient } from '@xchainjs/xchain-litecoin';
import { Client as bitcoinCashClient } from '@xchainjs/xchain-bitcoincash';
import { Client as ethereumClient } from '@xchainjs/xchain-ethereum/lib';
import { Chain } from '@xchainjs/xchain-util';
import { Network } from '@xchainjs/xchain-client';


export class XDEFIService {
  MOCK_PHRASE =
  'image rally need wedding health address purse army antenna leopard sea gain';
mockBinanceClient;
mockBtcClient;
mockThorchainClient;
mockEthereumClient;
mockLtcClient;
mockBchClient;


   static listProvider = [
    {
      title: 'Ethereum Provider',
      providerPath: 'ethereum',
      enabled: true,
      disableNetworkValidation: true,
    },
    {
      title: 'Bitcoin Provider',
      providerPath: ['xfi', 'bitcoin'],
      enabled: true,
    },
    {
      title: 'BinanceDEX Provider',
      providerPath: ['xfi', 'binance'],
      enabled: true,
    },
    {
      title: 'BitcoinCash Provider',
      providerPath: ['xfi', 'bitcoincash'],
      enabled: true,
    },
    {
      title: 'LiteCoin Provider',
      providerPath: ['xfi', 'litecoin'],
      enabled: true,
    },
    {
      title: 'Thorchain Provider',
      providerPath: ['xfi', 'thorchain'],
      enabled: true,
    },
  ];
  constructor( ) {  
    // console.log("mockClientService",mockClientService.mockBchClient())
    // console.log("mockClientService",mockClientService)
    // this.mockClientService = mockClientService
    const network =
    environment.network === "testnet" ? Network.Testnet : Network.Mainnet;
  const phrase = this.MOCK_PHRASE;

  this.mockBinanceClient =  new binanceClient({ network, phrase });

  this.mockBtcClient = new bitcoinClient({
    network,
    phrase,
    sochainUrl: 'https://sochain.com/api/v2',
    blockstreamUrl: 'https://blockstream.info',
  });
  this.mockThorchainClient = new thorchainClient({ network, phrase });
  this.mockEthereumClient = new ethereumClient({
    network,
    phrase,
    etherscanApiKey: environment.etherscanKey,
    infuraCreds: { projectId: environment.infuraProjectId },
  });
  this.mockLtcClient = new litecoinClient({ network, phrase });
  this.mockBchClient = new bitcoinCashClient({ network, phrase });
}



  isValidNetwork() {
    const invalidNetworkProvider = XDEFIService.listProvider.find(
      ({ providerPath, disableNetworkValidation }) => {
        const providerInfo = get(window, providerPath);
        if (disableNetworkValidation || !providerInfo) {
          return false;
        }
        const projectNetwork =
          environment.network === 'testnet' ? 'testnet' : 'mainnet';
        return projectNetwork !== providerInfo.network;
      }
    );
    return !invalidNetworkProvider;
  }

  listEnabledXDFIProviders() {
    return XDEFIService.listProvider.map((provider) => ({
      ...provider,
      // @ts-ignore
      enabled: get(window, provider.providerPath),
    }));
  }

  async initXDEFI() {}

  async getBnbAddress(){
    if (!window.xfi.binance) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.binance.request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getBtcAddress() {
    if (!window.xfi.bitcoin) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.bitcoin.request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getBchAddress(){
    if (!window.xfi.bitcoincash) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.bitcoincash.request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getEthAddress() {
    if (!window?.ethereum) {
      return;
    }
    return window?.ethereum.request({
      method: 'eth_requestAccounts',
      params: [],
    });
  }

  async getThorChainAddress(){
    if (!window.xfi.thorchain) {
      return;
    }
    return new Promise((resolve, reject) => {
      window.xfi.thorchain.request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async getLtcAddress() {
    if (!window?.xfi?.litecoin) {
      console.log("xfi not defined")
      return ;
    }
    return new Promise((resolve, reject) => {
      window?.xfi?.litecoin.request(
        {
          method: 'request_accounts',
          params: [],
        },
        (err, accounts) => {
          if (err) {
            return reject(err);
          }
          return resolve(accounts[0]);
        }
      );
    });
  }

  async connectXDEFI() {
    const userBinanceClient = this.mockBinanceClient;
    const userBtcClient = this.mockBtcClient;
    const userThorchainClient = this.mockThorchainClient;
    const userEthereumClient = this.mockEthereumClient;
    const userLtcClient = this.mockLtcClient;
    const userbchClient = this.mockBchClient;
    const [thorAddress] = await Promise.all([
      this.getThorChainAddress(),
      new Promise((resolve) => setTimeout(resolve, 100)),
    ]);
    const [bnbAddress, btcAddress, bchAddress, ethAddresses, ltcAddress] =
      await Promise.all([
        this.getBnbAddress(),
        this.getBtcAddress(),
        this.getBchAddress(),
        // this.getEthAddress(),
        this.getLtcAddress(),
      ]);

      console.log('userThorchainClient.getAddress',userThorchainClient.getAddress)

    userThorchainClient.getAddress = () => thorAddress;
    userBinanceClient.getAddress = () => bnbAddress;
    userBtcClient.getAddress = () => btcAddress;
    userbchClient.getAddress = () => bchAddress;
    userEthereumClient.getAddress = () => ethAddresses?.[0];
    userLtcClient.getAddress = () => ltcAddress;

    // Binance
    userBinanceClient.transfer = async (transferParams) => {
      console.log('userBinanceClient.transfer', transferParams);
      return new Promise((resolve, reject) => {
        window.xfi.binance.request(
          {
            method: 'transfer',
            params: [
              {
                ...transferParams,
                from: bnbAddress,
                amount: {
                  amount: transferParams.amount.amount().toString(),
                  decimals: transferParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };

    // Bitcoin
    userBtcClient.transfer = async (transferParams) => {
      console.log('userBtcClient.transfer', transferParams);
      return new Promise((resolve, reject) => {
        window.xfi.bitcoin.request(
          {
            method: 'transfer',
            params: [
              {
                ...transferParams,
                from: btcAddress,
                amount: {
                  amount: transferParams.amount.amount().toString(),
                  decimals: transferParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };

    // BCH
    userbchClient.transfer = async (transferParams) => {
      console.log('userbchClient.transfer', transferParams);
      return new Promise((resolve, reject) => {
        window.xfi.bitcoincash.request(
          {
            method: 'transfer',
            params: [
              {
                ...transferParams,
                from: bchAddress,
                amount: {
                  amount: transferParams.amount.amount().toString(),
                  decimals: transferParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };
    // Eth
    userEthereumClient.approve = async ({
      // spender,
      // sender,
      spenderAddress,
      contractAddress,
      amount,
      feeOptionKey,
    }) => {
      const gasPrice =
        feeOptionKey &&
        BigNumber.from(
          (
            await userEthereumClient
              .estimateGasPrices()
              .then((prices) => prices[feeOptionKey])
              .catch(() => {
                const { gasPrices } =
                  estimateDefaultFeesWithGasPricesAndLimits();
                return gasPrices[feeOptionKey];
              })
          )
            .amount()
            .toFixed()
        );
      const gasLimit = await userEthereumClient
        .estimateApprove({ spenderAddress, contractAddress, amount })
        .catch(() => undefined);

      const txAmount = amount
        ? BigNumber.from(amount.amount().toFixed())
        : BigNumber.from(2).pow(256).sub(1);
      const contract = new ethers.Contract(contractAddress, erc20ABI);
      const unsignedTx = await contract.populateTransaction.approve(
        spenderAddress,
        txAmount,
        {
          from: userEthereumClient.getAddress(),
          gasPrice,
          gasLimit,
        }
      );
      unsignedTx.from = ethAddresses[0];
      return window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [unsignedTx],
        })
        .then((hash) => {
          return {
            hash,
          };
        });
    };
    const oldWallet = userEthereumClient.getWallet();
    oldWallet.getAddress = async () => ethAddresses[0];
    oldWallet.sendTransaction = (unsignedTx) => {
      unsignedTx.value = hexlify(BigNumber.from(unsignedTx.value || 0));
      return window.ethereum
        .request({
          method: 'eth_sendTransaction',
          params: [unsignedTx],
        })
        .then((hash) => {
          return {
            hash,
          };
        });
    };
    oldWallet.signTransaction = (unsignedTx) => {
      unsignedTx.value = hexlify(BigNumber.from(unsignedTx.value || 0));

      return window.ethereum.request({
        method: 'eth_signTransaction',
        params: [unsignedTx],
      });
    };
    const newGetWallet = () => {
      return oldWallet;
    };
    userEthereumClient.getWallet = newGetWallet;
    userEthereumClient.transfer = async ({
      asset,
      memo,
      amount,
      recipient,
      feeOptionKey,
      gasPrice,
      gasLimit,
    }) => {
      console.log({
        method: 'ethCLient.transfer',
        asset,
        memo,
        amount,
        recipient,
        feeOptionKey,
        gasPrice,
        gasLimit,
      });
      try {
        const txAmount = BigNumber.from(amount.amount().toFixed());

        let assetAddress;
        if (asset && assetToString(asset) !== assetToString(AssetETH)) {
          assetAddress = getTokenAddress(asset);
        }

        const isETHAddress = assetAddress === ETHAddress;

        // feeOptionKey

        const defaultGasLimit = isETHAddress
          ? BigNumber.from(21000)
          : BigNumber.from(100000);

        let overrides = {
          gasLimit: gasLimit || defaultGasLimit,
          gasPrice: gasPrice && BigNumber.from(gasPrice.amount().toFixed()),
        };

        // override `overrides` if `feeOptionKey` is provided
        if (feeOptionKey) {
          const _gasPrice = await userEthereumClient
            .estimateGasPrices()
            .then((prices) => prices[feeOptionKey])
            .catch(
              () =>
                estimateDefaultFeesWithGasPricesAndLimits().gasPrices[
                  feeOptionKey
                ]
            );
          const _gasLimit = await userEthereumClient
            .estimateGasLimit({ asset, recipient, amount, memo })
            .catch(() => defaultGasLimit);

          overrides = {
            gasLimit: _gasLimit,
            gasPrice: BigNumber.from(_gasPrice.amount().toFixed()),
          };
        }

        let txResult;
        if (assetAddress && !isETHAddress) {
          // Transfer ERC20
          const contract = new ethers.Contract(assetAddress, erc20ABI);
          const unsignedTx = await contract.populateTransaction.transfer(
            recipient,
            txAmount,
            Object.assign({}, overrides)
          );
          unsignedTx.from = ethAddresses[0];
          txResult = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [unsignedTx],
          });
        } else {
          // Transfer ETH
          const transactionRequest = Object.assign(
            { to: recipient, value: txAmount },
            {
              ...overrides,
              data: memo ? toUtf8Bytes(memo) : undefined,
            }
          );
          txResult = await window.ethereum.request({
            method: 'eth_sendTransaction',
            params: [transactionRequest],
          });
        }

        return txResult.hash || txResult;
      } catch (error) {
        console.error(error);
        return Promise.reject(error);
      }
    };

    userEthereumClient.call = async ({
      walletIndex,
      contractAddress,
      abi,
      funcName,
      funcParams,
    }) => {
      try {
        let params = funcParams ?? [];
        if (!contractAddress) {
          return Promise.reject(new Error('address must be provided'));
        }
        const contract = new ethers.Contract(
          contractAddress,
          abi,
          userEthereumClient.getProvider()
        );
        const txResult = await contract[funcName](...params, {
          from: ethAddresses[0],
        });
        console.log({ txResult });
        return txResult;
      } catch (error) {
        console.error(error);
        console.error('stack');
        return Promise.reject(error);
      }
    };
    // Thor
    userThorchainClient.deposit = async (depositParams) => {
      console.log('userThorchainClient.deposit', depositParams);
      return new Promise((resolve, reject) => {
        window.xfi.thorchain.request(
          {
            method: 'deposit',
            params: [
              {
                ...depositParams,
                from: thorAddress,
                amount: {
                  amount: depositParams.amount.amount().toString(),
                  decimals: depositParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };
    userThorchainClient.transfer = async (transferParams) => {
      console.log('userThorchainClient.transfer', transferParams);
      return new Promise((resolve, reject) => {
        window.xfi.thorchain.request(
          {
            method: 'transfer',
            params: [
              {
                ...transferParams,
                from: thorAddress,
                amount: {
                  amount: transferParams.amount.amount().toString(),
                  decimals: transferParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };
    // Ltc
    userLtcClient.transfer = async (transferParams) => {
      console.log('userLtcClient.transfer', transferParams);
      return new Promise((resolve, reject) => {
        window.xfi.litecoin.request(
          {
            method: 'transfer',
            params: [
              {
                ...transferParams,
                from: ltcAddress,
                amount: {
                  amount: transferParams.amount.amount().toString(),
                  decimals: transferParams.amount.decimal,
                },
              },
            ],
          },
          (err, result) => {
            if (err) {
              return reject(err);
            }
            return resolve(result);
          }
        );
      });
    };

    console.log({
      thorAddress,
      bnbAddress,
      btcAddress,
      bchAddress,
      ethAddresses,
      ltcAddress,
    });

    const newUser = new User({
      type: 'XDEFI',
      wallet: thorAddress,
      clients: {
        binance: userBinanceClient,
        bitcoin: userBtcClient,
        bitcoinCash: userbchClient,
        thorchain: userThorchainClient,
        ethereum: userEthereumClient,
        litecoin: userLtcClient,
      },
    });

    // window.xfi.thorchain.on('chainChanged', (obj) => {
    //   console.log('changed', obj);
    //   const envNetwork =
    //     environment.network === 'testnet' ? 'testnet' : 'mainnet';
    //   if (obj.network !== envNetwork) {
    //     // alert("XDEFI: Incorrect network, Reloading");
    //     window.location.reload();
    //   }
    // });
    

    return newUser;
  }
  getMockClientByChain(chain) {
    switch (chain) {
      case 'BTC':
        return this.mockBtcClient;

      case 'ETH':
        return this.mockEthereumClient;

      case 'BNB':
        return this.mockBinanceClient;

      case 'BCH':
        return this.mockBchClient;

      case 'LTC':
        return this.mockLtcClient;

      case 'THOR':
        return this.mockThorchainClient;
    }

    throw new Error(`mock client no matching client for chain: ${chain}`);
  }
}

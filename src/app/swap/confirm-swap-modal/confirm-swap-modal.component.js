import { Component, OnDestroy, OnInit } from '@angular/core';
import { TransactionConfirmationState } from 'src/app/_const/transaction-confirmation-state';
import {
  TxActions,
  TxStatus,
} from 'src/app/_services/transaction-status.service';
import {
  baseAmount,
  assetToBase,
  assetAmount,
  assetToString,
  Chain,
} from '@xchainjs/xchain-util';

@Component({
  selector: 'app-confirm-swap-modal',
  templateUrl: './confirm-swap-modal.component.html',
  styleUrls: ['./confirm-swap-modal.component.scss'],
})
export class ConfirmSwapModalComponent extends OnInit, OnDestroy {
  confirmationPending;
  transactionSubmitted;
  txState;
  hash;
  subs;
  error;
  ethNetworkFee;
  insufficientChainBalance;
  estimatedMinutes;
  balances;
  metaMaskProvider;

  constructor(
    swapData,
    dialogRef,
    midgardService,
    txStatusService,
    userService,
    slipLimitService,
    ethUtilsService,
    metaMaskService
  ) {
    this.txState = TransactionConfirmationState.PENDING_CONFIRMATION;
    this.insufficientChainBalance = false;

    const user$ = this.userService.user$.subscribe((user) => {
      if (!user) {
        this.closeDialog();
      }
    });

    const metaMaskProvider$ = this.metaMaskService.provider$.subscribe(
      (provider) => (this.metaMaskProvider = provider)
    );

    const balances$ = this.userService.userBalances$.subscribe(
      (balances) => (this.balances = balances)
    );

    this.subs = [user$, balances$, metaMaskProvider$];
  }

  ngOnInit() {
    this.estimateTime();
  }

  async estimateTime() { //====
    if (
      this.swapData.sourceAsset.chain === 'ETH' &&
      this.swapData.sourceAsset.symbol !== 'ETH'
    ) {
      this.estimatedMinutes = await this.ethUtilsService.estimateERC20Time(
        assetToString(this.swapData.sourceAsset),
        this.swapData.inputValue
      );
    } else {
      this.estimatedMinutes = this.txStatusService.estimateTime(
        this.swapData.sourceAsset.chain,
        this.swapData.inputValue
      );
    }
  }

  closeDialog(transactionSucess) {//====
    this.dialogRef.close(transactionSucess);
  }

  submitTransaction() {//====
    this.txState = TransactionConfirmationState.SUBMITTING;

    // Source asset is not RUNE
    if (
      this.swapData.sourceAsset.chain === 'BNB' ||
      this.swapData.sourceAsset.chain === 'BTC' ||
      this.swapData.sourceAsset.chain === 'ETH' ||
      this.swapData.sourceAsset.chain === 'LTC' ||
      this.swapData.sourceAsset.chain === 'BCH'
    ) {
      this.midgardService.getInboundAddresses().subscribe(async (res) => {
        const currentPools = res;

        if (currentPools && currentPools.length > 0) {
          const matchingPool = currentPools.find(
            (pool) => pool.chain === this.swapData.sourceAsset.chain
          );

          if (matchingPool) {
            const userType = this.swapData.user.type;

            if (
              userType === 'keystore' ||
              userType === 'ledger' ||
              userType === 'XDEFI'
            ) {
              this.keystoreTransfer(matchingPool);
            } else if (userType === 'metamask') {
              this.metaMaskTransfer(matchingPool);
            } else {
              console.log('no error type matches');
            }
          } else {
            console.log('no matching pool found');
          }
        } else {
          console.log('no current pools found...');
        }
      });
    } else {
      // RUNE is source asset
      this.keystoreTransfer();
    }
  }

  validateTargetAddress() {//====
    const client = this.userService.getChainClient(
      this.swapData.user,
      this.swapData.targetAsset.chain
    );
    if (!client) {
      return false;
    }

    return client.validateAddress(this.swapData.targetAddress);
  }

  async metaMaskTransfer(matchingPool) {//====
    try {
      const floor = this.slipLimitService.getSlipLimitFromAmount(
        this.swapData.outputValue
      );

      const memo = this.getSwapMemo(
        this.swapData.targetAsset.chain,
        this.swapData.targetAsset.symbol,
        this.swapData.targetAddress,
        Math.floor(floor.toNumber())
      );

      const userAddress = this.swapData.user.wallet;

      if (!this.metaMaskProvider) {
        console.error('no metaMask provider');
        return;
      }

      const signer = this.metaMaskProvider.getSigner();
      const hash = await this.metaMaskService.callDeposit({
        ethInboundAddress: matchingPool,
        asset: this.swapData.sourceAsset,
        memo,
        userAddress,
        signer,
        input: this.swapData.inputValue,
      });

      this.hash = hash.substr(2);
      this.pushTxStatus(hash, this.swapData.sourceAsset);
      this.txState = TransactionConfirmationState.SUCCESS;
    } catch (error) {
      console.log('error is: ', error);
      this.error = 'ETH transaction failed.';
      this.txState = TransactionConfirmationState.ERROR;
    }
  }

  async keystoreTransfer(matchingPool) {//====
    const amountNumber = this.swapData.inputValue;
    const binanceClient = this.swapData.user.clients.binance;
    const bitcoinClient = this.swapData.user.clients.bitcoin;
    const thorClient = this.swapData.user.clients.thorchain;
    const ethClient = this.swapData.user.clients.ethereum;
    const litecoinClient = this.swapData.user.clients.litecoin;

    const floor = this.slipLimitService.getSlipLimitFromAmount(
      this.swapData.outputValue
    );

    const memo = this.getSwapMemo(
      this.swapData.targetAsset.chain,
      this.swapData.targetAsset.symbol,
      this.swapData.targetAddress,
      Math.floor(floor.toNumber())
    );

    if (!memo || memo === '') {
      this.error = 'Error creating tx memo';
      this.txState = TransactionConfirmationState.ERROR;
      return;
    }

    if (!this.validateTargetAddress()) {
      this.error = `Invalid ${this.swapData.targetAsset.chain} Address`;
      this.txState = TransactionConfirmationState.ERROR;
      return;
    }

    if (this.swapData.sourceAsset.chain === 'THOR') {
      try {
        const hash = await thorClient.deposit({
          amount: assetToBase(assetAmount(amountNumber)),
          memo,
        });

        this.hash = hash;
        this.txStatusService.addTransaction({
          chain: Chain.THORChain,
          hash: this.hash,
          ticker: this.swapData.sourceAsset.ticker,
          status: TxStatus.PENDING,
          action: TxActions.SWAP,
          isThorchainTx: true,
          symbol: this.swapData.sourceAsset.symbol,
        });
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        console.error(error.stack);
        this.error = error;
        this.txState = TransactionConfirmationState.ERROR;
      }
    } else if (this.swapData.sourceAsset.chain === 'BNB') {
      try {
        const hash = await binanceClient.transfer({
          asset: this.swapData.sourceAsset,
          amount: assetToBase(assetAmount(amountNumber)),
          recipient: matchingPool.address,
          memo,
        });

        this.hash = hash;
        this.pushTxStatus(hash, this.swapData.sourceAsset);
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        this.error = error;
        this.txState = TransactionConfirmationState.ERROR;
      }
    } else if (this.swapData.sourceAsset.chain === 'BTC') {
      try {
        // TODO -> consolidate this with BTC, BCH, LTC
        const balanceAmount = this.userService.findRawBalance(
          this.balances,
          this.swapData.sourceAsset
        );
        const toBase = assetToBase(assetAmount(amountNumber));
        const feeToBase = assetToBase(
          assetAmount(this.swapData.networkFeeInSource)
        );
        const amount = balanceAmount
          // subtract fee
          .minus(feeToBase.amount())
          // subtract amount
          .minus(toBase.amount())
          .isGreaterThan(0)
          ? toBase.amount() // send full amount, fee can be deducted from remaining balance
          : toBase.amount().minus(feeToBase.amount()); // after deductions, not enough to process, subtract fee from amount

        if (amount.isLessThan(0)) {
          this.error = 'Insufficient funds. Try sending a smaller amount';
          this.txState = TransactionConfirmationState.ERROR;
          return;
        }
        // TODO -> consolidate this with BTC, BCH, LTC

        if (memo.length > 80) {
          this.error =
            'Memo exceeds 80. Report to https://github.com/asgardex/asgard-exchange/issues.';
          this.txState = TransactionConfirmationState.ERROR;
          return;
        }

        const hash = await bitcoinClient.transfer({
          amount: baseAmount(amount),
          recipient: matchingPool.address,
          memo,
          feeRate: +matchingPool.gas_rate,
        });

        this.hash = hash;
        this.pushTxStatus(hash, this.swapData.sourceAsset);
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        this.error = error;
        this.txState = TransactionConfirmationState.ERROR;
      }
    } else if (this.swapData.sourceAsset.chain === 'ETH') {
      try {
        const sourceAsset = this.swapData.sourceAsset;

        const decimal = await this.ethUtilsService.getAssetDecimal(
          this.swapData.sourceAsset,
          ethClient
        );
        let amount = assetToBase(
          assetAmount(this.swapData.inputValue, decimal)
        ).amount();
        const balanceAmount = this.userService.findRawBalance(
          this.balances,
          this.swapData.sourceAsset
        );

        if (amount.isGreaterThan(balanceAmount)) {
          amount = balanceAmount;
        }

        const hash = await this.ethUtilsService.callDeposit({
          inboundAddress: matchingPool,
          asset: sourceAsset,
          memo: memo,
          amount,
          ethClient,
        });

        this.hash = hash.substr(2);
        this.pushTxStatus(hash, this.swapData.sourceAsset);
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        console.error(error.stack);
        this.error =
          'ETH swap failed. Please try again using a smaller amount.';
        this.txState = TransactionConfirmationState.ERROR;
      }
    } else if (this.swapData.sourceAsset.chain === 'LTC') {
      try {
        // TODO -> consolidate this with BTC, BCH, LTC
        const balanceAmount = this.userService.findRawBalance(
          this.balances,
          this.swapData.sourceAsset
        );
        const toBase = assetToBase(assetAmount(amountNumber));
        const feeToBase = assetToBase(
          assetAmount(this.swapData.networkFeeInSource)
        );
        const amount = balanceAmount
          // subtract fee
          .minus(feeToBase.amount())
          // subtract amount
          .minus(toBase.amount())
          .isGreaterThan(0)
          ? toBase.amount() // send full amount, fee can be deducted from remaining balance
          : toBase.amount().minus(feeToBase.amount()); // after deductions, not enough to process, subtract fee from amount

        if (amount.isLessThan(0)) {
          this.error = 'Insufficient funds. Try sending a smaller amount';
          this.txState = TransactionConfirmationState.ERROR;
          return;
        }
        // TODO -> consolidate this with BTC, BCH, LTC

        if (memo.length > 80) {
          this.error =
            'Memo exceeds 80. Report to https://github.com/asgardex/asgard-exchange/issues.';
          this.txState = TransactionConfirmationState.ERROR;
          return;
        }

        const hash = await litecoinClient.transfer({
          amount: baseAmount(amount),
          recipient: matchingPool.address,
          memo,
          feeRate: +matchingPool.gas_rate,
        });

        this.hash = hash;
        this.pushTxStatus(hash, this.swapData.sourceAsset);
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        this.error = error;
        this.txState = TransactionConfirmationState.ERROR;
      }
    } else if (this.swapData.sourceAsset.chain === 'BCH') {
      try {
        const bchClient = this.swapData.user.clients.bitcoinCash;

        // TODO -> consolidate this with BTC, BCH, LTC
        const balanceAmount = this.userService.findRawBalance(
          this.balances,
          this.swapData.sourceAsset
        );
        const toBase = assetToBase(assetAmount(amountNumber));
        const feeToBase = assetToBase(
          assetAmount(this.swapData.networkFeeInSource)
        );
        const amount = balanceAmount
          // subtract fee
          .minus(feeToBase.amount())
          // subtract amount
          .minus(toBase.amount())
          .isGreaterThan(0)
          ? toBase.amount() // send full amount, fee can be deducted from remaining balance
          : toBase.amount().minus(feeToBase.amount()); // after deductions, not enough to process, subtract fee from amount

        if (amount.isLessThan(0)) {
          this.error = 'Insufficient funds. Try sending a smaller amount';
          this.txState = TransactionConfirmationState.ERROR;
          return;
        }
        // end TODO

        const hash = await bchClient.transfer({
          amount: baseAmount(amount),
          recipient: matchingPool.address,
          memo,
          feeRate: +matchingPool.gas_rate,
        });

        this.hash = hash;
        this.pushTxStatus(hash, this.swapData.sourceAsset);
        this.txState = TransactionConfirmationState.SUCCESS;
      } catch (error) {
        console.error('error making transfer: ', error);
        this.error = error;
        this.txState = TransactionConfirmationState.ERROR;
      }
    }
  }

  pushTxStatus(hash, asset) {
    this.txStatusService.addTransaction({
      chain: asset.chain,
      ticker: asset.ticker,
      status: TxStatus.PENDING,
      action: TxActions.SWAP,
      isThorchainTx: true,
      symbol: asset.symbol,
      hash,
    });
  }

  getSwapMemo(
    chain,
    symbol,
    addr,
    sliplimit
  ){//====
    const tag =
      this.swapData.user &&
      this.swapData.user.type &&
      this.swapData.user.type === 'XDEFI'
        ? '333'
        : '444';

    /** shorten ERC20 tokens */
    if (chain === 'ETH' && symbol !== 'ETH') {
      const ticker = symbol.split('-')[0];
      const trimmedAddress = symbol.substring(symbol.length - 3);
      symbol = `${ticker}-${trimmedAddress.toUpperCase()}`;
    }

    if (sliplimit && sliplimit.toString().length > 3) {
      const taggedSlip =
        sliplimit.toString().slice(0, sliplimit.toString().length - 3) + tag;
      return `=:${chain}.${symbol}:${addr}:${taggedSlip}`;
    } else {
      return `=:${chain}.${symbol}:${addr}:${sliplimit}`;
    }
  }

  ngOnDestroy() {//====
    for (const sub of this.subs) {
      sub.unsubscribe();
    }
  }
}

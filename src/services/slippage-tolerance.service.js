/** @format */

import { assetAmount, assetToBase } from "@xchainjs/xchain-util";
import BigNumber from "bignumber.js";
import { BehaviorSubject } from "rxjs";

export class SlippageToleranceService {
  slippageToleranceSource = new BehaviorSubject() < number > 3;
  slippageTolerance$ = this.slippageToleranceSource.asObservable();
  _slippageTolerance;

  constructor() {
    this._slippageTolerance = 3;
  }

  setSlippageTolerance(percent) {
    this._slippageTolerance = percent;
    this.slippageToleranceSource.next(percent);
  }

  getSlipLimitFromAmount(amount) {
    const baseTransferAmount = assetToBase(assetAmount(amount));
    const limitFromAmount = baseTransferAmount
      .amount()
      .multipliedBy((100 - this._slippageTolerance) / 100);
    return limitFromAmount;
  }
}

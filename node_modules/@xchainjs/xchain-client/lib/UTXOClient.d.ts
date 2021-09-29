import { BaseXChainClient as Client } from './BaseXChainClient';
import { Fee, FeeRate, FeeRates, Fees, FeesWithRates } from './types';
export declare abstract class UTXOClient extends Client {
    protected abstract getSuggestedFeeRate(): Promise<FeeRate>;
    protected abstract calcFee(feeRate: FeeRate, memo?: string): Promise<Fee>;
    getFeesWithRates(memo?: string): Promise<FeesWithRates>;
    getFees(memo?: string): Promise<Fees>;
    /**
     * @deprecated Use getFees(memo) instead
     */
    getFeesWithMemo(memo: string): Promise<Fees>;
    getFeeRates(): Promise<FeeRates>;
}

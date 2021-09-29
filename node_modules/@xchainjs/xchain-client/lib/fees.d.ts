import { Fee, FeeOption, FeeType, Fees } from './types';
export declare function singleFee(feeType: FeeType, amount: Fee): Fees;
export declare function standardFees(feeType: FeeType, amount: Fee): Fees;
export declare function calcFees<T, U extends unknown[]>(feeRates: Record<FeeOption, T>, calcFee: (feeRate: T, ...args: U) => Fee, ...args: U): Fees;
export declare function calcFeesAsync<T, U extends unknown[]>(feeRates: Record<FeeOption, T>, calcFee: (feeRate: T, ...args: U) => Fee, ...args: U): Promise<Fees>;

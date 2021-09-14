import { CosmosSDK } from "../../cosmos-sdk";
import { WithdrawRewardsReq, SetWithdrawAddressReq } from "../../api";
import { AccAddress, ValAddress } from "../../types";
import { StdTx } from "../auth";
import { AxiosPromise } from "axios";
export declare function communityPoolGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: import("../../api").Coin[];
}>;
export declare function delegatorsDelegatorAddrRewardsGet(sdk: CosmosSDK, delegator: AccAddress): AxiosPromise<{
    height: number;
    result: import("../../api").DelegatorTotalRewards;
}>;
export declare function delegatorsDelegatorAddrRewardsPost(sdk: CosmosSDK, delegator: AccAddress, req: WithdrawRewardsReq): AxiosPromise<StdTx>;
export declare function delegatorsDelegatorAddrRewardsValidatorAddrGet(sdk: CosmosSDK, delegator: AccAddress, validator: ValAddress): AxiosPromise<{
    height: number;
    result: import("../../api").Coin[];
}>;
export declare function delegatorsDelegatorAddrRewardsValidatorAddrPost(sdk: CosmosSDK, delegator: AccAddress, validator: ValAddress, req: WithdrawRewardsReq): AxiosPromise<StdTx>;
export declare function delegatorsDelegatorAddrWithdrawAddressGet(sdk: CosmosSDK, delegator: AccAddress): AxiosPromise<{
    height: number;
    result: string;
}>;
export declare function delegatorsDelegatorAddrWithdrawAddressPost(sdk: CosmosSDK, delegator: AccAddress, req: SetWithdrawAddressReq): AxiosPromise<StdTx>;
export declare function parametersGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: object;
}>;
export declare function validatorsValidatorAddrGet(sdk: CosmosSDK, validator: ValAddress): AxiosPromise<StdTx>;
export declare function validatorsValidatorAddrOutstandingRewardsGet(sdk: CosmosSDK, validator: ValAddress): AxiosPromise<{
    height: number;
    result: {
        height: number;
        result: import("../../api").Coin[];
    };
}>;
export declare function validatorsValidatorAddrRewardsGet(sdk: CosmosSDK, validator: ValAddress): AxiosPromise<{
    height: number;
    result: import("../../api").Coin[];
}>;
export declare function validatorsValidatorAddrRewardsPost(sdk: CosmosSDK, validator: ValAddress, req: WithdrawRewardsReq): AxiosPromise<StdTx>;

import { CosmosSDK } from "../../cosmos-sdk";
export declare function totalDenominationGet(sdk: CosmosSDK, denomination: string): import("axios").AxiosPromise<{
    height: number;
    result: string;
}>;
export declare function totalGet(sdk: CosmosSDK): import("axios").AxiosPromise<{
    height: number;
    result: import("../../api").Supply;
}>;

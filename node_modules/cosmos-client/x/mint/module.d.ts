import { CosmosSDK } from "../../cosmos-sdk";
export declare function annualProvisionsGet(sdk: CosmosSDK): import("axios").AxiosPromise<{
    height: number;
    result: string;
}>;
export declare function inflationGet(sdk: CosmosSDK): import("axios").AxiosPromise<{
    height: number;
    result: string;
}>;
export declare function parametersGet(sdk: CosmosSDK): import("axios").AxiosPromise<{
    height: number;
    result: object;
}>;

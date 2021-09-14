import { CosmosSDK } from "../cosmos-sdk";
export declare function blocksHeightGet(sdk: CosmosSDK, height: number): import("axios").AxiosPromise<import("../api").BlockQuery>;
export declare function blocksLatestGet(sdk: CosmosSDK): import("axios").AxiosPromise<import("../api").BlockQuery>;
export declare function syncingGet(sdk: CosmosSDK): import("axios").AxiosPromise<import("../api").InlineResponse2001>;
export declare function validatorsetsHeightGet(sdk: CosmosSDK, height: number): import("axios").AxiosPromise<import("../api").InlineResponse2002>;
export declare function validatorsetsLatestGet(sdk: CosmosSDK): import("axios").AxiosPromise<import("../api").InlineResponse2002>;

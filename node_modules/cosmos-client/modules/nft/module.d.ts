import { StdTx } from "../../x/auth";
import { CosmosSDK } from "../../cosmos-sdk";
import { AxiosPromise } from "axios";
import { BaseReq } from "../../api";
import { AccAddress } from "../../types";
export declare function supplyDenomGet(sdk: CosmosSDK, denom: string): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function ownerDelegatorAddrGet(sdk: CosmosSDK, delegatorAddress: AccAddress): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function ownerDelegatorAddrCollectionDenomGet(sdk: CosmosSDK, delegatorAddress: AccAddress, denom: string): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function collectionDenomGet(sdk: CosmosSDK, denom: string): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function DenomsGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function collectionDenomNftIdGet(sdk: CosmosSDK, denom: string, id: string): AxiosPromise<{
    height: number;
    result: unknown;
}>;
export declare function mintPost(sdk: CosmosSDK, req: {
    base_req: BaseReq;
    recipient: string;
    denom: string;
    id: string;
    tokenURI: string;
}): AxiosPromise<StdTx>;
export declare function transferPost(sdk: CosmosSDK, req: {
    base_req: BaseReq;
    denom: string;
    id: string;
    recipient: string;
}): AxiosPromise<StdTx>;
export declare function collectionDenomNftIdMetadataPut(sdk: CosmosSDK, req: {
    base_req: BaseReq;
    denom: string;
    id: string;
    tokenURI: string;
}): AxiosPromise<StdTx>;
export declare function collectionDenomNftIdBurnPut(sdk: CosmosSDK, req: {
    base_req: BaseReq;
    denom: string;
    id: string;
}): AxiosPromise<StdTx>;

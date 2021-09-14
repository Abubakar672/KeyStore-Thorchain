import { CosmosSDK } from "../../cosmos-sdk";
import { UnjailReq } from "../../api";
import { ValAddress } from "../../types";
import { StdTx } from "../auth";
import { AxiosPromise } from "axios";
export declare function parametersGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: import("../../api").InlineResponse2007;
}>;
export declare function signingInfosGet(sdk: CosmosSDK, page: number, limit: number): AxiosPromise<{
    height: number;
    result: import("../../api").SigningInfo[];
}>;
export declare function validatorsValidatorAddrUnjailPost(sdk: CosmosSDK, validator: ValAddress, req: UnjailReq): AxiosPromise<StdTx>;

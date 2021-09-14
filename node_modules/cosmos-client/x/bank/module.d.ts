import { CosmosSDK } from "../../cosmos-sdk";
import { SendReq } from "../../api";
import { AccAddress } from "../../types";
import { AxiosPromise } from "axios";
import { StdTx } from "../auth";
export declare function balancesAddressGet(sdk: CosmosSDK, address: AccAddress): AxiosPromise<{
    height: number;
    result: import("../../api").Coin[];
}>;
export declare function accountsAddressTransfersPost(sdk: CosmosSDK, address: AccAddress, req: SendReq): AxiosPromise<StdTx>;

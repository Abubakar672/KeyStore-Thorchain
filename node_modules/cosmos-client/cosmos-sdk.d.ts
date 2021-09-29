/// <reference types="node" />
import { AxiosPromise } from "axios";
/**
 *
 */
export declare class CosmosSDK {
    url: string;
    chainID: string;
    /**
     * @param url
     * @param chainID
     */
    constructor(url: string, chainID: string);
    generatePrivKeyFromMnemonic(mnemonic: string): Promise<Buffer>;
    wrapResponseWithHeight<T>(res: AxiosPromise<T>): AxiosPromise<{
        height: number;
        result: T;
    }>;
}

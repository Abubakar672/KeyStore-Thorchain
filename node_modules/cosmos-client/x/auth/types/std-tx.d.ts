/// <reference types="node" />
import { Msg } from "../../../types/msg";
import { StdSignature } from "./std-signature";
import { Tx } from "../../../types/tx";
import { codec } from "../../../codec";
import { StdTxFee } from "../../../api";
/**
 *
 */
export declare class StdTx extends Tx {
    msg: (Msg | codec.AminoWrapping)[];
    fee: StdTxFee;
    signatures: StdSignature[] | null;
    memo: string;
    /**
     *
     * @param msg
     * @param fee
     * @param signatures
     * @param memo
     */
    constructor(msg: (Msg | codec.AminoWrapping)[], fee: StdTxFee, signatures: StdSignature[] | null, memo: string);
    getSignBytes(chainID: string, accountNumber: string, sequence: string): Buffer;
    static fromJSON(value: any): StdTx;
}

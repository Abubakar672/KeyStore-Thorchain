/// <reference types="node" />
import { PubKey } from "../../tendermint";
export declare enum Prefix {
    Cosmos = "cosmos",
    Public = "pub",
    Account = "acc",
    Validator = "val",
    Operator = "oper",
    Consensus = "cons"
}
export declare const bech32Prefix: {
    [key: string]: string;
};
/**
 * 各種アドレスの基底クラス。
 */
export declare class Address {
    protected _value: Buffer;
    /**
     *
     * @param value
     */
    constructor(value: Buffer);
    /**
     *
     * @param pubKey
     */
    static fromPublicKey(pubKey: PubKey): Address;
    /**
     *
     * @param accAddr
     * @param accPub
     * @param valAddr
     * @param valPub
     * @param consAddr
     * @param consPub
     */
    static setBech32Prefix(accAddr: string, accPub: string, valAddr: string, valPub: string, consAddr: string, consPub: string): void;
}

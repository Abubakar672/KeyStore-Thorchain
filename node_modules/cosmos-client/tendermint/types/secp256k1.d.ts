/// <reference types="node" />
import { PrivKey, PubKey } from "./key";
/**
 * secp256k1
 */
export declare class PrivKeySecp256k1 implements PrivKey {
    private pubKey;
    private privKey;
    /**
     *
     * @param privKey
     */
    constructor(privKey: Buffer);
    /**
     *
     */
    getPubKey(): PubKeySecp256k1;
    /**
     *
     * @param message
     */
    sign(message: Buffer): Buffer;
    /**
     *
     */
    toBuffer(): Buffer;
    /**
     *
     */
    toBase64(): string;
    toJSONInCodec(): string;
    /**
     *
     * @param value
     */
    static fromBase64(value: string): PrivKeySecp256k1;
    static fromJSON(value: any): PrivKeySecp256k1;
}
/**
 * secp256k1公開鍵。
 */
export declare class PubKeySecp256k1 implements PubKey {
    private pubKey;
    /**
     *
     * @param pubKey
     */
    constructor(pubKey: Buffer);
    hash160(buffer: Buffer): Buffer;
    getAddress(): Buffer;
    /**
     *
     * @param message
     * @param signature
     */
    verify(signature: Buffer, message: Buffer): boolean;
    /**
     *
     */
    toBuffer(): Buffer;
    /**
     *
     */
    toBase64(): string;
    toJSONInCodec(): string;
    /**
     *
     */
    static fromBase64(value: string): PubKeySecp256k1;
    static fromJSON(value: any): PubKeySecp256k1;
}

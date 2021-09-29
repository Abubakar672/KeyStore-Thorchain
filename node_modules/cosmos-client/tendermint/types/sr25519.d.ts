/// <reference types="node" />
import { PrivKey, PubKey } from "./key";
/**
 * sr25519
 */
export declare class PrivKeySr25519 implements PrivKey {
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
    getPubKey(): PubKeySr25519;
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
    static fromBase64(value: string): PrivKeySr25519;
    static fromJSON(value: any): PrivKeySr25519;
}
/**
 * sr25519
 */
export declare class PubKeySr25519 implements PubKey {
    private pubKey;
    /**
     *
     * @param pubKey
     */
    constructor(pubKey: Buffer);
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
    static fromBase64(value: string): PubKeySr25519;
    static fromJSON(value: any): PubKeySr25519;
}

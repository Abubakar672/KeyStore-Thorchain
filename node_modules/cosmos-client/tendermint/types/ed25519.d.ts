/// <reference types="node" />
import { PrivKey, PubKey } from "./key";
/**
 * ed25519
 */
export declare class PrivKeyEd25519 implements PrivKey {
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
    getPubKey(): PubKeyEd25519;
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
    static fromBase64(value: string): PrivKeyEd25519;
    static fromJSON(value: any): PrivKeyEd25519;
}
/**
 * ed25519
 */
export declare class PubKeyEd25519 implements PubKey {
    private pubKey;
    /**
     *
     * @param pubKey
     */
    constructor(pubKey: Buffer);
    getAddress(): Buffer;
    /**
     * message is not needed
     * @param signature
     */
    verify(signature: Buffer): boolean;
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
    static fromBase64(value: string): PubKeyEd25519;
    static fromJSON(value: any): PubKeyEd25519;
}

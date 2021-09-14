import { Address } from "./address";
import { PubKey } from "../../tendermint";
/**
 * ValAddress
 */
export declare class ValAddress extends Address {
    /**
     *
     */
    toBech32(): string;
    /**
     *
     * @param valAddress
     */
    static fromBech32(valAddress: string): ValAddress;
    static fromPublicKey(pubKey: PubKey): ValAddress;
    /**
     * For `JSON.stringify`
     */
    toJSON(): string;
}

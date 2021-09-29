import { Address } from "./address";
import { PubKey } from "../../tendermint";
/**
 * AccAddress
 */
export declare class AccAddress extends Address {
    /**
     *
     */
    toBech32(): string;
    /**
     *
     * @param accAddress
     */
    static fromBech32(accAddress: string): AccAddress;
    static fromPublicKey(pubKey: PubKey): AccAddress;
    /**
     * For `JSON.stringify`
     */
    toJSON(): string;
}

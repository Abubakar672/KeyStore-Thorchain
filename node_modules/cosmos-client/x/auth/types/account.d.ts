import { AccAddress } from "../../../types/address/acc-address";
import { PubKey } from "../../../tendermint/types/key";
import { Coin } from "../../../api";
/**
 *
 */
export declare class BaseAccount {
    address?: AccAddress | undefined;
    public_key?: PubKey | undefined;
    coins: Coin[];
    account_number: number;
    sequence: number;
    /**
     *
     * @param address
     * @param public_key
     * @param coins
     * @param account_number
     * @param sequence
     */
    constructor(address?: AccAddress | undefined, public_key?: PubKey | undefined, coins?: Coin[], account_number?: number, sequence?: number);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): BaseAccount;
}

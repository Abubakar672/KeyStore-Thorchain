import { AccAddress } from "../../../types";
import { PubKey } from "../../../tendermint";
export declare class ModuleAccount {
    base_account: {
        address: AccAddress;
        public_key: PubKey;
        account_number: number;
        sequence: number;
    };
    name: string;
    permissions: string[];
    /**
     *
     * @param base_account
     * @param name
     * @param permissions
     */
    constructor(base_account: {
        address: AccAddress;
        public_key: PubKey;
        account_number: number;
        sequence: number;
    }, name: string, permissions: string[]);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): ModuleAccount;
}

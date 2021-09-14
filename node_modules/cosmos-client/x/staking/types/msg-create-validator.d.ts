import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { ValAddress } from "../../../types/address/val-address";
import { PubKey } from "../../../tendermint";
import { ValidatorDescription, Coin } from "../../../api";
export declare class MsgCreateValidator extends Msg {
    description: ValidatorDescription;
    commission: {
        rate: string;
        max_rate: string;
        max_change_rate: string;
    };
    min_self_delegation: number;
    delegator_address: AccAddress;
    validator_address: ValAddress;
    pubkey: PubKey;
    value: Coin;
    /**
     * @param description
     * @param commission
     * @param min_self_delegation
     * @param delegator_address
     * @param validator_address
     * @param pubkey
     * @param value
     */
    constructor(description: ValidatorDescription, commission: {
        rate: string;
        max_rate: string;
        max_change_rate: string;
    }, min_self_delegation: number, delegator_address: AccAddress, validator_address: ValAddress, pubkey: PubKey, value: Coin);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgCreateValidator;
}

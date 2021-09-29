import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { ValAddress } from "../../../types/address/val-address";
import { Coin } from "../../../api";
export declare class MsgBeginRedelegate extends Msg {
    delegator_address: AccAddress;
    validator_src_address: ValAddress;
    validator_dst_address: ValAddress;
    amount: Coin;
    /**
     *
     * @param delegator_address
     * @param validator_src_address
     * @param validator_dst_address
     * @param amount
     */
    constructor(delegator_address: AccAddress, validator_src_address: ValAddress, validator_dst_address: ValAddress, amount: Coin);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgBeginRedelegate;
}

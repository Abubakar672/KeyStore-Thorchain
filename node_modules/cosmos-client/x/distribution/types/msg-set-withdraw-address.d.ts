import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
export declare class MsgSetWithdrawAddress extends Msg {
    delegator_address: AccAddress;
    withdraw_address: AccAddress;
    /**
     * @param delegator_address
     * @param withdraw_address
     */
    constructor(delegator_address: AccAddress, withdraw_address: AccAddress);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgSetWithdrawAddress;
}

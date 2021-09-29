import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { ValAddress } from "../../../types/address/val-address";
export declare class MsgWithdrawDelegatorReward extends Msg {
    delegator_address: AccAddress;
    validator_address: ValAddress;
    /**
     *
     * @param delegator_address
     * @param validator_address
     */
    constructor(delegator_address: AccAddress, validator_address: ValAddress);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgWithdrawDelegatorReward;
}

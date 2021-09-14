import { Msg } from "../../../types/msg";
import { ValAddress } from "../../../types/address/val-address";
export declare class MsgWithdrawValidatorCommission extends Msg {
    validator_address: ValAddress;
    /**
     * @param validator_address
     */
    constructor(validator_address: ValAddress);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgWithdrawValidatorCommission;
}

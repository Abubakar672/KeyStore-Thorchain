import { Msg } from "../../../types/msg";
import { ValAddress } from "../../../types/address/val-address";
import { ValidatorDescription } from "../../../api";
export declare class MsgEditValidator extends Msg {
    description: ValidatorDescription;
    validator_address: ValAddress;
    committion_rate: string;
    min_self_delegation: string;
    /**
     * @param description
     * @param validator_address
     * @param commission_rate
     * @param min_self_delegation
     */
    constructor(description: ValidatorDescription, validator_address: ValAddress, committion_rate: string, min_self_delegation: string);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgEditValidator;
}

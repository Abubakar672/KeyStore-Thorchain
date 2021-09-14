import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { Coin } from "../../../api";
export declare class MsgSubmitProposalBase extends Msg {
    initial_deposit: Coin[];
    proposer: AccAddress;
    /**
     * @param initial_deposit
     * @param proposer
     */
    constructor(initial_deposit: Coin[], proposer: AccAddress);
    /**
     * @param value
     */
    static fromJSON(value: any): MsgSubmitProposalBase;
}

import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { Coin } from "../../../api";
export declare class MsgSubmitProposal extends Msg {
    content: any;
    initial_deposit: Coin[];
    proposer: AccAddress;
    /**
     * @param content
     * @param initial_deposit
     * @param proposer
     */
    constructor(content: any, initial_deposit: Coin[], proposer: AccAddress);
    /**
     * @param value
     */
    static fromJSON(value: any): MsgSubmitProposal;
}

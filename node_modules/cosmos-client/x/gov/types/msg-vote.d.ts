import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
export declare class MsgVote extends Msg {
    proposal_id: number;
    voter: AccAddress;
    option: any;
    /**
     * @param proposal_id
     * @param voter
     * @param option
     */
    constructor(proposal_id: number, voter: AccAddress, option: any);
    /**
     * @param value
     */
    static fromJSON(value: any): MsgVote;
}

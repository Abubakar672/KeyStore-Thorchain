import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
import { Coin } from "../../../api";
export declare class MsgDeposit extends Msg {
    proposal_id: number;
    depositor: AccAddress;
    amount: Coin[];
    /**
     * @param proposal_id
     * @param depositor
     * @param amount
     */
    constructor(proposal_id: number, depositor: AccAddress, amount: Coin[]);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgDeposit;
}

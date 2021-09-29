import { AccAddress } from "../../../types/address/acc-address";
import { Msg } from "../../../types/msg";
import { Coin } from "../../../api";
/**
 *
 */
export declare class MsgSend extends Msg {
    from_address: AccAddress;
    to_address: AccAddress;
    amount: Coin[];
    /**
     *
     * @param from_address
     * @param to_address
     * @param amount
     */
    constructor(from_address: AccAddress, to_address: AccAddress, amount: Coin[]);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgSend;
}

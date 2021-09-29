import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
export declare class MsgBurnNFT implements Msg {
    sender: AccAddress;
    id: string;
    denom: string;
    /**
     * @param sender
     * @param id
     * @param denom
     */
    constructor(sender: AccAddress, id: string, denom: string);
    static fromJSON(value: any): MsgBurnNFT;
}

import { AccAddress } from "../../../types/address/acc-address";
import { Msg } from "../../../types/msg";
export declare class MsgTransferNFT implements Msg {
    sender: AccAddress;
    recipient: AccAddress;
    denom: string;
    id: string;
    constructor(sender: AccAddress, recipient: AccAddress, denom: string, id: string);
    static fromJSON(value: any): MsgTransferNFT;
}

import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
export declare class MsgMintNFT implements Msg {
    sender: AccAddress;
    recipient: AccAddress;
    id: string;
    denom: string;
    token_uri: string;
    /**
     * @param sender
     * @param recipient
     * @param id
     * @param denom
     * @param token_uri
     */
    constructor(sender: AccAddress, recipient: AccAddress, id: string, denom: string, token_uri: string);
    static fromJSON(value: any): MsgMintNFT;
}

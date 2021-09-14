import { Msg } from "../../../types/msg";
import { AccAddress } from "../../../types/address/acc-address";
export declare class MsgEditNFTMetadata implements Msg {
    sender: AccAddress;
    id: string;
    denom: string;
    token_uri: string;
    /**
     * @param sender
     * @param id
     * @param denom
     * @param token_uri
     */
    constructor(sender: AccAddress, id: string, denom: string, token_uri: string);
    static fromJSON(value: any): MsgEditNFTMetadata;
}

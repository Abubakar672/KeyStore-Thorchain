import { Msg } from "../../../types/msg";
import { ValAddress } from "../../../types/address/val-address";
export declare class MsgUnjail extends Msg {
    address: ValAddress;
    /**
     * @param address
     */
    constructor(address: ValAddress);
    /**
     *
     * @param value
     */
    static fromJSON(value: any): MsgUnjail;
}

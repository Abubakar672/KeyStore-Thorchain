import { Msg } from "../../../types/msg";
import { Coin } from "../../../api";
export declare type Input = {
    address: string;
    coins: Coin[];
};
export declare type Output = {
    address: string;
    coins: Coin[];
};
/**
 *
 */
export declare class MsgMultiSend extends Msg {
    inputs: Input[];
    outputs: Output[];
    /**
     *
     * @param inputs
     * @param outputs
     */
    constructor(inputs: Input[], outputs: Output[]);
    static fromJSON(value: any): MsgMultiSend;
}

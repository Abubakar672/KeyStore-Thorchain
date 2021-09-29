export declare const maps: {
    type: Map<Function, string>;
    fromJSON: {
        [type: string]: (value: any) => any;
    };
};
export declare function toJSONString(value: any): string;
export declare function fromJSONString(json: string): any;
export declare function registerCodec<T>(type: string, constructor: Function, fromJSON: (value: any) => T): void;
export declare class AminoWrapping {
    type: string;
    value: any;
    constructor(type: string, value: any);
}

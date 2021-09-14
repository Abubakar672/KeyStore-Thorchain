export declare class TextProposal {
    title?: string | undefined;
    description?: string | undefined;
    constructor(title?: string | undefined, description?: string | undefined);
    static fromJSON(value: any): TextProposal;
}

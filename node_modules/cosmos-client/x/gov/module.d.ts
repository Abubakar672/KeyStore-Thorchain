import { CosmosSDK } from "../../cosmos-sdk";
import { ParamChangeProposalReq, PostProposalReq, DepositReq, VoteReq } from "../../api";
import { AccAddress } from "../../types";
import { StdTx } from "../auth";
import { AxiosPromise } from "axios";
export declare function parametersDepositGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: import("../../api").InlineResponse2008;
}>;
export declare function parametersTallyingGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: object;
}>;
export declare function parametersVotingGet(sdk: CosmosSDK): AxiosPromise<{
    height: number;
    result: object;
}>;
export declare function proposalsGet(sdk: CosmosSDK, voter?: AccAddress, depositor?: AccAddress, status?: "deposit_period" | "voting_period" | "passed" | "rejected"): AxiosPromise<{
    height: number;
    result: import("../../api").TextProposal[];
}>;
export declare function proposalsParamChangePost(sdk: CosmosSDK, req: ParamChangeProposalReq): AxiosPromise<StdTx>;
export declare function proposalsPost(sdk: CosmosSDK, req: PostProposalReq): AxiosPromise<StdTx>;
export declare function proposalsProposalIdDepositsDepositorGet(sdk: CosmosSDK, proposalID: string, depositor: AccAddress): AxiosPromise<{
    height: number;
    result: import("../../api").Deposit;
}>;
export declare function proposalsProposalIdDepositsGet(sdk: CosmosSDK, proposalID: string): AxiosPromise<{
    height: number;
    result: import("../../api").Deposit[];
}>;
export declare function proposalsProposalIdDepositsPost(sdk: CosmosSDK, proposalID: string, req: DepositReq): AxiosPromise<StdTx>;
export declare function proposalsProposalIdGet(sdk: CosmosSDK, proposalID: string): AxiosPromise<{
    height: number;
    result: import("../../api").TextProposal;
}>;
export declare function proposalsProposalIdProposerGet(sdk: CosmosSDK, proposalID: string): AxiosPromise<{
    height: number;
    result: import("../../api").Proposer;
}>;
export declare function proposalsProposalIdTallyGet(sdk: CosmosSDK, proposalID: string): AxiosPromise<{
    height: number;
    result: import("../../api").TallyResult;
}>;
export declare function proposalsProposalIdVotesGet(sdk: CosmosSDK, proposalID: string): AxiosPromise<{
    height: number;
    result: import("../../api").Vote[];
}>;
export declare function proposalsProposalIdVotesPost(sdk: CosmosSDK, proposalID: string, req: VoteReq): AxiosPromise<StdTx>;
export declare function proposalsProposalIdVotesVoterGet(sdk: CosmosSDK, proposalID: string, voter: AccAddress): AxiosPromise<{
    height: number;
    result: import("../../api").Vote;
}>;

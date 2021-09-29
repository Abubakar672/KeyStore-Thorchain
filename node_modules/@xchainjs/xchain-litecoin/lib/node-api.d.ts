import { BroadcastTxParams } from './types/common';
/**
 * Broadcast transaction.
 *
 * @see https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html
 *
 * @returns {string} Transaction ID.
 */
export declare const broadcastTx: ({ txHex, auth, nodeUrl }: BroadcastTxParams) => Promise<string>;

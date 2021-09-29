import { TxBroadcastParams } from './types';
/**
 * Broadcast transaction.
 *
 * @see https://developer.bitcoin.org/reference/rpc/sendrawtransaction.html
 *
 * @returns {string} Transaction ID.
 */
export declare const broadcastTx: ({ txHex, auth, nodeUrl }: TxBroadcastParams) => Promise<string>;

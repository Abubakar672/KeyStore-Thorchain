import { BroadcastTxParams } from './types/common';
/**
 * Broadcast transaction.
 *
 * @see https://github.com/Blockstream/esplora/blob/master/API.md#post-tx
 *
 * @param {string} params
 * @returns {string} Transaction ID.
 */
export declare const broadcastTx: ({ network, txHex, blockstreamUrl }: BroadcastTxParams) => Promise<string>;

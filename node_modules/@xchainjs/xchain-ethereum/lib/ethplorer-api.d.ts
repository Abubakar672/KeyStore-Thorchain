import { AddressInfo, TransactionInfo, TransactionOperation } from './types';
/**
 * Get address information.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-address-info
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} address
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {AddressInfo} The address information.
 */
export declare const getAddress: (baseUrl: string, address: string, apiKey?: string | undefined) => Promise<AddressInfo>;
/**
 * Get transaction by hash.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-transaction-info
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} hash The transaction hash.
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {Transactions} The transaction result.
 */
export declare const getTxInfo: (baseUrl: string, hash: string, apiKey?: string | undefined) => Promise<TransactionInfo>;
/**
 * Get ETH transactions.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-address-transactions
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} address The transaction hash.
 * @param {number} limit The maximum number of transactions.
 * @param {number} timestamp The start timestamp.
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {Transactions} The transaction result.
 */
export declare const getAddressTransactions: (baseUrl: string, address: string, limit?: number | undefined, timestamp?: number | undefined, apiKey?: string | undefined) => Promise<TransactionInfo[]>;
/**
 * Get token transactions.
 *
 * @see https://github.com/EverexIO/Ethplorer/wiki/Ethplorer-API#get-last-address-operations
 *
 * @param {string} baseUrl The ethplorer api url.
 * @param {string} address The transaction hash.
 * @param {string} token The token address.
 * @param {number} limit The maximum number of transactions.
 * @param {number} timestamp The start timestamp.
 * @param {string} apiKey The ethplorer API key. (optional)
 * @returns {Transactions} The transaction result.
 */
export declare const getAddressHistory: (baseUrl: string, address: string, token: string, limit?: number | undefined, timestamp?: number | undefined, apiKey?: string | undefined) => Promise<TransactionOperation[]>;

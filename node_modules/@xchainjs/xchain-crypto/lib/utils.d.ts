/// <reference types="node" />
/**
 * Convert string to bytes.
 *
 * @param {string} string
 * @returns {number[]} The bytes from the given string.
 */
export declare const getBytes: (string: string) => number[];
/**
 * Convert Buffer to hex string.
 *
 * @param {Buffer} arr
 * @returns {string} The hex string from the given buffer.
 */
export declare const ab2hexstring: (arr: Buffer) => string;
/**
 * Calculate `ripemd160(sha256(hex))` from the hex string
 *
 * @param {string} hex The hex encoded string.
 * @returns {string} The hex string from the given buffer.
 *
 * @throws {"sha256ripemd160 expects a string"} Thrown if non-string is provided.
 * @throws {"invalid hex string length"} Thrown if the given hex string is an invalid one.
 */
export declare const sha256ripemd160: (hex: string) => string;
/**
 * Encode address from the string or Buffer.
 *
 * @param {string|Buffer} value The string or Buffer to be encoded.
 * @param {string} prefix The prefix of the address. (optional)
 * @param {BufferEncoding} type The buffer encoding type. It will be used when string is provided. (optional)
 * @returns {string} The address generated from the given string or buffer.
 */
export declare const encodeAddress: (value: string | Buffer, prefix?: string, type?: BufferEncoding) => string;
/**
 * Create address from the public key.
 *
 * @param {Buffer} publicKey The public key in Buffer format.
 * @returns {string} The address generated from the given public key(buffer format).
 */
export declare const createAddress: (publicKey: Buffer) => string;
/**
 * Calculate pbkdf2 (Password-Based Key Derivation Function 2).
 *
 * @param {string|Buffer|Array|DataView} passphrase.
 * @param {string|Buffer|Array|DataView} salt
 * @param {number} iterations
 * @param {number} keylen
 * @param {string} digest
 * @returns {Buffer} The pbkdf2 value from the given options.
 */
export declare const pbkdf2Async: (passphrase: string | Buffer | NodeJS.TypedArray | DataView, salt: string | Buffer | NodeJS.TypedArray | DataView, iterations: number, keylen: number, digest: string) => Promise<Buffer>;

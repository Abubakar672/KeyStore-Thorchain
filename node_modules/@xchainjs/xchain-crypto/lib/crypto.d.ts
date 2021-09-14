/// <reference types="node" />
/**
 * The Keystore interface
 */
export declare type Keystore = {
    crypto: {
        cipher: string;
        ciphertext: string;
        cipherparams: {
            iv: string;
        };
        kdf: string;
        kdfparams: {
            prf: string;
            dklen: number;
            salt: string;
            c: number;
        };
        mac: string;
    };
    id: string;
    version: number;
    meta: string;
};
/**
 * Generate a new phrase.
 *
 * @param {string} size The new phrase size.
 * @returns {string} The generated phrase based on the size.
 */
export declare const generatePhrase: (size?: number) => string;
/**
 * Validate the given phrase.
 *
 * @param {string} phrase
 * @returns {boolean} `true` or `false`
 */
export declare const validatePhrase: (phrase: string) => boolean;
/**
 * Get the seed from the given phrase.
 *
 * @param {string} phrase
 * @returns {Buffer} The seed from the given phrase.
 *
 * @throws {"Invalid BIP39 phrase"} Thrown if phrase is an invalid one.
 */
export declare const getSeed: (phrase: string) => Buffer;
/**
 * Get the Keystore interface from the given phrase and password.
 *
 * @param {string} phrase
 * @param {string} password
 * @returns {Keystore} The keystore interface generated from the given phrase and password.
 *
 * @throws {"Invalid BIP39 phrase"} Thrown if phrase is an invalid one.
 */
export declare const encryptToKeyStore: (phrase: string, password: string) => Promise<Keystore>;
/**
 * Get the phrase from the keystore
 *
 * @param {Keystore} keystore
 * @param {string} password
 * @returns {Keystore} The phrase from the keystore.
 *
 * @throws {"Invalid password"} Thrown if password is an incorrect one.
 */
export declare const decryptFromKeystore: (keystore: Keystore, password: string) => Promise<string>;

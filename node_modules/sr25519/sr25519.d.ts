/* tslint:disable */
/* eslint-disable */
/**
* Perform a derivation on a secret
*
* * secret: UIntArray with 64 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector the derived keypair as a array of 96 bytes
* @param {Uint8Array} pair
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
export function derive_keypair_hard(pair: Uint8Array, cc: Uint8Array): Uint8Array;
/**
* Perform a derivation on a secret
*
* * secret: UIntArray with 64 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector the derived keypair as a array of 96 bytes
* @param {Uint8Array} pair
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
export function derive_keypair_soft(pair: Uint8Array, cc: Uint8Array): Uint8Array;
/**
* Perform a derivation on a publicKey
*
* * pubkey: UIntArray with 32 bytes
* * cc: UIntArray with 32 bytes
*
* returned vector is the derived publicKey as a array of 32 bytes
* @param {Uint8Array} public_key
* @param {Uint8Array} cc
* @returns {Uint8Array}
*/
export function derive_public_soft(public_key: Uint8Array, cc: Uint8Array): Uint8Array;
/**
* Generate a key pair.
*
* * seed: UIntArray with 32 element
*
* returned vector is the concatenation of first the private key (64 bytes)
* followed by the public key (32) bytes.
* @param {Uint8Array} seed
* @returns {Uint8Array}
*/
export function keypair_from_seed(seed: Uint8Array): Uint8Array;
/**
* Sign a message
*
* The combination of both public and private key must be provided.
* This is effectively equivalent to a keypair.
*
* * public: UIntArray with 32 element
* * private: UIntArray with 64 element
* * message: Arbitrary length UIntArray
*
* * returned vector is the signature consisting of 64 bytes.
* @param {Uint8Array} context
* @param {Uint8Array} public_key
* @param {Uint8Array} secret_key
* @param {Uint8Array} message
* @returns {Uint8Array}
*/
export function sign(context: Uint8Array, public_key: Uint8Array, secret_key: Uint8Array, message: Uint8Array): Uint8Array;
/**
* Verify a message and its corresponding against a public key;
*
* * signature: UIntArray with 64 element
* * message: Arbitrary length UIntArray
* * pubkey: UIntArray with 32 element
* @param {Uint8Array} context
* @param {Uint8Array} signature
* @param {Uint8Array} message
* @param {Uint8Array} public_key
* @returns {boolean}
*/
export function verify(context: Uint8Array, signature: Uint8Array, message: Uint8Array, public_key: Uint8Array): boolean;

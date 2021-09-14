"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = require("tweetnacl");
const utility_1 = require("../utility");
/**
 * Gets EdDSA(Ed25519) signature for message from private key.
 * @param message 32 byte hexadecimal string
 * @param priv 64 byte hexadecimal string of private key
 * @returns 64 byte hexadecimal string of Ed25519 signature
 */
exports.signEd25519 = (message, priv) => {
    return utility_1.toHex(Buffer.from(nacl.sign.detached(utility_1.toArray(message), utility_1.toArray(priv))));
};
/**
 * Checks if the signature from signEd25519 is valid.
 * @param message 32 byte hexadecimal string
 * @param signature 64 byte hexadecimal string of Ed25519 signature
 * @param pub 32 byte hexadecimal string of public key
 * @returns if signature is valid, true. Else false.
 */
exports.verifyEd25519 = (message, signature, pub) => {
    return nacl.sign.detached.verify(utility_1.toArray(message), utility_1.toArray(signature), utility_1.toArray(pub));
};
//# sourceMappingURL=ed25519.js.map
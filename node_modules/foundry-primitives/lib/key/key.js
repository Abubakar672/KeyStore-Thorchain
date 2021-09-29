"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nacl = require("tweetnacl");
const utility_1 = require("../utility");
/**
 * Generates a private key.
 * @returns 64 byte hexadecimal string of private key
 */
exports.generatePrivateKey = () => {
    return utility_1.toHex(Buffer.from(nacl.sign.keyPair().secretKey));
};
/**
 * Gets public key from private key.
 * @param priv 64 byte hexadecimal string of private key
 * @returns 32 byte hexadecimal string of public key
 */
exports.getPublicFromPrivate = (priv) => {
    return utility_1.toHex(Buffer.from(nacl.sign.keyPair.fromSecretKey(utility_1.toArray(priv)).publicKey));
};
//# sourceMappingURL=key.js.map
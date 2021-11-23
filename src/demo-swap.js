/** @format */

const thorchainClient = require("@xchainjs/xchain-thorchain");
const { AssetRuneNative, baseAmount } = require("@xchainjs/xchain-util");

const main = async () => {
  const runeClient = new thorchainClient.Client({
    network: "testnet",
    phrase:
      "expose blush snake marriage lock crop group define today such indoor school",
  });
  const memo = `SWAP:BNB.BNB:tbnb15sj0uva8gmt34q9zr7hrud0gacd0z7c44wt7zr`;
  const txId = await runeClient.deposit({
    asset: AssetRuneNative,
    amount: baseAmount(20 * 10 ** 8),
    memo,
  });
  console.log(`https://viewblock.io/thorchain/tx/${txId}?network=testnet`);
};
main();

import { FeeOptionKey, TxHash } from '@xchainjs/xchain-client'
import {
  BTCChain,
  BNBChain,
  THORChain,
  ETHChain,
  LTCChain,
  // BCHChain,
} from '@xchainjs/xchain-util'

import { AssetAmount, Pool, Percent } from '../entities'

export default Network = 'testnet' | 'mainnet'

export default TxParams = {
  assetAmount: AssetAmount,
  recipient: string,
  memo?: string,
  feeOptionKey?: FeeOptionKey
}

export default MultiSendParams = {
  assetAmount1: AssetAmount,
  assetAmount2: AssetAmount,
  recipient: string,
  memo?: string
}

export default AddLiquidityParams = {
  pool: Pool,
  runeAmount?: AssetAmount,
  assetAmount: AssetAmount
}

export default AddLiquidityTxns = {
  runeTx?: TxHash,
  assetTx?: TxHash
}

export default WithdrawParams = {
  pool: Pool,
  percent: Percent
}

// note only supported chains
export const supportedChains = [
  BTCChain,
  BNBChain,
  THORChain,
  ETHChain,
  LTCChain,
  // BCHChain,
]
export default SupportedChain = typeof supportedChains[number]

export default ChainWallet = {
  address: string,
  balance: AssetAmount[]
}

export default Wallet = Record<SupportedChain, ChainWallet>

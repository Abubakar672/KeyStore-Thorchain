import { TxHash, Balance, Network } from '@xchainjs/xchain-client';
import { Client as EthClient } from '@xchainjs/xchain-ethereum';
import { baseAmount, Chain, ETHChain } from '@xchainjs/xchain-util';
import { ETHERSCAN_API_KEY } from '../config/index';

import { AmountType, Amount, Asset, AssetAmount } from '../entities'
// import { IClient } from './client'
import { TxParams } from './types'
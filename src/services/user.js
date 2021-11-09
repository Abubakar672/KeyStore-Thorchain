
import { Client as BinanceClient } from '@xchainjs/xchain-binance';
import { Client as BitcoinClient } from '@xchainjs/xchain-bitcoin';
import { Client as ThorchainClient } from '@xchainjs/xchain-thorchain';
import { Client as EthereumClient } from '@xchainjs/xchain-ethereum/lib';
import { Client as LitecoinClient } from '@xchainjs/xchain-litecoin';
import { Client as BitcoinCashClient } from '@xchainjs/xchain-bitcoincash';
import { Balance } from '@xchainjs/xchain-client';


export class User {
  type;
  wallet; // Address
  keystore;
  clients;

  // for Ledger
  ledger;
  hdPath;
  balances;

  constructor(user) {
    this.type = user.type;
    this.wallet = user.wallet;
    this.keystore = user.keystore ?? null;
    this.ledger = user.ledger ?? null;
    this.hdPath = user.hdPath ?? null;
    this.clients = user.clients;
  }
}

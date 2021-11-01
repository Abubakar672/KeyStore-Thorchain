import { CoinIconsFromTrustWallet } from 'src/app/_const/icon-list';
import { assetToString, Chain } from '@xchainjs/xchain-util';
import { ethers } from 'ethers';

export class Asset {
  chain = Chain;
  symbol = string;
  ticker = string;
  iconPath = string;

  constructor(poolName) {
    const { chain, symbol, ticker } = this._getAssetFromString(poolName);
    this.chain = chain;
    this.symbol = symbol;
    this.ticker = ticker;

    const trustWalletMatch = CoinIconsFromTrustWallet[this.ticker];

    if (trustWalletMatch && chain !== 'THOR') {
      this.iconPath = `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/${trustWalletMatch}/logo.png`;
    } else {
      // Override token icons when not found in trustwallet

      switch (chain) {
        case 'BTC':
          this.iconPath =
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/assets/BTCB-1DE/logo.png';
          break;

        case 'LTC':
          this.iconPath =
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/litecoin/info/logo.png';
          break;

        case 'BNB':
          if (ticker === 'BNB') {
            this.iconPath =
              'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/binance/info/logo.png';
          }
          break;

        case 'ETH':
          if (this.symbol !== 'ETH') {
            // for ETH tokens
            this.iconPath = this._setEthIconPath(symbol, ticker);
          }
          break;

        case 'THOR':
          this.iconPath = 'assets/images/token-icons/thorchain-logo.png';
          break;

        case 'BCH':
          this.iconPath =
            'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/bitcoincash/info/logo.png';
          break;

        default:
          break;
      }
    }
  }

   _setEthIconPath(assetSymbol, assetTicker) {
    const assetAddress = assetSymbol.slice(assetTicker.length + 1);
    const strip0x = assetAddress.substr(2);
    const checkSummedAddress = ethers.utils.getAddress(strip0x);
    return `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${checkSummedAddress}/logo.png`;
  }

   _getAssetFromString(poolName) {
    let chain;
    let symbol;
    let ticker;

    const data = poolName.split('.');
    if (poolName.includes('.')) {
      chain = data[0];
      symbol = data[1];
    } else {
      symbol = data[0];
    }
    if (symbol) {
      ticker = symbol.split('-')[0];
    }

    return { chain, symbol, ticker };
  }
}

export const checkSummedAsset = (
  poolName
) => {
  const asset = new Asset(poolName);
  const assetAddress = asset.symbol.slice(asset.ticker.length + 1);
  const strip0x =
    assetAddress.substr(0, 2).toUpperCase() === '0X'
      ? assetAddress.substr(2)
      : assetAddress;
  const checkSummedAddress = ethers.utils.getAddress(strip0x);
  return {
    chain: asset.chain,
    ticker: asset.ticker,
    symbol: `${asset.ticker}-${checkSummedAddress}`,
  };
};

export const isNonNativeRuneToken = (asset) => {
  const runeTokens = [
    'BNB.RUNE-B1A', // chaosnet
    'BNB.RUNE-67C', // testnet
    'ETH.RUNE-0XD601C6A3A36721320573885A8D8420746DA3D7A0', // testnet
    'ETH.RUNE-0X3155BA85D5F96B2D030A4966AF206230E46849CB', // chaosnet
  ];

  return runeTokens.includes(`${asset.chain}.${asset.symbol}`.toUpperCase());
};

export const getChainAsset = (chain ) => {
  switch (chain) {
    case 'BTC':
      return new Asset('BTC.BTC');

    case 'LTC':
      return new Asset('LTC.LTC');

    case 'BCH':
      return new Asset('BCH.BCH');

    case 'ETH':
      return new Asset('ETH.ETH');

    case 'BNB':
      return new Asset('BNB.BNB');

    case 'THOR':
      return new Asset('THOR.RUNE');

    default:
      return null;
  }
};

export const assetIsChainAsset = (asset) => {
  return assetToString(getChainAsset(asset.chain)) === assetToString(asset);
};

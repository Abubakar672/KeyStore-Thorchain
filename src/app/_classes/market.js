/** @format */

export class Market {
  baseAssetSymbol;
  listPrice;
  lotSize;
  quoteAssetSymbol;
  tickSize;

  constructor(marketDTO) {
    this.baseAssetSymbol = marketDTO.base_asset_symbol;
    this.listPrice = Number(marketDTO.list_price);
    this.lotSize = Number(marketDTO.lot_size);
    this.quoteAssetSymbol = marketDTO.quote_asset_symbol;
    this.tickSize = Number(marketDTO.tick_size);
  }
}

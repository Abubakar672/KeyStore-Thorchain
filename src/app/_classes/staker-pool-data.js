import { Asset } from './asset';

export class StakerPoolData {
  asset;
  units;
  assetStaked;
  assetWithdrawn;
  runeStaked;
  runeWithdrawn;
  dateFirstStaked;
  heightLastStaked;

  constructor(dto) {
    this.asset = new Asset(dto.asset);
    this.units = dto.units;
    this.dateFirstStaked = dto.dateFirstStaked;
    this.heightLastStaked = dto.heightLastStaked;
    this.assetStaked = dto.assetStaked;
    this.runeStaked = dto.runeStaked;
  }
}

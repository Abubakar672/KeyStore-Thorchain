

export class PoolAddress {
  chain;
  pubKey;
  address;
  router;
  halted;
  gasRate;

  constructor(dto) {
    this.chain = dto.chain;
    this.pubKey = dto.pub_key;
    this.address = dto.address;
    this.halted = dto.halted;
    this.router = dto.router;
    this.gasRate = +dto.gas_rate;
  }
}

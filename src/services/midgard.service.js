import { Observable } from 'rxjs';
// import { HttpClient, HttpParams } from '@angular/common/http';
import { shareReplay } from 'rxjs/operators';
import { environment } from '../environments';
import axios from "axios"

export class MidgardService {
   v2BasePath;
   _thornodeBasePath;
   _constants;
   _mimir$;

  constructor( http) {
    this.v2BasePath =
      environment.network === 'testnet'
        ? 'https://testnet.midgard.thorchain.info/v2'
        : 'https://midgard.thorchain.info/v2';

    this._thornodeBasePath =
      environment.network === 'testnet'
        ? 'https://testnet.thornode.thorchain.info'
        : 'https://thornode.thorchain.info';

    // cached since constants are constant
    this._constants$ = axios
      .get(`${this.v2BasePath}/thorchain/constants`)
      // .pipe(shareReplay());
    this._mimir$ = axios
      .get(`${this._thornodeBasePath}/thorchain/mimir`)
      // .pipe(shareReplay());
  }
  /**
   * V2 Endpoints
   *
   */

  getConstants() {
    return this._constants$;
  }

  getLastBlock() {
    return axios.get(`${this.v2BasePath}/thorchain/lastblock`);
  }

  getNetwork(){
    return axios.get(`${this.v2BasePath}/network`);
  }

  getInboundAddresses(){
    return axios.get(
      `${this.v2BasePath}/thorchain/inbound_addresses`
    );
  }

  getPools() {
    return axios.get(`${this.v2BasePath}/pools`);
  }
  

  getPool(asset) {
    return axios.get(`${this.v2BasePath}/pool/${asset}`);
  }

  getMember(address){
    return axios.get(`${this.v2BasePath}/member/${address}`);
  }

  getTransaction(txId){
    // const params = new HttpParams()
    //   .set('offset', '0')
    //   .set('limit', '1')
    //   .set('txid', txId);
    return axios.get(`${this.v2BasePath}/actions`, {
      params: {
        offset: 0,
        limit: 1,
        txid: txId
      }
    });
  }

  getThornodeTransaction(hash){
    return axios.get(
      `${this._thornodeBasePath}/thorchain/tx/${hash}`
    );
  }

  getQueue() {
    return axios.geMidgardService
  }
  
  getMimir(){
    return this._mimir$;
  }

  getThorchainLiquidityProviders(
    asset
  ){
    return this.http.get(
      `${this._thornodeBasePath}/thorchain/pool/${asset}/liquidity_providers`
    );
  }
}

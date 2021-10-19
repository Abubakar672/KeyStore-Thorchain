import { generatePhrase, encryptToKeyStore ,decryptFromKeystore} from '@xchainjs/xchain-crypto'
import React, { Component, useEffect } from "react";
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';
import './App.css';
import {Network} from '@xchainjs/xchain-client';
import { Client as binanceClient } from '@xchainjs/xchain-binance';
import { Client as bitcoinClient } from '@xchainjs/xchain-bitcoin';
import { Client as thorchainClient } from '@xchainjs/xchain-thorchain';
import { Client as ethereumClient } from '@xchainjs/xchain-ethereum/lib';
import { Client as litecoinClient } from '@xchainjs/xchain-litecoin';
import { Client as bitcoinCashClient } from '@xchainjs/xchain-bitcoincash';
import { AssetRuneNative, BaseAmount, assetAmount, assetToBase, baseAmount, AssetETH, AssetBNB ,assetFromString} from '@xchainjs/xchain-util'
import * as types from '@xchainjs/xchain-util'
import {environment} from './environments';
import {Client as PolkadotClient} from '@xchainjs/xchain-polkadot';
import * as asset  from '@xchainjs/xchain-util';
import BigNumber from 'bignumber.js';

function App() {
  const [response, setResponse] = React.useState("")
  const [input, setInput] = React.useState("")
  const [fileKeyStore , setfileKeyStore] = React.useState("")

let test = types;
console.log("HLLLLLLOOOOOO", test.AssetETH);
  let key
  let fileReader
  let res
  let phrase
  // let userThorchainClient

  //Generation of Random Phrase and Encryption is going on here 
  const keystore = async () => {
    try {
     phrase = generatePhrase()
      console.log(phrase);
      key = await encryptToKeyStore(phrase, input);
      // console.log('key========>', key)
      
      /*File Downloading function is called here to download the Text File*/
      downloadTextFile();
    } catch (error) {
      console.log(error);
    }
  }

  /*File creation and saving here*/ 
  const downloadTextFile = () => {
    const element = document.createElement("a");
    console.log("keyy=====>>",key)
    const file = new Blob([JSON.stringify(key)], {
      type: "text/plain;charset=utf-8"
    });
    element.href = URL.createObjectURL(file);
    element.download = "Thor_Custom_Keystore";
    document.body.appendChild(element);
    element.click();
  }
  
  //File Decryption is going here
  const decryptKeyStore = async () => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileKeyStore);
    };

    //send Transaction
    const sendTransaction = async ()=>{
    const userEthereumClient = new ethereumClient({
      network:'testnet',
      phrase:res,
      etherscanApiKey: environment.etherscanKey,
      infuraCreds: { projectId: environment.infuraProjectId },
    });
    
    //Ethereum Transaction is doing here
    console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
    const to_address= '0xf50dc8f6670b1c4f85565fc6dc8c316578a4fadd';
    const send_amount = baseAmount(100000000000, 6);
    const memo = 'transfer'

    const result = await userEthereumClient.transfer({
      asset: AssetETH,
      recipient: to_address,
      amount: send_amount,
      memo,
    })
    console.log(result)
   
  }

  // const swapTransaction = async ()=>{
  //   const userEthereumClient = new ethereumClient({
  //     network:'testnet',
  //     phrase:res,
  //     etherscanApiKey: environment.etherscanKey,
  //     infuraCreds: { projectId: environment.infuraProjectId },
  //   });
  //   console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
  //   const to_address= '0xf50dc8f6670b1c4f85565fc6dc8c316578a4fadd';
  //   const send_amount = baseAmount(10000, 6);
  //   const memo = 'swap:ETH.BNB:tbnb1ftzhmpzr4t8ta3etu4x7nwujf9jqckp3th2lh0'
    
  //   const result = await userEthereumClient.deposit({
  //   asset: AssetBNB,
  //   amount: send_amount,
  //   memo,
  //   })
  //   console.log(result)
  //   }

    //File handiling is done here and getting the menomics after the decryption of the file data is done here
    const handleFileRead = async (e) => {
      const content = JSON.parse(fileReader.result);
      console.log("content", content);
      res = await decryptFromKeystore(content, input);
      console.log("decryption=====>", res);


      //Network is defined here for all the general networks 
      const network = environment.network === 'testnet' ? Network.Testnet : Network.Mainnet;
      console.log("Enabled Network: ---------------> ", network)
      //Binance Address is getting from here
      const userBinanceClient = new binanceClient({ network, phrase:res });
      let BinanceClientAddress= userBinanceClient.getAddress();
      console.log("User Binance Client address: ---------------> ",BinanceClientAddress);
      //Transactions history of Binance Client getting here 
      const transationResultOfBinanceClient= await userBinanceClient.getTransactions({address: BinanceClientAddress})
      console.log("Transaction Data of Binance CLient", transationResultOfBinanceClient);
      


      //Bitcoin Client is set here 
      const userBtcClient = new bitcoinClient({
        network,
        phrase:res,
        sochainUrl: 'https://sochain.com/api/v2',
        blockstreamUrl: 'https://blockstream.info',
      });
      //Bitcoin Client is Address generating from here
      console.log("User Btc Client: ---------------> ", userBtcClient.getAddress())
      let addressBtc = userBtcClient.getAddress();
      console.log("BTC Address: ---------------> ",addressBtc);
      //Balance of Bitcoin is getting from here
      const balanceBtc = await userBtcClient.getBalance(addressBtc);
      console.log("balance: ---------------> ", balanceBtc);
      //Transactions history of BTC Client getting here 
      const transationResultOfBTCClient= await userBtcClient.getTransactions({address: addressBtc})
      console.log("Transaction Data of BTC CLient", transationResultOfBTCClient);




      //Thorchain Client is set here 
      const userThorchainClient = new thorchainClient({ network, phrase :res });
      console.log("User Thorchain Client: ---------------> ",userThorchainClient);
      //Thorchain Address is generation from here 
      const thorAddress = await userThorchainClient.getAddress();
      console.log("THORChain Address: ---------------> ", thorAddress);      
      //Balance of THORChain is getting from here "transfer"
      const balanceThor = await userThorchainClient.getBalance(thorAddress);
      console.log('THORChain Balance: ---------------> ', balanceThor);
      //Transactions history of Thorchain Client getting here 
      const transationResultOfTHORChain= await userThorchainClient.getTransactions({address: thorAddress})
      console.log("Transaction Data of THORChain CLient", transationResultOfTHORChain);
      


      // Ethereum CLinet is set here  
      const userEthereumClient = new ethereumClient({
        network:'testnet',
        phrase:res,
        etherscanApiKey: environment.etherscanKey,
        infuraCreds: { projectId: environment.infuraProjectId },
      });
      // //Ethereum Client Address is generation from here
      // console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
      //Ethereum CLient Provider is printing here
      const provider = userEthereumClient.getProvider();
      console.log("Ethereum Provider: ---------------> ",provider);
      // //Ethereum Balance is getting from here
      // const ethBalance = await provider.getBalance(addressEth);
      // console.log("Ethereum Balance: ---------------> ", ethBalance.toString());
      let addressEth = userEthereumClient.getAddress();
      console.log("Ethereum Address: ---------------> ", addressEth)
      //Ethereum Client Balance is getting from here 
      const balance1eth = await userEthereumClient.getBalance(addressEth);
      console.log("Ethereum Client Balance: ---------------> ",balance1eth);
      //Transactions import { Amount, Asset, AssetAmount, Denomination } from '@xchainjs/xchain-util/lib/types';


     
      //LTC Client is setup here 
      const userLtcClient = new litecoinClient({
         network, 
         phrase:res 
        });
      // LTC Client Address generation is done here
      let addressLTC = userLtcClient.getAddress();
      console.log("User LTC Client: ---------------> ",addressLTC);
      //LTC Client Balance is getting from here 
      const balanceLTC = await userLtcClient.getBalance(addressLTC);
      console.log("LTC Client Balance: ---------------> ",balanceLTC);
      //Transactions history of LTC Client getting here 
      const transationResultOfLTC= await userLtcClient.getTransactions({address: addressLTC})
      console.log("Transaction Data of LTC CLient", transationResultOfLTC);



      //BCH Client is setup here 
      const userbchClient = new bitcoinCashClient({ network,
        phrase:res 
      });
      //BCH Client Address generation is done here
      let addressBCH =userbchClient.getAddress();
      console.log("User BCH Client: ---------------> ",addressBCH);
      //BCH Client Balance getting is done here
      const balanceBCH = await userbchClient.getBalance(addressBCH);
      console.log("LTC Client Balance: ---------------> ",balanceBCH);
      //Transaction History of BCH Client getting here
      const transationResultOfBCH= await userbchClient.getTransactions({address: addressBCH})
      console.log("Transaction Data of LTC CLient", transationResultOfBCH);

      //PolkaDot Client is setup here
      const userPolkaDotClient = new PolkadotClient({
        network:'testnet',
        phrase:res
      });
      console.log("User PolkaDot Client: ---------------> ", userPolkaDotClient.getAddress());


//Assets getting work from xchain done here 

// const getChainAsset = (chain) => {
//   console.log("=====> I AMM HERE ", chain)
//   switch (chain) {
//     case 'BTC':
//       return new asset('BTC.BTC');

//     case 'LTC':
//       return new asset('LTC.LTC');

//     case 'BCH':
//       return new asset('BCH.BCH');

//     case 'ETH':

//       return new asset('ETH.ETH');

//     case 'BNB':
//       return new asset('BNB.BNB');

//     case 'THOR':
//       return new asset('THOR.RUNE');

//     default:
//       return null;
//   }
// }



// const assetIsChainAsset = (asset)=> {
//   return assetFromString(getChainAsset(asset))===assetFromString(asset);
// }
// console.log("==================>>>>>>>>",assetIsChainAsset('ETH'));
     };
  
  //Submit button to trigger the things 
  const SubmitAll=async()=>{
  console.log("password====>", typeof input);
  console.log("fileKeyStroe====>", typeof fileKeyStore);
  decryptKeyStore()
}
return <>
    <Container>
      <Segment>
        <div>
          <h1>Thorchain Custom Keystore Maker</h1>
          <h4>Enter your Password</h4>
          <input id="input" value={input} onChange={e => setInput(e.target.value)} />
          <Button primary onClick={keystore}>Create KeyStore</Button>
        </div>
        <h1> Thorchain KeyStore Decryption </h1>
        <div>
          <h1>Enter your password</h1>
       {/* // <input id="password" value={input} onchange ={e=> setInput(e.target.value)}/> */}
        </div>
        
        <div>
        <input type="file"onChange={((e)=>{
          setfileKeyStore(e.target.files[0]);

        })}/>
                <button onClick={SubmitAll} >
                  Upload!
                </button>
        </div>
        
        <button
         onClick={sendTransaction}>
         send Transaction
        </button>

        <button
         onClick={sendTransaction}>
         Swap
        </button>

      </Segment>
    </Container>
  </>;
}

export default App;
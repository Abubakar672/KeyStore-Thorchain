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
import {environment} from './environments';
import {Client as PolkadotClient} from '@xchainjs/xchain-polkadot';


function App() {
  const [response, setResponse] = React.useState("")
  const [input, setInput] = React.useState("")
  const [fileKeyStore , setfileKeyStore] = React.useState("")

  let key
  let fileReader
  let res
  let phrase
  let dec

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
    element.download = "Thro_Custom_Keystore";
    document.body.appendChild(element);
    element.click();
  }
  
  //File Decryption is going here
  const decryptKeyStore = async () => {
    fileReader = new FileReader();
    fileReader.onloadend = handleFileRead;
    fileReader.readAsText(fileKeyStore);
    };

    let client; 
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
      console.log("User Binance Client: ---------------> ", userBinanceClient.getAddress())
      
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

      //Thorchain Client is set here 
      const userThorchainClient = new thorchainClient({ network, phrase :res });
      console.log("User Thorchain Client: ---------------> ",userThorchainClient);

      //Thorchain Address is generation from here 
      const thorAddress = await userThorchainClient.getAddress();
      console.log("THORChain Address: ---------------> ", thorAddress);
      //Balance of THORChain is getting from here 
      const balanceThor = await userThorchainClient.getBalance(thorAddress);
      console.log('THORChain Balance: ---------------> ', balanceThor);

      //Ethereum CLinet is set here 
      const userEthereumClient = new ethereumClient({
        network:'testnet',
        phrase:res,
        etherscanApiKey: environment.etherscanKey,
        infuraCreds: { projectId: environment.infuraProjectId },
      });
      
      //Ethereum Client Address is generation from here
      console.log("User Ethereum Client: ---------------> ", userEthereumClient.getAddress());
      
      //Ethereum CLient Provider is printing here
      const provider = userEthereumClient.getProvider();
      console.log("Ethereum Provider: ---------------> ",provider);
      
      let addressEth = userEthereumClient.getAddress();
      console.log("Ethereum Address: ---------------> ", addressEth)
      
      //Ethereum Client Balance is getting from here 
      const balance1eth = await userEthereumClient.getBalance(addressEth);
      console.log("Ethereum Client Balance: ---------------> ",balance1eth);

      //Ethereum Balance is getting from here
      const ethBalance = await provider.getBalance(addressEth);
      console.log("Ethereum Balance: ---------------> ", ethBalance.toString());

      //LTC Client is setup here 
      const userLtcClient = new litecoinClient({ network, phrase:res });
      console.log("User LTC Client: ---------------> ",userLtcClient.getAddress());
      
      //BCH Client is setup here 
      const userbchClient = new bitcoinCashClient({ network, phrase:res });
      console.log("User BCH Client: ---------------> ",userbchClient.getAddress());

      //PolkaDot Client is setup here
      const userPolkaDotClient = new PolkadotClient({
        network:'testnet',
        phrase:res
      });
      console.log("User PolkaDot Client: ---------------> ", userPolkaDotClient.getAddress());

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

      </Segment>
    </Container>
  </>;
}

export default App;
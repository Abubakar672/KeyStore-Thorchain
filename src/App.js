import { generatePhrase, encryptToKeyStore ,decryptFromKeystore} from '@xchainjs/xchain-crypto'
import React, { Component, useEffect } from "react";
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';
import './App.css';
import { Client } from '@xchainjs/xchain-thorchain';
import {Network} from '@xchainjs/xchain-client';
// import { Client, Network } from '@xchainjs/xchain-bitcoin/lib'
import { Client as binanceClient } from '@xchainjs/xchain-binance';
import { Client as bitcoinClient } from '@xchainjs/xchain-bitcoin';
import { Client as thorchainClient } from '@xchainjs/xchain-thorchain';
import { Client as ethereumClient } from '@xchainjs/xchain-ethereum/lib';
import { Client as litecoinClient } from '@xchainjs/xchain-litecoin';
import { Client as bitcoinCashClient } from '@xchainjs/xchain-bitcoincash';
import {environment} from './environments'


function App() {
  const [response, setResponse] = React.useState("")
  const [input, setInput] = React.useState("")
  const [fileKeyStore , setfileKeyStore] = React.useState("")

  let key
  let fileReader
  let res
  let phrase
  let dec
  // console.log("Response ================ ", response)


  //Generation of Random Phrase and Encryption is going on here 
  const keystore = async () => {
    try {
     phrase = generatePhrase()
      console.log(phrase);
      key = await encryptToKeyStore(phrase, input);
      // console.log('key========>', key)
      
      downloadTextFile();

    } catch (error) {
      console.log(error);
    }
  }

//   const handleValidation =() => {
//     const { input } = this.state;

//     // only each block with generate error
//     if (!input || isNaN(input)) {
//       this.setState({ error: 'price is not valid' });
//     }else {
//       this.setState({error: ""})
//       // submit code here
//     }
// }

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
      dec = await decryptFromKeystore(content, input);
      console.log("decryption=====>", dec);
      // … do something with the 'content' …
      const network = environment.network === 'testnet' ? Network.Testnet : Network.Mainnet;
      console.log("Network", network)
      const userBinanceClient = new binanceClient({ network, phrase:res });
      console.log("userBinanceClient", userBinanceClient.getAddress())
      
      const userBtcClient = new bitcoinClient({
        network,
        phrase:res,
        sochainUrl: 'https://sochain.com/api/v2',
        blockstreamUrl: 'https://blockstream.info',
      });
      console.log("userBtcClient<><><><><><><>", userBtcClient.getAddress())
      let addressBtc = userBtcClient.getAddress();
      const balanceBtc = await userBtcClient.getBalance(addressBtc);
      console.log("balance<><><><>", balanceBtc);

      const userThorchainClient = new thorchainClient({ network, phrase :dec });
      console.log("userThorchainClient",userThorchainClient);

      const thorAddress = await userThorchainClient.getAddress();
      console.log("thorAddress=======================>", thorAddress); 
      const balanceThor = await userThorchainClient.getBalance(thorAddress);

      console.log('balanceThor>>>>>:', balanceThor[0]) 

      console.log("decryption=====>", dec);
      const userEthereumClient = new ethereumClient({
        network:'testnet',
        phrase:dec,
        etherscanApiKey: environment.etherscanKey,
        infuraCreds: { projectId: environment.infuraProjectId },
      });
      console.log("userEthereumClient======================>", userEthereumClient.getAddress());

      const provider = userEthereumClient.getProvider();
      console.log(provider)
      // let addressEth = userEthereumClient.getAddress();
      // const ethBalance = await provider.getBalance(addressEth);
      // const balance1eth = await userEthereumClient.getBalance(addressEth);
      // console.log("balance<><><><>", ethBalance);


      const userLtcClient = new litecoinClient({ network, phrase:res });
      console.log("userLtcClient",userLtcClient.getAddress());
      
      const userbchClient = new bitcoinCashClient({ network, phrase:res });
      console.log("userbchClient",userbchClient.getAddress());


      //ThorChain address coming from here
      client = new Client({ network: Network.Testnet, phrase: res })
      const address = client.getAddress()
      console.log('address:', client.getAddress())  
      console.log(address)
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
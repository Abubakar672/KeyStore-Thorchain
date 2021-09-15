import { generatePhrase, encryptToKeyStore ,decryptFromKeystore} from '@xchainjs/xchain-crypto'
import React, { Component, useEffect } from "react";
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';
import './App.css';
import { Client } from '@xchainjs/xchain-thorchain';
import {Network} from '@xchainjs/xchain-client';
// import { Client, Network } from '@xchainjs/xchain-bitcoin/lib'


function App() {
  const [response, setResponse] = React.useState("")
  const [input, setInput] = React.useState("")
  const [fileKeyStore , setfileKeyStore] = React.useState("")

  let key
  let fileReader
  let res
  // console.log("Response ================ ", response)


  //Generation of Random Phrase and Encryption is going on here 
  const keystore = async () => {
    try {
      const phrase = generatePhrase()
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
      console.log(content);
      res = await decryptFromKeystore(content, input);
      console.log("decryption=====>", res);
      // … do something with the 'content' …

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
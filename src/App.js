import { generatePhrase, encryptToKeyStore } from '@xchainjs/xchain-crypto'
import logo from './logo.svg';
import React, { Component, useEffect } from "react";
import { Button, Container, Header, Segment, Grid } from 'semantic-ui-react';
import './App.css';

// Crypto Constants for xchain
const cipher = 'aes-128-ctr'
const kdf = 'pbkdf2'
const prf = 'hmac-sha256'
const dklen = 32
const c = 262144
const hashFunction = 'sha256'
const meta = 'xchain-keystore'

function App() {
  const [response, setResponse] = React.useState("")
  const [input, setInput] = React.useState("")
  let key
 
  // console.log("Response ================ ", response)

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
      // const file = new Blob([document.getElementById('input').value],{
      type: "text/plain;charset=utf-8"
    });

    // console.log("file==========", file)

    element.href = URL.createObjectURL(file);
    element.download = "Thro_Custom_Keystore";
    document.body.appendChild(element);
    element.click();
  }

  // state = {
 
  //   // Initially, no file is selected
  //   selectedFile: null
  // };

// const  onFileChange = event => {
    
//     // Update the state
//     this.setState({ selectedFile: event.target.files[0] });
  
//   };

//  const onFileUpload = () => {
    
//     // Create an object of formData
//     const formData = new FormData();
  
//     // Update the formData object
//     formData.append(
//       "myFile",
//       this.state.selectedFile,
//       this.state.selectedFile.name
//     );}

    // Decryption Going on

  // const phraseDecrypted = async()=>{
  // await decryptFromKeystore(keystore, password)
  // }
  // console.log(decryptFromKeystore)

  
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
        <input id="input" value={input} onchange ={e=> setInput(e.target.value)}/>
        </div>
        
        <div>
        <input type="file"/>
                <button >
                  Upload!
                </button>
        </div>

      </Segment>
    </Container>
  </>;
}

export default App;
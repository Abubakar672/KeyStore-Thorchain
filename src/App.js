import { generatePhrase, encryptToKeyStore } from '@xchainjs/xchain-crypto'
import logo from './logo.svg';
import React, { useState, useEffect } from "react";
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
  useEffect(async () => {
    const phrase = generatePhrase()
    console.log(phrase);
    // const isCorrect = validatePhrase(phrase)

    /*KeyStore Encryption is been done here*/
    const keystore = async () => {
      try {
        key = await encryptToKeyStore(phrase, input);
        // console.log('key========>', key)
        return key;

      } catch (error) {
        console.log(error);
      }
    }
    const res = await keystore();
    setResponse(res)
    console.log('========>', res)
  }
    , [input]
  );
  // console.log("Response ================ ", response)



  /*File creation and saving here*/

  const downloadTextFile = () => {
    const element = document.createElement("a");
    const file = new Blob([JSON.stringify(response)], {
      // const file = new Blob([document.getElementById('input').value],{
      type: "text/plain;charset=utf-8"
    });

    // console.log("file==========", file)

    element.href = URL.createObjectURL(file);
    element.download = "Thro_Custom_Keystore";
    document.body.appendChild(element);
    element.click();
  }

  //Decryption Going on

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
          <Button primary onClick={downloadTextFile}>Create KeyStore</Button>
        </div>
      </Segment>
    </Container>
  </>;
}

export default App;
import { generatePhrase, encryptToKeyStore } from '@xchainjs/xchain-crypto'
import logo from './logo.svg';
import React, { useState, useEffect } from "react";
 
import './App.css';
 
// Crypto Constants for xchain
const cipher = 'aes-128-ctr'
const kdf = 'pbkdf2'
const prf = 'hmac-sha256'
const dklen = 32
const c = 262144
const hashFunction = 'sha256'
const meta = 'xchain-keystore'
 
// const phraseDecrypted = async()=>{
// await decryptFromKeystore(keystore, password)
// }
// console.log(decryptFromKeystore)
 
function App() {
  useEffect( async () => {
    
    const phrase = generatePhrase()
    console.log(phrase);
    // const isCorrect = validatePhrase(phrase)
    const password = 'thorchain'
    console.log(password);
//  asdsadsadsaadsasdasdasdassaddasd
     
    const keystore = async ()=>{
      try {
        let key = await encryptToKeyStore(phrase, password);
        console.log('key========>',key)
        return key;
        
      } catch (error) {
        console.log(error);
 
        
      }
     
    
    }
    const res = await keystore();
 
    console.log('========>',res)
     
    
    
 
     }
    , []
    );
return(
 <div className="App">
 <header className="App-header">
 <img src={logo} className="App-logo" alt="logo" />
 <p>
 Edit <code>src/App.js</code> and save to reload.
 </p>
 <a
 className="App-link"
 href="https://reactjs.org"
 target="_blank"
 rel="noopener noreferrer"
 >
 Learn React
 </a>
 </header>
 </div>
)}
 
export default App;
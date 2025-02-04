'use client'
import { useState, useEffect } from 'react'

export function Read(){
    const [value, setvalue] = useState([])

async function Checking(){
    
    try{
        const ndef = new NDEFReader();
        await ndef.scan();
        ndef.addEventListener("readingerror", () => {
          console.log("Argh! Cannot read data from the NFC tag. Try another one?");
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            setvalue(message.records[0])
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        console.log("Argh! " + error);
      } 
}

    return(
        <div>
        <p>{value.data}</p>
        <button onClick={() => Checking()}>scan</button>
    </div>
      )
}

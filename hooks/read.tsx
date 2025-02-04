'use client'
import { useState, useEffect } from 'react'

export function Read(){
    const [value, setvalue] = useState<string>()

async function Checking(){
    
    try{
        const ndef = new NDEFReader();
        await ndef.scan();
        ndef.addEventListener("readingerror", () => {
          console.log("Argh! Cannot read data from the NFC tag. Try another one?");
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
            setvalue(message.records[0].data)
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);
        });
      } catch (error) {
        console.log("Argh! " + error);
      } 
}

    return(
        <div>
        <p>{value}</p>
        <button onClick={() => Checking()}>scan</button>
    </div>
      )
}

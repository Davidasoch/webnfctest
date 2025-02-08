'use client'
import { useState, useEffect } from 'react'
import Scanner  from '@/app/components/scanbox'
import React, { useContext } from 'react'
import { ScanContext } from '@/app/context/scan'

export function Read(){
    const [value, setvalue] = useState<string>() 
    const [scanStatus, setScanStatus] = useState(false);
    setScanStatus(useContext(ScanContext))

    console.log(scanStatus)

async function Checking(){

    try{
        const ndef = new NDEFReader();
        await ndef.scan();

        ndef.addEventListener("readingerror", () => {
          console.log("Argh! Cannot read data from the NFC tag. Try another one?");
        });
    
        ndef.addEventListener("reading", ({ message, serialNumber }) => {
          console.log(`> Serial Number: ${serialNumber}`);
          console.log(`> Records: (${message.records.length})`);

          const decoder = new TextDecoder();
          for (const record of message.records) {
            switch (record.recordType) {
              case "text":
                const textDecoder = new TextDecoder(record.encoding);
                setvalue(`${textDecoder.decode(record.data)}`)
                console.log(`Text: ${textDecoder.decode(record.data)} (${record.lang})`);
                break;
              case "url":
                console.log(`URL: ${decoder.decode(record.data)}`);
                break;
              case "mime":
                break;
              default:
                console.log(`Record not handled`);
            }
          }

        });

      } catch (error) {
        console.log("Argh! " + error);
      } 
}

    return(
      <>

      {scanStatus===true ?
        <div>
        <p>{value}</p>
        <button onClick={() => Checking()} className="btn">scan</button>
        </div>
        :<ScanContext.Provider value={scanStatus}>
        {scanStatus && <Scanner/>}
      </ScanContext.Provider>}

    </>
      )
}

import React, { useCallback, useContext, useEffect, useState } from 'react';
import Scanner  from '@/app/components/scanbox'
//import { ScanContext } from '@/app/context/scan'
import { ActionsContext } from '@/app/context/scantest';
import Notification from '@/app/components/notification'

const Scan = () => {
    const [message, setMessage] = useState('');
    const [serialNumber, setSerialNumber] = useState('');
    const { actions, setActions} = useContext(ActionsContext);
    let input = actions.scan

    const scan = useCallback(async() => {
        if ('NDEFReader' in window ) {  
            if(actions.scan!='disabled'){
                try {
                    const ndef = new window.NDEFReader();
                    await ndef.scan();
                    
                    console.log("Scan started successfully.");
                    ndef.onreadingerror = () => {
                        console.log("Cannot read data from the NFC tag. Try another one?");
                    };
                    
                    ndef.onreading = event => {
                        console.log("NDEF message read.");
                        onReading(event);
                        setActions({
                            scan: 'scanned',
                            write: null
                        });
                    };
    
                } catch(error){
                    console.log(`Error! Scan failed to start: ${error}.`);
                };
            }else{
                setActions({scan: 'disabled',
                    write: null})
            }



            

        }
    },[setActions]);

    const onReading = ({message, serialNumber}) => {
        setSerialNumber(serialNumber);
        for (const record of message.records) {
            switch (record.recordType) {
                case "text":
                    const textDecoder = new TextDecoder(record.encoding);
                    setMessage(textDecoder.decode(record.data));
                    break;
                case "url":
                    // TODO: Read URL record with record data.
                    break;
                default:
                    // TODO: Handle other records with record data.
                }
        }
    };

    //if(actions.scan != 'disabled'){
        useEffect(() => {
            scan();
        }, [scan]);
   // }else{
       // return <></>;
   // }

    
    console.log(actions.scan)

    return(
        <>
{(() => {
        switch (actions.scan) {
          case "scanned":   return <div>
          <Notification message={message}/>
          <Scanner status={actions.scan}></Scanner>
          <p>{input}</p>
      </div>
          case "scanning": return <div> <Scanner status={actions.scan}></Scanner>   <p>{input}</p></div>

          case "disabled": return <><p>disabled</p></>

          default:      return null;
        }
      })()}



 
        </>
    );
};

export default Scan;
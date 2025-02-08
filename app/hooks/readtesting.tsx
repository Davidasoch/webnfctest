
import { useState, useEffect, useContext, useCallback } from 'react'
import { scanContext } from '@/app/utils/context';
import { contextHandler } from "@/app/utils/actionshandler";
import Scanner  from "@/app/components/scanbox"
import Notification from '@/app/components/notification'

const  Read = () =>{
    const [message, setMessage] = useState('');
    const [actions, setActions] = useState(useContext(scanContext))
    const [serialNumber, setSerialNumber] = useState('');
    const action = useContext(scanContext)

        const scan = useCallback(async() => {

        if ('NDEFReader' in window) { 
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
                    contextHandler('scanned');
                };

            } catch(error){
                console.log(`Error! Scan failed to start: ${error}.`);
            };
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

  useEffect(() => {
      scan();
  }, [scan]);




    return(
      <>
      {actions === 'scanned' ?  
      <div>

      </div>
      :<Notification message={'fdgdfgdfgd'}/> }
      
  </>


      )
}

export default Read
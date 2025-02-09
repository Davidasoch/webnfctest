
'use client'
import {Read} from "@/app/hooks/read";
import "@/app/styles/buttons.css";
import { useState, useContext } from 'react'
import { ScanContext } from '@/app/context/scan'
import { ActionsContext } from '@/app/context/scantest';
import  Scan from '@/app/hooks/reader'
import Notification from '@/app/components/notification'
//import Scanner  from '@/app/components/scanbox'



export default function page() {

let scanStatus = useContext(ScanContext);


const [actions, setActions] = useState(null);

const {scan, write} = actions || {};

const actionsValue = {actions,setActions};

const onHandleAction = (actions) =>{
  setActions({...actions});
}

console.log(actions)

return (
    <div className="App">
      <img className="App-logo" alt="logo" />
      <h1>NFC Tool</h1>
      <div className="App-container">
        <button onClick={()=>onHandleAction({scan: 'scanning', write: null})} className="btn">Scan</button>
      </div>
      <ActionsContext.Provider value={actionsValue}>
        { scan && <Scan/>}
      </ActionsContext.Provider>
    </div>
);
}

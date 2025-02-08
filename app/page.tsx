
'use client'
import {Read} from "@/app/hooks/read";
import "@/app/styles/buttons.css";
import { useState, useContext } from 'react'
import { ScanContext } from '@/app/context/scan'
import { ActionsContext } from '@/app/context/scantest';
import  Scan from '@/app/hooks/reader'
//import Scanner  from '@/app/components/scanbox'



export default function page() {

  const [scanState, setScanState] = useState(false);
 // const [scanS, setSc] = useState(false);

function toggleScanState()  {
 setScanState(!scanState)
}

let scanStatus = useContext(ScanContext);


const [actions, setActions] = useState(null);
const {scan, write} = actions || {};

const actionsValue = {actions,setActions};

const onHandleAction = (actions) =>{
  setActions({...actions});
}

return (
    <div className="App">
      <img className="App-logo" alt="logo" />
      <h1>NFC Tool</h1>
      <div className="App-container">
        <button onClick={()=>onHandleAction({scan: 'scanning', write: null})} className="btn">Scan</button>
      </div>
      <ActionsContext.Provider value={actionsValue}>
        {scan && <Scan/>}
      </ActionsContext.Provider>
    </div>
);

}

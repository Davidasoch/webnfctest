import { useState, useEffect } from 'react'

export function Counter() {

const[check,setCheck] = useState<string>('')

function checking(){
    if (!("NDEFReader" in window)){
        setCheck("Web NFC is not available. Use Chrome on Android.");
     } else{
        setCheck("Web NFC is available!");
     }
}
return(
    <div>
        <p>{check}</p>
        <button onClick={() => checking()}>test</button>
    </div>
)
}
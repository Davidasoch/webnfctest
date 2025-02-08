import { createContext, useState} from "react";
import Scanner from '@/app/components/scanbox'

const scanContext = createContext(false);

const  ScanContext = (contextvalue) => {

    const [scanState, setScanState] = useState(false);
    setScanState

    
    return (

        scanState 

        ?<scanContext.Provider value={{ scanState }}>
            <Scanner/>
        </scanContext.Provider>
      
        :<p></p>
          
        );


  }

  export default ScanContext
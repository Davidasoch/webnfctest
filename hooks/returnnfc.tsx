export function Read() {
  
    let result: string = "init";

    if (!("NDEFReader" in window)){
        result="Web NFC is not available. Use Chrome on Android.";
     } else{
        result="Web NFC is available.";
     }

  return(<p>{result}</p>);
}
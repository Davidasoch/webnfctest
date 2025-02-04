'use client'
import { useState, useEffect } from 'react'

export const MyComp = () => {
    let result: string = "init";

useEffect(() => {
    // window is accessible here.
    if (!("NDEFReader" in window)){
        result="Web NFC is not available. Use Chrome on Android.";
     } else{
        result="Web NFC is available.";
     }
    console.log({result});
  }, [result]);

  return (<div></div>)
}
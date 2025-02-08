'use client'
import { useState } from "react";
import { scanContext } from '@/app/utils/context';

export function contextHandler(value: string) {
        const [scan, setScan] = useState('');
        setScan(value)
        return(
            <scanContext.Provider value={scan}></scanContext.Provider>
        )
        }
        
       
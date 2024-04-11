"use client"

import { useEffect, useState } from "react"

type InputProps = {
    value: string,
    setValue: (newValue:string) => void,
    fallBack?: any,
    regex?: RegExp,
    className?:string,
    type:"password"|"text",
    placeholder?:string
}

function Input({value,setValue,fallBack,regex,type,className,placeholder}:InputProps) {
    
    const [showFallBack,setShowFallBack] = useState<boolean>(false)

    const changeValue = (e:any) => {
        const newValue:string = e.target.value
        setValue(newValue)
    }

    useEffect(()=>{
        if (regex) {
            if (!value.match(regex)) {
                setShowFallBack(true)
            } else {
                setShowFallBack(false)
            }
        }
    },[value])

    return (
        <div className="flex flex-col w-full gap-5">
            <input 
                value={value}
                className={`${className ? className : ''}`}
                onChange={changeValue}
                type={type}
                placeholder={placeholder ? placeholder : ''}
            >

            </input>
            
            {
                showFallBack ? fallBack : <></>
            }
        </div>
    )
}

export default Input
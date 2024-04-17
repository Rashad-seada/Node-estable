"use client"

import { useState } from "react"

type InputProps = {
    value: string,
    setValue: (newValue:string) => void,
    fallback?: any,
    regex?: RegExp,
    className?:string,
    type:"password"|"text"|"number",
    placeholder?:string,
    setIsValueValid?:(newValue:boolean) => void
}

function Input({
    value,
    setValue,
    fallback,
    regex,
    type,
    className,
    placeholder,
    setIsValueValid
}:InputProps) {
    
    const [showFallback,setShowFallback] = useState<boolean>(false)

    const changeValue = (e:any) => {
        const newValue:string = e.target.value
        setValue(newValue)

        if (regex) {
            if (!regex.test(newValue)) {
                setShowFallback(true)
                if (setIsValueValid) {
                    setIsValueValid(false)
                }
            } else {
                setShowFallback(false)
                if (setIsValueValid) {
                    setIsValueValid(true)
                }
            }
        }
    }
    


    return (
        <>
            <input 
                value={value}
                className={`${className ? className : ''}`}
                onChange={changeValue}
                type={type}
                placeholder={placeholder ? placeholder : ''}
            >

            </input>
            
            {
                showFallback ? fallback : <></>
            }
        </>
    )
}

export default Input
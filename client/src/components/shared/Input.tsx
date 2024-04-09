"use client"

import { useState } from "react"

type InputProps = {
    value: string,
    setValue: (newValue:string) => void,
    fallback?: any,
    regex?: RegExp,
    className?:string,
    type:"password"|"text",
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
                setIsValueValid(false)
            } else {
                setShowFallback(false)
                setIsValueValid(true)

            }
        }
    }
    


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
                showFallback ? fallback : <></>
            }
        </div>
    )
}

export default Input
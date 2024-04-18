'use client'

import { useEffect, useRef, useState } from "react"
import { TiArrowSortedDown } from "react-icons/ti"


type DropDownListProps = {
    options:any[],
    listValue:NameAndId,
    placeholder:string,
    setListValue:(newListValue:NameAndId)=>void,
    placeholderClassName?:string,
    listClassName?:string
}



function DropDownList({options,placeholder,listValue,placeholderClassName,listClassName,setListValue}:DropDownListProps) {

    const [showList,setShowList] = useState<boolean>(false)
    const toggleList = () => {
        setShowList(!showList)
    }

    const changeListValue = (value:NameAndId) => {
        setListValue(value)
        setShowList(false)
    }


    return (
        <div className='w-full max-w-[300px] relative h-full'>
            <div onClick={toggleList} className={`w-full cursor-pointer flex justify-between items-center h-full ${placeholderClassName}`}>
                <span className="truncate">{listValue?.name? listValue.name : placeholder}</span>
                <TiArrowSortedDown className='text-xl' />
            </div>

            {
                showList && (options.length > 0) ? (
                    <div className="absolute z-50 left-0 rounded-lg border-2 max-h-[350px] overflow-auto h-fit w-full mt-4">
                        <ul className={`w-full bg-smokey-white flex flex-col ${listClassName}`}>
                            {
                                options.map((option:NameAndId,idx:number) => (
                                    <li
                                        onClick={()=>changeListValue(option)}
                                        key={idx}
                                        className="w-full flex items-center p-2 h-[30px] cursor-pointer hover:bg-zinc-300"
                                    >
                                        <p className="truncate">{option?.name}</p>
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                ) : <></>
            }
        </div>
    )
}

export default DropDownList
'use client'

import { useEffect, useRef, useState } from "react"
import { TiArrowSortedDown } from "react-icons/ti"


type DropDownListProps = {
    options:any[],
    listValue:Option,
    placeholder:string,
    setListValue:(newListValue:Option)=>void,
    placeholderClassName?:string,
    listClassName?:string

}

type Option = {
    name:string,
    _id:string
}|null

function DropDownList({options,placeholder,listValue,placeholderClassName,listClassName,setListValue}:DropDownListProps) {

    const [showList,setShowList] = useState<boolean>(false)
    const toggleList = () => {
        setShowList(!showList)
    }

    const changeListValue = (value:Option) => {
        setListValue(value)
        setShowList(false)
    }


    return (
        <div className='w-fit relative h-full'>
            <div onClick={toggleList} className={`w-full cursor-pointer flex justify-between items-center h-full ${placeholderClassName}`}>
                <span>{listValue?.name? listValue.name : placeholder}</span>
                <TiArrowSortedDown className='text-xl' />
            </div>

            {
                showList && (options.length > 0) ? (
                    <div className="absolute left-0 rounded-lg border max-h-[350px] overflow-auto h-fit w-full mt-4">
                        <ul className={`w-full bg-smokey-white flex flex-col ${listClassName}`}>
                            {
                                options.map((option:Option,idx:number) => (
                                    <li
                                        onClick={()=>changeListValue(option)}
                                        key={idx}
                                        className="w-full flex items-center p-2 h-[30px] cursor-pointer hover:bg-zinc-300"
                                    >
                                        {option?.name}
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
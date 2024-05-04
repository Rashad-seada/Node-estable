import React from 'react'
import PageContent from '../shared/all/PageContent'
import ResourcesInput from '../shared/resources/ResourcesInput'
import ResourcesDropList from '../shared/resources/ResourcesDropList'

type PageInputsHolderProps = {
    inputs:Input[],
    dropDownLists?:DropDownList[],
    isInputsValid:boolean,
    handleSubmit:() => void,
    submitButtonLabel:string
}
function PageInputsHolder({
    inputs,
    dropDownLists,
    isInputsValid,
    handleSubmit,
    submitButtonLabel
}:PageInputsHolderProps) {
    return (
        <PageContent>
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>
                {
                    Boolean(dropDownLists) ? dropDownLists?.map((dropDownList:DropDownList,idx:number) => (
                        <ResourcesDropList
                            options={dropDownList.options}
                            setListValue={dropDownList.setListValue}
                            label={dropDownList.label || ""}
                            key={idx}
                            placeholder={dropDownList.placeholder}
                            listValue={dropDownList.listValue}
                        />
                    )) : ""
                }
                {
                    inputs.map((input:Input,idx:number) => (
                        <ResourcesInput
                            label={input.label}
                            placeholder={input.placeholder}
                            setValue={input.setValue}
                            value={input.value}
                            type={input.type}
                            key={idx}
                        
                        />
                    ))
                }
           
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleSubmit()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    {submitButtonLabel}
                </button>
            </div>
        </PageContent>
    )
}

export default PageInputsHolder
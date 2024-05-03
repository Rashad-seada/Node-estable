import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { packageCategories } from '@/constants/packageCategories'
import { packageStatuses } from '@/constants/packageStatuses'
import React from 'react'



type EditPackagePageContentProps = {
    handleUpdatePackageItem:() => void,
    isInputsValid:boolean,
    category:NameAndId,
    setCategory:(newState:NameAndId) => void,
    lessons:string,
    setLessons:(newState:string) => void,
    startDate:string,
    setStartDate:(newState:string) => void,
    endDate:string,
    setEndDate:(newState:string) => void,
    status:NameAndId,
    setStatus:(newState:NameAndId) => void,
    clients:NameAndId[]|[],
    client:NameAndId,
    setClient:(newState:NameAndId) => void
}
function EditPackagePageContent({
    handleUpdatePackageItem,
    isInputsValid,
    category,
    setCategory,
    lessons,
    setLessons,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    clients,
    client,
    setClient

}:EditPackagePageContentProps) {
    return (
        <PageContent>
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>

                <ResourcesDropList
                    listValue={client} 
                    setListValue={setClient}
                    placeholder="select client Name"
                    options={clients}
                    label='client name'
                />
                <ResourcesDropList
                    listValue={category} 
                    setListValue={setCategory}
                    options={packageCategories}
                    placeholder="select Item Category"
                    label='category'
                />
                <ResourcesInput
                    value={lessons} 
                    setValue={setLessons}
                    placeholder="Enter Lessons"
                    label='Lessons'
                    type='number'
                />
                <ResourcesInput
                    value={startDate} 
                    setValue={setStartDate}
                    placeholder="Enter Start Date"
                    label='start date'
                    type='datetime-local'
                />
                <ResourcesInput
                    value={endDate} 
                    setValue={setEndDate}
                    placeholder="Enter end Date"
                    label='end date'
                    type='datetime-local'
                />
                <ResourcesDropList
                    listValue={status} 
                    setListValue={setStatus}
                    options={packageStatuses}
                    placeholder="select Item Status"
                    label='status'
                />
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleUpdatePackageItem()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    save item
                </button>
            </div>
        </PageContent>
    )
}

export default EditPackagePageContent
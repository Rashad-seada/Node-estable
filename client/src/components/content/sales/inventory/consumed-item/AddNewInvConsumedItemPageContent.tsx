import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import React from 'react'


type AddNewConsumedItemPageContentProps = {
    handleAddNewConsumedInventoryItem: () => void,
    itemName:string,
    setItemName: (newState: string) => void,
    quantity:string,
    setQuantity: (newState: string) => void,
    price:string,
    setPrice: (newState: string) => void,
    measure:string,
    setMeasure:(newState: string) => void,
    isInputsValid:boolean,
    horses:NameAndId[]|[],
    setHorse: (newState:NameAndId) => void,
    horse:NameAndId
}
function AddNewConsumedItemPageContent({
    handleAddNewConsumedInventoryItem,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    price,
    setPrice,
    isInputsValid,
    measure,
    setMeasure,
    horses,
    setHorse,
    horse

}:AddNewConsumedItemPageContentProps) {
    return (
        <PageContent>
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>
                <ResourcesDropList
                    listValue={horse}
                    setListValue={setHorse}
                    options={horses}
                    placeholder='Select horse name'
                    label='horse'
                />
                <ResourcesInput
                    value={itemName} 
                    setValue={setItemName}
                    placeholder="Enter Item Name"
                    label='item name'
                    type='text'
                />
                <ResourcesInput
                    value={quantity} 
                    setValue={setQuantity}
                    placeholder="Quantity"
                    label='quantity'
                    type='number'
                />
                <ResourcesInput
                    value={price} 
                    setValue={setPrice}
                    placeholder="price"
                    label='price'
                    type='number'
                />      
                <ResourcesInput
                    value={measure} 
                    setValue={setMeasure}
                    placeholder="measure"
                    label='measure'
                    type='number'
                />  
        
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleAddNewConsumedInventoryItem()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    add item
                </button>
            </div>
        </PageContent>
    )
}

export default AddNewConsumedItemPageContent
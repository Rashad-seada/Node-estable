import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { inventoryTypes } from '@/constants/inventoryTypes'
import React from 'react'

type EditInvItemPageContentProps = {
    handleEditInventoryItem: () => void,
    itemName:string,
    setItemName: (newState: string) => void,
    quantity:string,
    setQuantity: (newState: string) => void,
    price:string,
    setPrice: (newState: string) => void,
    measure:string,
    setMeasure:(newState: string) => void,
    type:NameAndId,
    setType: (newState:NameAndId) => void,
    isInputsValid:boolean,
    description:string,
    setDescription:(newState: string) => void
}
function EditInvItemPageContent({
    handleEditInventoryItem,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    price,
    setPrice,
    type,
    setType,
    isInputsValid,
    measure,
    setMeasure,
    description,
    setDescription

}:EditInvItemPageContentProps) {
    return (
        <PageContent>
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>

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
                <ResourcesInput
                    value={description} 
                    setValue={setDescription}
                    placeholder="description"
                    label='description'
                    type='text'
                />  
                <ResourcesDropList
                    listValue={type}
                    setListValue={setType}
                    options={inventoryTypes}
                    placeholder='Select Item Type'
                    label='type'
                />
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleEditInventoryItem()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    save item
                </button>
            </div>
        </PageContent>
    )
}

export default EditInvItemPageContent
import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { cafeteriaItemsTypes } from '@/constants/cafeteriaItemsTypes'
import { cafeteriaPayments } from '@/constants/cafeteriaPayments'
import React from 'react'


type EditConsumedItemPageContentProps = {
    handleUpdateConsumedItem: () => void,
    itemName:string,
    setItemName: (newState: string) => void,
    quantity:string,
    setQuantity: (newState: string) => void,
    price:string,
    setPrice: (newState: string) => void,
    date:string,
    setDate: (newState:string) => void,
    type:NameAndId,
    setType: (newState:NameAndId) => void,
    isInputsValid:boolean,
    client:NameAndId,
    setClient:(newState:NameAndId) => void,
    payment:NameAndId,
    setPayment:(newState:NameAndId) => void,
    clients:NameAndId[]|[],
}
function EditConsumedItemPageContent({
    handleUpdateConsumedItem,
    itemName,
    setItemName,
    quantity,
    setQuantity,
    price,
    setPrice,
    date,
    setDate,
    type,
    setType,
    isInputsValid,
    client,
    setClient,
    setPayment,
    clients,
    payment
}:EditConsumedItemPageContentProps) {
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
                    value={date} 
                    setValue={setDate}
                    placeholder="date"
                    label='date'
                    type="datetime-local"
                />
           
                <ResourcesDropList
                    listValue={payment}
                    setListValue={setPayment}
                    options={cafeteriaPayments}
                    placeholder='Select Payment'
                    label='payment'
                />
                 <ResourcesDropList
                    listValue={client}
                    setListValue={setClient}
                    options={clients}
                    placeholder='Select Client'
                    label='client'
                />
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleUpdateConsumedItem()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    save item
                </button>
            </div>
        </PageContent>
    )
}

export default EditConsumedItemPageContent
import PageContent from '@/components/shared/all/PageContent'
import ResourcesDropList from '@/components/shared/resources/ResourcesDropList'
import ResourcesInput from '@/components/shared/resources/ResourcesInput'
import { medicalTypes } from '@/constants/medicalTypes'
import React from 'react'

type AddNewMedicalMedicinePageContentProps = {
    itemName: string,
    setItemName: (newState:string) => void,
    quantity: string,
    setQuantity:  (newState:string) => void,
    price: string,
    setPrice:  (newState:string) => void,
    description: string,
    setDescription:  (newState:string) => void,
    type: NameAndId,
    setType: (newState:NameAndId) => void,
    handleAddMedicalMedicine: () => void,
    isInputsValid: boolean,
    dosage:string,
    setDosage: (newState:string) => void,
}

function AddNewMedicalMedicinePageContent({
    itemName,
    setItemName,
    quantity,
    setQuantity,
    price,
    setPrice,
    description,
    setDescription,
    type,
    setType,
    handleAddMedicalMedicine,
    isInputsValid,
    dosage,
    setDosage,
}:AddNewMedicalMedicinePageContentProps) {
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
                    value={description} 
                    setValue={setDescription}
                    placeholder="description"
                    label='description'
                    type='text'
                />  
                <ResourcesInput
                    value={dosage} 
                    setValue={setDosage}
                    placeholder="dosage"
                    label='dosage'
                    type='number'
                />  
                <ResourcesDropList
                    listValue={type}
                    setListValue={setType}
                    options={medicalTypes}
                    placeholder='Select Item Type'
                    label='type'
                />
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleAddMedicalMedicine()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    add item
                </button>
            </div>
        </PageContent>
    )
}

export default AddNewMedicalMedicinePageContent
import PageContent from "@/components/shared/all/PageContent"
import ResourcesDropList from "@/components/shared/resources/ResourcesDropList"
import ResourcesInput from "@/components/shared/resources/ResourcesInput"
import { genders } from "@/constants/genders"


type AddNewHorsePageContentProps = {
    name:string,
    setName:(state:string)=>void,
    note:string,
    setNote:(state:string)=>void,
    age:string,
    setAge:(state:string)=>void,
    isInputsValid:boolean,
    gender:NameAndId,
    setGender:(state:NameAndId)=>void
    groom:NameAndId,
    setGroom:(state:NameAndId)=>void,
    client:NameAndId,
    setClient:(state:NameAndId)=>void,
    handleAddNewHorse: ()=> void,
    clients:NameAndId[]|[],
    horses:NameAndId[]|[],
    horseCategory:NameAndId,
    setHorseCategory:(state:NameAndId)=>void,
    horseCategories:NameAndId[]|[]
}
function AddNewHorsePageContent({
    name,
    setName,
    note,
    setNote,
    age,
    setAge,
    isInputsValid,
    gender,
    setGender,
    groom,
    setGroom,
    client,
    setClient,
    handleAddNewHorse,
    clients,
    horses,
    horseCategory,
    setHorseCategory,
    horseCategories
}:AddNewHorsePageContentProps) {


    
    return (
        <PageContent className='overflow-hidden'>   
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>
                <ResourcesInput
                    value={name} 
                    setValue={setName}
                    placeholder="Enter Client Name"
                    label='horse name'
                    type='text'
                />
                <ResourcesInput
                    value={note} 
                    setValue={setNote}
                    placeholder="Enter Note"
                    label='Note'
                    type='text'
                />
                <ResourcesInput
                    value={age} 
                    setValue={setAge}
                    placeholder="Enter Client Age"
                    label='age'
                    type='number'
                />
                <ResourcesDropList
                    listValue={gender}
                    setListValue={setGender}
                    options={genders}
                    placeholder='Select Client Gender'
                    label='gender'
                />
                <ResourcesDropList
                    listValue={groom}
                    setListValue={setGroom}
                    options={horses}
                    placeholder='Select Groom'
                    label='groom'
                    
                />
                <ResourcesDropList
                    listValue={client}
                    setListValue={setClient}
                    options={clients}
                    placeholder='Select Client '
                    label='client'
                    
                />
                <ResourcesDropList
                    listValue={horseCategory}
                    setListValue={setHorseCategory}
                    options={horseCategories}
                    placeholder='Select horse category '
                    label='categories'
                    
                />
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleAddNewHorse()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    add new client 
                </button>
            </div>

    
        </PageContent>
    )
}

export default AddNewHorsePageContent
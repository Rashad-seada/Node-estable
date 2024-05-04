import PageContent from "@/components/shared/all/PageContent"
import ResourcesDropList from "@/components/shared/resources/ResourcesDropList"
import ResourcesInput from "@/components/shared/resources/ResourcesInput"
import { memberShipStatuses } from "@/constants/memberShipStatuses"
import { memberShipTypes } from "@/constants/memberShipTypes"

type EditFamilyMembershipPageContentProps = {

    clients:NameAndId[]|[],
    startDate:string,
    setStartDate:(newState:string)=> void,
    endDate:string,
    setEndDate:(newState:string)=> void,
    status:NameAndId,
    setStatus:(newState:NameAndId)=> void,
    membershipType:NameAndId,
    setMembershipType:(newState:NameAndId)=> void,
    handleAddIndividualMembershipItem:()=> void,
    isInputsValid:boolean,
    familyName:string,
    setFamilyName:(newState:string)=> void,
    members:string,
    setMembers:(newState:string)=> void
}

function EditFamilyMembershipPageContent({

    clients,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    status,
    setStatus,
    membershipType,
    setMembershipType,
    handleAddIndividualMembershipItem,
    isInputsValid,
    familyName,
    setFamilyName,
    members,
    setMembers
}:EditFamilyMembershipPageContentProps) {
    return (
        <PageContent>
            <div className='max-w-[600px] flex flex-col gap-10 my-16 mx-8'>
                <ResourcesInput
                    value={familyName} 
                    setValue={setFamilyName}
                    placeholder="enter family name"
                    label='family name'
                    type='text'
                />
                <ResourcesInput
                    value={members} 
                    setValue={setMembers}
                    placeholder="enter family members"
                    label='members'
                    type='text'
                />
                {/* 
                <ResourcesDropList
                    listValue={client} 
                    setListValue={setClient}
                    placeholder="Enter Item Name"
                    label='item name'
                    options={clients}
                /> */}
                <ResourcesDropList
                    listValue={status} 
                    setListValue={setStatus}
                    placeholder="Enter membership status"
                    label='membership status'
                    options={memberShipStatuses}
                />
                <ResourcesInput
                    value={startDate} 
                    setValue={setStartDate}
                    placeholder="enter start date"
                    label='start date'
                    type='datetime-local'
                />
                <ResourcesInput
                    value={endDate} 
                    setValue={setEndDate}
                    placeholder="enter end date"
                    label='end date'
                    type='datetime-local'
                />
                <ResourcesDropList
                    listValue={membershipType} 
                    setListValue={setMembershipType}
                    placeholder="select membership type"
                    label='membership type'
                    options={memberShipTypes}
                />  
                
   
            </div>
            <div className='w-full flex justify-center'>
                <button onClick={()=> isInputsValid && handleAddIndividualMembershipItem()} disabled={!isInputsValid} className='w-[350px] text-primary duration-300 hover:bg-primary hover:text-smokey-white font-semibold text-2xl capitalize rounded-2xl h-[60px] border border-primary'>
                    save item
                </button>
            </div>
        </PageContent>
    )
}

export default EditFamilyMembershipPageContent
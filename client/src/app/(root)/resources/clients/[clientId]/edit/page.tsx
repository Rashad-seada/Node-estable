"use client"
import { clientsRoute } from '@/constants/api';
import { httpGetServices } from '@/services/httpGetService';
import { getGender } from '@/utils/getGender';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react'
import { getMembershipStatus } from '@/utils/getMembershipStatus';
import { httpPatchService } from '@/services/httpPatchService';
import { getMembershipType } from '@/utils/getMembershipType';
import EditClientPageContent from '@/components/content/resources/clients/edit/EditClientPageContent';
import { statusCodeIndicator } from '@/utils/statusCodeIndicator';
import { usePopUp } from '@/hooks/usePopUp';
import { useMutation } from 'react-query';
import { MdErrorOutline } from 'react-icons/md';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useRouter } from 'next/navigation';
import PageHeader from '@/components/layout/PageHeader';

function ClientEditPage() {

    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const [membershipStatus,setMembershipStatus] = useState<NameAndId>(null)
    const [membershipType,setMembershipType] = useState<NameAndId>(null)

    const [isDataHere , setIsDataHere] = useState<boolean>(false)


    const isInputsValid = Boolean(name && email && phone && age && gender && membershipStatus && membershipType)

    const {clientId} = useParams()
    const clientRoute = `${clientsRoute}/${clientId}`
    
    const router = useRouter()
    const popUp = usePopUp()
    useEffect(()=>{
        const fetchClient = async() => {
            const {data} = await httpGetServices(clientRoute)
            if (data) {
                const {username,email,phone,age,gender,membershipStatus,membershipType} = data
                setName(username)
                setEmail(email)
                setPhone(phone)
                setAge(age)
                setGender(getGender(gender))
                setMembershipStatus(getMembershipStatus(membershipStatus))
                setMembershipType(getMembershipType(membershipType))
                setIsDataHere(true)
            }
        }
        fetchClient()
    },[])
  
    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(clientRoute,JSON.stringify(
            {
                username:name,
                email,
                phone,
                age,
                gender:gender?.name,
                membershipStatus:membershipStatus?.name||null,
                membershipType:membershipType?.name||null
            }
        )),
        mutationKey:["updateClient"],
        onSuccess:async(res)=> {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"client updated successfully",
                    popUpTitle:"client updated ",
                    popUpIcon: <IoMdCheckmarkCircleOutline/>,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/resources/clients")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            }
        },
        onError:()=> {
            popUp({
                popUpMessage:"error occured please try again",
                popUpTitle:"error",
                popUpIcon:<MdErrorOutline />,
                showPopUp:true,
                popUpType:"alert"
            })
        }
    })

    return (
        <>
            <PageHeader
                title={(
                    <span>
                        stable's clients /
                        <span className='text-primary'>edit client</span>
                    </span>
                )}
                showBackButton={true}
            />
            <EditClientPageContent
            
                handleClientUpdate={mutate}
                isDataHere={isDataHere}
                isInputsValid={isInputsValid}
                name={name}
                setName={setName}
                email={email}
                setEmail={setEmail}
                phone={phone}
                setPhone={setPhone}
                age={age}
                setAge={setAge}
                gender={gender}
                setGender={setGender}
                membershipStatus={membershipStatus}
                setMembershipStatus={setMembershipStatus}
                membershipType={membershipType}
                setMembershipType={setMembershipType}
            />
        </>
    )
}

export default ClientEditPage
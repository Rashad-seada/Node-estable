"use client"

import EditInstructorPageContent from '@/components/content/resources/instructors/edit/EditInstructorPageContent'
import Avatar from '@/components/shared/all/Avatar'
import BackButton from '@/components/shared/all/BackButton'
import PageHeader from '@/components/shared/all/PageHeader'
import { instructorsRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpGetServices } from '@/services/httpGetService'
import { httpPatchService } from '@/services/httpPatchService'
import { getGender } from '@/utils/getGender'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { IoMdCheckmarkCircleOutline } from 'react-icons/io'
import { MdErrorOutline } from 'react-icons/md'
import { useMutation } from 'react-query'

function InstructorEditPage() {
    const [name,setName] = useState<string>('')
    const [email,setEmail] = useState<string>('')
    const [phone,setPhone] = useState<string>('')
    const [age,setAge] = useState<string>('')
    const [gender,setGender] = useState<NameAndId>(null)
    const isInputsValid = Boolean(name && email && phone && age && gender)
    const popUp = usePopUp()
    const router = useRouter()
    const {instructorId} = useParams()

    const instructorIdRoute = `${instructorsRoute}/${instructorId}`

    const body = {
        instractorName:name,
        email,
        gender:gender?.name,
        phoneNumber:phone,
        age,
    }

    useEffect(()=>{
        const fetchInstructor = async () => {
            const res = await httpGetServices(instructorIdRoute)
            if (statusCodeIndicator(res.status_code) === "success") {
                setName(res.data.instractorName)
                setEmail(res.data.email)
                setPhone(res.data.phoneNumber)
                setAge(res.data.age)
                setGender(getGender(res.data.gender))
            }
            console.log(res);
            
        }
        fetchInstructor()
    },[])

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(instructorIdRoute,JSON.stringify(body)),
        mutationKey:["updateInstructor"],
        onSuccess:async(res)=> {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"instructor updated successfully",
                    popUpTitle:"instructor updated ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
                router.push("/resources/instructors")
            }else {
                popUp({
                    popUpMessage:res.message,
                    popUpTitle:"failed ",
                    popUpIcon:<MdErrorOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            }
        },
        onError:()=> {
            popUp({
                popUpMessage:"failed to update instructor",
                popUpTitle:"failed",
                popUpIcon:<MdErrorOutline />,
                showPopUp:true,
                popUpType:"alert"
            })
        }
    })
    return (
        <>
            <PageHeader>
                <div className='flex justify-between items-center w-full'>
                    <div className='flex items-center gap-5'>
                        <BackButton />
                        <div className='text-smokey-white text-2xl'>
                            <span>stable's instructor / </span>
                            <span className='text-primary'> edit instructor</span>
                        </div>
                    </div>
                    <Avatar/>
                </div>
            </PageHeader>
            <EditInstructorPageContent
                email={email}
                setAge={setAge}
                setEmail={setEmail}
                setGender={setGender}
                setPhone={setPhone}
                setName={setName}
                name={name}
                phone={phone}
                age={age}
                gender={gender}
                isInputsValid={isInputsValid}
                handleUpdateInstructor={mutate}
            
            
            />
        </>
    )
}

export default InstructorEditPage
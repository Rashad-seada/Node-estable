"use client"

import { instructorsRoute } from '@/constants/api'
import { usePopUp } from '@/hooks/usePopUp'
import { httpPatchService } from '@/services/httpPatchService'
import { statusCodeIndicator } from '@/utils/statusCodeIndicator'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
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

    const body = {
        instractorName:name,
        email,
        gender:gender?.name,
        phoneNumber:phone,
        age,
    }

    const {mutate} = useMutation({
        mutationFn:async () => httpPatchService(instructorsRoute,JSON.stringify(body)),
        mutationKey:["addNewInstructor"],
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
        <div>InstructorEditPage</div>
    )
}

export default InstructorEditPage
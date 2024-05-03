"use client"

import AddNewInstructorPageContent from "@/components/content/resources/instructors/add-new/AddNewInstructorPageContent"
import PageHeader from "@/components/layout/PageHeader"
import Avatar from "@/components/shared/all/Avatar"
import BackButton from "@/components/shared/all/BackButton"
import { instructorsRoute } from "@/constants/api"
import { usePopUp } from "@/hooks/usePopUp"
import { httpPostService } from "@/services/httpPostService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { MdErrorOutline } from "react-icons/md"
import { useMutation } from "react-query"

function AddNewInstructorPage() {
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
        mutationFn:async () => httpPostService(instructorsRoute,JSON.stringify(body)),
        mutationKey:["addNewInstructor"],
        onSuccess:async(res)=> {
            const status = statusCodeIndicator(res.status_code) === "success" 
            
            if (status) {
                popUp({
                    popUpMessage:"instructor added successfully",
                    popUpTitle:"instructor added ",
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
                popUpMessage:"failed to add instructor",
                popUpTitle:"failed",
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
                        stable's instructors /
                        <span className='text-primary'>add new instructor</span>
                    </span>
                )}
                showBackButton={true}
            />
        
            <AddNewInstructorPageContent
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
                handleAddNewInstructor={mutate}
                isInputsValid={isInputsValid}
                
            />
        </>
    )
}

export default AddNewInstructorPage
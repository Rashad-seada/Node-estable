"use client"

import Input from '@/components/shared/all/Input'
import useLogin from '@/hooks/useLogin'
import React, { useState } from 'react'


const emailFallback = (<>
    <p className='text-red-500 text-md sm:text-lg'>please enter a valid email</p>
</>)

const passwordFallback = (<>
    <p className='text-red-500 text-md sm:text-lg'>password must be 5 chars or more , must contain a number , symbols not allowed</p>
</>)
function LoginPage() {

    const [email,setEmail] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [isUsernameValid,setIsEmailValid] = useState<boolean>(false)
    const [isPasswordValid,setIsPasswordValid] = useState<boolean>(false)
    const isInputsValid = isPasswordValid && isUsernameValid
    const emailRegex = /^[a-zA-Z0-9.+\-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const passwordRegex = /^(?=.*[0-9])[a-zA-Z0-9]{5,}$/
    
    const login = useLogin(email,password)
    
    const handleLogin = () => {
        if (!isInputsValid) return
        
        login()
    }

    return (
        <section className='h-screen flex justify-center items-center relative bg-cover bg-[url(/images/farm.png)]'>
        
            <span className='w-full h-screen absolute top-0 left-0 bg-[#383F51] opacity-80'/>

            <div className=' w-[90%] p-5 sm:w-[500px] bg-smokey-white bg-opacity-30 backdrop-blur-sm rounded-3xl border-2 border-solid border-opacity-30 border-smokey-white'>

                <h6 className='text-smokey-white text-xl'>welcome back</h6>
                <div className='flex flex-col items-center'>
                    <img src="/svgs/logo.svg" className='w-[250px] aspect-square' alt="" />
                
                    <div className='w-full sm:w-4/5 space-y-5'>
                        <Input 
                            type='text' 
                            value={email} 
                            setValue={setEmail}
                            className='h-[60px] w-full placeholder:text-[#797979] text-[#797979] p-3 text-xl rounded-xl bg-[#CCCCCC]'
                            placeholder='Email'
                            regex={emailRegex}
                            fallback={emailFallback}
                            setIsValueValid={setIsEmailValid}
                        />
                        <Input 
                            type='password' 
                            value={password}  
                            setValue={setPassword} 
                            className='h-[60px] w-full placeholder:text-[#797979] text-[#797979] p-3 text-xl rounded-xl bg-[#CCCCCC]'
                            placeholder='Password'
                            regex={passwordRegex}
                            fallback={passwordFallback}
                            setIsValueValid={setIsPasswordValid}
                        />

                    </div>

                    <button 
                        disabled={!isInputsValid} 
                        className='text-smokey-white text-3xl mt-10 h-[60px] w-full sm:w-3/5 bg-primary rounded-xl mb-20' 
                        onClick={handleLogin}
                    >
                        login
                    </button>
                </div>
            </div>

        </section>
    )
}



export default LoginPage
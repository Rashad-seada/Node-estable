"use client"

import Input from '@/components/shared/Input'
import React, { useState } from 'react'


const userNameFallback = (<>
    <p className='text-red-500 text-md sm:text-lg'>username must be 3 chars or more and mustn't contain symbols</p>
</>)

const passwordFallback = (<>
    <p className='text-red-500 text-md sm:text-lg'>password must contain numbers, password must be 5 chars or more and mustn't contain symbols</p>
</>)
function LoginPage() {

    const [username,setUsername] = useState<string>('')
    const [password,setPassword] = useState<string>('')
    const [isUsernameValid,setIsUsernameValid] = useState<boolean>(false)
    const [isPasswordValid,setIsPasswordValid] = useState<boolean>(false)
    const isInputsValid = isPasswordValid && isUsernameValid
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{5,}$/
    
    
    
    const handleLogin = () => {
        if (!isInputsValid) return
        
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
                            value={username} 
                            setValue={setUsername}
                            className='h-[60px] placeholder:text-[#797979] text-[#797979] p-3 text-xl rounded-xl bg-[#CCCCCC]'
                            placeholder='User name'
                            regex={usernameRegex}
                            fallback={userNameFallback}
                            setIsValueValid={setIsUsernameValid}
                        />
                        <Input 
                            type='password' 
                            value={password}  
                            setValue={setPassword} 
                            className='h-[60px] placeholder:text-[#797979] text-[#797979] p-3 text-xl rounded-xl bg-[#CCCCCC]'
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
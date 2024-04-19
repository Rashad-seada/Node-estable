import { PopUpProviderData, usePopUpProvider } from '@/context/PopUpContext'
import React from 'react'

function PopUp() {
    
    const popUpData:PopUpProviderData = usePopUpProvider()
    
    const closeFunc = () => {
        const curr = popUpData?.popUp
        if (curr) {
            popUpData?.setPopUp({...curr,isPopUpOpen:false})
        }
    }

    const resolveFunc = () => {
        const isResolve = Boolean(popUpData?.popUp?.resolveFunc)
        isResolve && popUpData?.popUp?.resolveFunc()
        
        closeFunc()
    }

    return (
        <>
        
            {
                popUpData?.popUp.isPopUpOpen ? (
                    <div className='fixed w-full overflow-hidden h-screen top-0 left-0 z-50'>
                        <span className='w-full h-full absolute top-0 left-0 bg-black opacity-50'/>
                        <div className='w-full z-10 flex flex-col justify-center items-center h-full relative'>
                            
                            <div className='m-auto p-5 w-[90%] relative sm:w-[500px] sm:h-[340px] rounded-3xl  bg-smokey-white h-'>
                                <div>
                                    {popUpData?.popUp.icon}
                                </div>
                                <p className='text-3xl text-center text-dark-grey'>{popUpData?.popUp.message}</p>
                                <div className='flex font-semibold justify-end h-[40px] gap-5'>
                                    {
                                        popUpData.popUp.popUpType === "confirm" ? (
                                            <>
                                                <button onClick={closeFunc} className='w-[100px] capitalize rounded-lg border border-primary duration-300 text-primary'>
                                                    cancel
                                                </button>
                                                <button onClick={resolveFunc} className='w-[100px] capitalize rounded-lg border  bg-primary  text-smokey-white'>
                                                    continue
                                                </button>
                                            </>
                                        ) : (
                                            <button onClick={closeFunc} className='w-[100px] capitalize rounded-lg border border-primary text-primary'>
                                                submit
                                            </button>
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                ) : <></>
            }
        
        </>
    )
}

export default PopUp
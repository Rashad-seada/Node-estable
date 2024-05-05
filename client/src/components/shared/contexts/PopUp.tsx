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

        if(popUpData?.popUp?.resolveFunc) isResolve && popUpData?.popUp?.resolveFunc()
        
        closeFunc()
    }

    return (
        <>
        
            {
                popUpData?.popUp.isPopUpOpen ? (
                    <div className='fixed w-full overflow-hidden h-screen top-0 left-0 z-50'>
                        <span className='w-full h-full absolute top-0 left-0 bg-black opacity-50'/>
                        <div className='w-full z-10 flex flex-col justify-center items-center h-full relative'>
                            
                            <div className='relative flex flex-col justify-between p-6 sm:w-[500px] border-2 w-[90%] border-primary sm:h-[340px] rounded-3xl  bg-smokey-white '>
                                <div className=' w-full h-[calc(100%-40px)] flex flex-col items-center justify-center '>
                                    <div className='w-[60px] mb-5 aspect-square flex text-primary text-7xl justify-center items-center'>
                                        {popUpData?.popUp.icon}
                                    </div>
                                    <p className='text-xl font-bold mb-3 text-center text-dark-grey'>{popUpData?.popUp.title}</p>
                                    <p className='text-md text-center font-semibold text-light-grey'>{popUpData?.popUp.message}</p>

                                </div>
                                <div className='flex font-semibold w-full justify-end h-[40px] gap-5'>
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
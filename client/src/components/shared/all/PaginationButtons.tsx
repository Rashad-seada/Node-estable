"use client"

import { useRouter } from "next/navigation"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"

type PaginationButtonsProps = {
    maxPages :number,
    currentPage:number
}
function PaginationButtons({maxPages,currentPage}:PaginationButtonsProps) {


    const router = useRouter()
    const isForwardBtnDisabled = currentPage === maxPages
    const isPreviousBtnDisabled = currentPage === 1
    
    const goPrevious = () => {
        if (!isPreviousBtnDisabled){
            router.push(`?page=${currentPage-1}`)
        }

    }

    const goForward = () => {
        if (!isForwardBtnDisabled) {
            router.push(`?page=${currentPage+1}`)
        }
    }



    return (            
        <div className='w-full flex justify-between items-center h-[80px]'>


            <p className="text-xl text-smokey-white">current Page : {currentPage}</p>

            <div className='w-fit flex gap-3'>
                <button 
                    disabled={isPreviousBtnDisabled} 
                    onClick={goPrevious} 
                    className={`h-[36px] flex justify-center items-center aspect-square rounded-md text-xl ${isPreviousBtnDisabled ? "bg-light-grey text-zinc-400" : 'bg-zinc-300 text-primary'}`}
                >
                    <IoIosArrowBack />
                </button>
                <button
                    disabled={isForwardBtnDisabled}
                    onClick={goForward}
                    className={`h-[36px] flex justify-center items-center aspect-square rounded-md text-xl ${isForwardBtnDisabled ? "bg-light-grey text-zinc-400" : 'bg-zinc-300 text-primary'}`}
                >
                    <IoIosArrowForward />
                </button>
            </div>
        </div>
    )
}

export default PaginationButtons
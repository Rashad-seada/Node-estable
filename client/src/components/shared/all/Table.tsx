"use client"

import { usePopUp } from "@/hooks/usePopUp"
import { httpDeleteService } from "@/services/httpDeleteService"
import { statusCodeIndicator } from "@/utils/statusCodeIndicator"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { FaTrash } from "react-icons/fa"
import { IoMdCheckmarkCircleOutline } from "react-icons/io"
import { RiPencilFill } from "react-icons/ri"
import { UseMutationResult, useMutation } from "react-query"

type TableProps = {
    tableHeadCells:string[],
    tableBodyItems:any[],
    isCrud:boolean,
    tableBodyItemCellKeys:string[],
    route:string,
    refetch:()=> void
}
function Table({tableHeadCells,tableBodyItems,isCrud,tableBodyItemCellKeys,route,refetch}:TableProps) {

    const pathname = usePathname()

    const {mutate}:UseMutationResult = useMutation({
        mutationFn:async (_id) => httpDeleteService(`${route}/${_id}`),
        onSuccess:async (res) => {
            const status = statusCodeIndicator(res.status_code) === "success" 
            if (status) {
                refetch()
                popUp({
                    popUpMessage:"item deleted successfully",
                    popUpTitle:"item deleted",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            } else {
                popUp({
                    popUpMessage:"error occur please try again",
                    popUpTitle:"cant delete ",
                    popUpIcon:<IoMdCheckmarkCircleOutline />,
                    showPopUp:true,
                    popUpType:"alert"
                })
            }
            
        },
        onError:()=> {
            popUp({
                popUpMessage:"error occur please try again",
                popUpTitle:"cant delete ",
                popUpIcon:<IoMdCheckmarkCircleOutline />,
                showPopUp:true,
                popUpType:"alert"
            })
        }
    })

    const popUp = usePopUp()

    const handleDelete = (_id:string) => {
        popUp({
            popUpType:"confirm",
            popUpMessage:"are your sure about deleting this item?",
            popUpResolveFunc:()=> mutate(_id),
            showPopUp:true,
            popUpIcon:<FaTrash />,
            popUpTitle:"delete item",
        })
    }
    
    return (
        <div className="overflow-auto min-w-[800px] w-full h-full">
            <table className='w-full capitalize mt-5 table-auto border-collapse'>
                <thead className="h-[50px] border-dark-grey border-b-[2px] border-opacity-40 relative">
                    <tr>
                        {
                            tableHeadCells.map((cell:string,idx:number)=> (
                                <th key={idx} className="text-dark-grey px-5 text-left text-[16px]">
                                    {cell}
                                </th>
                            ))
                        }
                        {
                            isCrud ? (<th className="w-[100px] px-5"></th>) :<></>
                        }
                    </tr>
                </thead>

                <tbody>
                    {
                        tableBodyItems.map((tableItem:any,index:number) => {
                            return(
                                <tr key={index} className="h-[60px] border-b-light-grey border border-opacity-35 text-sm font-[500] text-light-grey p-5 relative">
                                    {
                                        tableBodyItemCellKeys.map((key:any,idx:number) => (
                                            <td key={idx} className="px-5">
                                                {tableItem[key]}
                                            </td>
                                        ))
                                    }
                                    {
                                        isCrud ? (
                                            <td className="px-5">
                                        
                                                <div className="flex w-fit gap-2 ml-auto h-[40px] items-center text-xl">
                                                    
                                                    <button className='text-red-500 ' onClick={()=>handleDelete(tableItem._id)}>
                                                        <FaTrash/>
                                                    </button>
                                                    <span className='h-[35px] w-[1.5px] bg-dark-grey opacity-40'/>
                                                    <Link className='text-primary text-2xl' href={`${pathname}/${tableItem._id}/edit`}>
                                                        <RiPencilFill />
                                                    </Link>
                                                </div>
                                                    
                                            </td>
                                        ): <></>
                                    }
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

export default Table
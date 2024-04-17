import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'

type HorsesPageProps = {
    isDataHere: boolean,
    response:any
}
function HorsesPageContent({isDataHere,response}:HorsesPageProps) {
    //const {horse} = response?.data
    
    return (
        
        <PageContent className='grid p-10 gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
            {
                isDataHere ? (
                    // stil not finished bro :)
                    // horses.map((horse:any,idx:number) => (
                    //     <ResourcesCard
                    //         key={idx}
                    //         titles={{
                    //             age:horse.age,
                    //             gender:horse.gender
                    //         }}
                    //         title={horse.username}
                    //         _id={horse._id}
                    //         imgUrl=''
                    //     />
                    // ))
                    <></>
                ) : (<>
                    <div className='w-full h-full'>
                        <Loader size={300}/>
                    </div>
                    
                </>)
            }
        </PageContent>
    )
}

export default HorsesPageContent
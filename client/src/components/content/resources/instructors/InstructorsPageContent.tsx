import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'

type ClientsPageProps = {
    isDataHere: boolean,
    response:any
}

function InstructorsPageContent({isDataHere,response}:ClientsPageProps) {
    //const instructor = response?.data.instructor

    
    return (
        <PageContent className='grid p-10 gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
            {
                isDataHere ? (
                    //still not finished yet
                    // client.map((instructor:any,idx:number) => (
                    //     <ResourcesCard
                    //         key={idx}
                    //         titles={{
                    //             age:instructor.age,
                    //             gender:instructor.gender
                    //         }}
                    //         title={instructor.username}
                    //         _id={instructor._id}
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

export default InstructorsPageContent
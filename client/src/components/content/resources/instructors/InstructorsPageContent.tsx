import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'
import { instructorsRoute } from '@/constants/api'

type ClientsPageProps = {
    isDataHere: boolean,
    response:any,
    refetch:()=> void
}

function InstructorsPageContent({isDataHere,response,refetch}:ClientsPageProps) {
    const instructors = response?.data.instractor
    
    return (
        
        <PageContent >
            
            <Loader isLoading={!isDataHere} size={300}>
            
                {
                    isDataHere ? ( 
                        <div className='grid w-full h-full p-10 gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
                            {
                                instructors.map((instructor:any,idx:number) => (
                                    <ResourcesCard
                                        key={idx}
                                        refetch={refetch}
                                        titles={{
                                            age:instructor.age,
                                            gender:instructor.gender
                                        }}
                                        title={instructor.instractorName}
                                        _id={instructor._id}
                                        imgUrl=''
                                        route={instructorsRoute}
                                    />
                                ))
                            }
                        </div>
                    ) :
                    <></>
                } 
            
            </Loader>

        </PageContent>
    )
}

export default InstructorsPageContent
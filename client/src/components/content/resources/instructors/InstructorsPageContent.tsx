import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'
import { instructorsRoute } from '@/constants/api'
import NoDataFound from '@/components/shared/all/NoDataFound'

type ClientsPageProps = {
    isDataHere: boolean,
    response:any,
    refetch:()=> void
}

function InstructorsPageContent({isDataHere,response,refetch}:ClientsPageProps) {
    const instructors = response?.data?.instractor
    
    return (
        
        <PageContent >
            
            <Loader isLoading={!isDataHere} size={300}>
            
                {
                    isDataHere ? ( 
                        instructors.length ? (
                            <div className='grid w-full h-full p-10 gap-10 grid-cols-[repeat(auto-fill,250px)]'>
                                {
                                    instructors.map((instructor:any,idx:number) => (
                                        <ResourcesCard
                                            key={idx}
                                            refetch={refetch}
                                            titles={{
                                                email:instructor.email,
                                                mobile:instructor.phoneNumber
                                            }}
                                            title={instructor.instractorName}
                                            _id={instructor._id}
                                            imgUrl=''
                                            route={instructorsRoute}
                                        />
                                    ))
                                }
                            </div>
                        ) : <NoDataFound message='no instructors to show , add instructors to show here'/>
                    ) :
                    <></>
                } 
            
            </Loader>

        </PageContent>
    )
}

export default InstructorsPageContent
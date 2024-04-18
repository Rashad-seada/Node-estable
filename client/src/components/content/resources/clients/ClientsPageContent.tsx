import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'

type ClientsPageProps = {
    isDataHere: boolean,
    response:any,
}

function ClientsPageContent({ isDataHere, response }:ClientsPageProps) {

    const client = response?.data.client
    
    return (
        
        <PageContent >
            
            <Loader isLoading={!isDataHere} size={300}>
            
                {
                    isDataHere ? ( 
                        <div className='grid w-full h-full p-10 gap-10 grid-cols-[repeat(auto-fit,minmax(250px,1fr))]'>
                            {
                                client.map((client:any,idx:number) => (
                                    <ResourcesCard
                                        key={idx}
                                        titles={{
                                            age:client.age,
                                            gender:client.gender
                                        }}
                                        title={client.username}
                                        _id={client._id}
                                        imgUrl=''
                                    />
                                ))
                            }
                        </div>
                    ) :<></>
                } 
            
            </Loader>

        </PageContent>
    )
}

export default ClientsPageContent
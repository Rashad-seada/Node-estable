import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'
import { clientsRoute } from '@/constants/api'

type ClientsPageProps = {
    isDataHere: boolean,
    response:any,
    refetch:()=> void
}

function ClientsPageContent({ isDataHere, response ,refetch}:ClientsPageProps) {

    const client = response?.data?.client
    
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
                                        refetch={refetch}
                                        route={clientsRoute}
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
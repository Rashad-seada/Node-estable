import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'
import { clientsRoute } from '@/constants/api'
import NoDataFound from '@/components/shared/all/NoDataFound'

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
                        <>
                            {
                                client.length ? (
                                    <div  className='grid w-full h-full p-10 gap-10 grid-cols-[repeat(auto-fill,250px)]'>
                                    
                                        {    
                                            client.map((client:any,idx:number) => (
                                                <ResourcesCard
                                                    key={idx}
                                                    refetch={refetch}
                                                    route={clientsRoute}
                                                    titles={{
                                                        email:client.email,
                                                        mobile:client.phone
                                                    }}
                                                    title={client.username}
                                                    _id={client._id}
                                                    imgUrl=''
                                                />
                                            ))
                                        }
                                    </div>
                                ) : <NoDataFound message='no client to show , add clients to show here'/>
                            }
                        </>
                    ) :<></>
                } 
            
            </Loader>

        </PageContent>
    )
}

export default ClientsPageContent
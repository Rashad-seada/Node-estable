import PageContent from '@/components/shared/all/PageContent'
import Loader from '@/components/shared/all/Loader'
import ResourcesCard from '@/components/shared/resources/ResourcesCard'
import React from 'react'
import { horsesRoute } from '@/constants/api'
import NoDataFound from '@/components/shared/all/NoDataFound'

type HorsesPageProps = {
    isDataHere: boolean,
    response:any,
    refetch:()=> any
}
function HorsesPageContent({isDataHere,response,refetch}:HorsesPageProps) {

    const horses = response?.data?.hourse

    
    return (
        
        <PageContent>
            
            <Loader isLoading={!isDataHere} size={300}>
            
                {
                    isDataHere ? ( 
                        horses.length ? (
                            <div className='grid w-full h-full p-10 gap-10 grid-cols-[repeat(auto-fill,250px)]'>
                                {
                                    horses.map((horse:any,idx:number) => (
                                        <ResourcesCard
                                            refetch={refetch}
                                            key={idx}
                                            titles={{
                                                age:horse.age,
                                                gender:horse.gender
                                            }}
                                            route={horsesRoute}
                                            title={horse.hourseName}
                                            _id={horse._id}
                                            imgUrl=''
                                        />
                                    ))
                                }
                            </div>
                        ) : <NoDataFound message='no horses to show , add horses to show here'/>
                    ) :
                    <></>
                } 
            
            </Loader>

        </PageContent>
    )
}

export default HorsesPageContent
import React from 'react'
import RoutingLink from './components/NavLink'
import { AiFillHome } from 'react-icons/ai'
import { InquiryRoutes, ManagementRoutes, ProfileRoutes, ResourcesRoutes, SalesRoutes } from '@/constants/dashboardRoutes'
import RouteGroup from './components/RouteGroup'
import LogoutButton from './components/LogoutButton'
function SideNav() {


    return (
        <nav className='w-[250px] h-full  bg-smokey-white rounded-3xl'>
            <div className='h-[100px]'>
                <img className='w-[100px] mx-auto aspect-square block' src={'/svgs/logo.svg'} alt="logo" />
            </div>

            <div className='h-[calc(100%-200px)] overflow-auto'>
                <RoutingLink href='/'>
                    <div className='flex gap-3 px-3 text-2xl h-[40px] items-center'>
                        <AiFillHome className='text-3xl'/>
                        <span>dashboard</span>
                    </div>
                </RoutingLink>


                <div className='gap-5 flex flex-col py-5'>

                    <RouteGroup groupName='resources' routes={ResourcesRoutes}/>
                    <RouteGroup groupName='sales' routes={SalesRoutes}/>
                    <RouteGroup groupName='inquiry' routes={InquiryRoutes}/>
                    <RouteGroup groupName='management' routes={ManagementRoutes}/>
                    <RouteGroup groupName='profile' routes={ProfileRoutes}/>

                </div>
            </div>

            <div className='h-[100px] flex justify-center items-center'>
                <LogoutButton/>
            </div>
        </nav>
    )
}

export default SideNav
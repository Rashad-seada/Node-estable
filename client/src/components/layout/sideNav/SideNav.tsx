import React from 'react'
import NavLink from './components/NavLink'
import NavLinksProvider from '@/context/NavLinksContext'
import { AiFillHome } from 'react-icons/ai'
import { InquiryRoutes, ManagementRoutes, ProfileRoutes, ResourcesRoutes, SalesRoutes } from '@/constants/dashboardRoutes'
import RouteGroup from './components/RouteGroup'
import { BiSolidDoorOpen } from 'react-icons/bi'
function SideNav() {

    return (
        <nav className='w-[27.5%] h-full  bg-smokey-white rounded-3xl'>
            <div className='h-[100px]'>
                <img className='w-[100px] mx-auto aspect-square block' src={'/svgs/logo.svg'} alt="logo" />
            </div>

            <div className='h-[calc(100%-200px)] overflow-auto'>
                <NavLinksProvider>
                    <NavLink href='/'>
                        <div className='flex gap-3 px-3 text-2xl h-[40px] items-center'>
                            <AiFillHome className='text-3xl'/>
                            <span>dashboard</span>
                        </div>
                    </NavLink>


                    <div className='gap-5 flex flex-col py-5'>

                        <RouteGroup groupName='resources' routes={ResourcesRoutes}/>
                        <RouteGroup groupName='sales' routes={SalesRoutes}/>
                        <RouteGroup groupName='inquiry' routes={InquiryRoutes}/>
                        <RouteGroup groupName='management' routes={ManagementRoutes}/>
                        <RouteGroup groupName='profile' routes={ProfileRoutes}/>

                    </div>
                </NavLinksProvider>
            </div>

            <div className='h-[100px] flex justify-center items-center'>
                <button className='border-primary duration-300 hover:bg-primary hover:text-smokey-white py-2 w-5/6 border-solid border-2 flex justify-center items-center rounded-2xl text-primary text-2xl'>
                    <BiSolidDoorOpen />
                    <span>log out</span>
                </button>
            </div>
        </nav>
    )
}

export default SideNav
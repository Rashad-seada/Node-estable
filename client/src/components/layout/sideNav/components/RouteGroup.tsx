import { DashboardRoute } from '@/constants/dashboardRoutes'
import NavLink from './NavLink'


type RouteGroupProps = {
    groupName:string,
    routes:DashboardRoute[]
}
function RouteGroup({groupName,routes}: RouteGroupProps) {
    return (
        <div>
            <h6 className='text mb-4 ml-4 text-light-grey text-md'>{groupName}</h6>
            <ul className='flex flex-col gap-1'>
                {
                    routes.map((route:DashboardRoute,idx:number)=>(
                        <li key={idx}>
                            <NavLink href={route.href}>
                                <div className='h-[32px] flex text-lg items-center'>
                                    <span className=' mx-4'>{route.iconComponent}</span>
                                    <span>{route.name}</span>
                                </div>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default RouteGroup
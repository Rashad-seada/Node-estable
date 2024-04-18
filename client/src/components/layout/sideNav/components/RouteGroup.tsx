import { DashboardRoute } from '@/constants/dashboardRoutes'
import RoutingLink from './NavLink'


type RouteGroupProps = {
    groupName:string,
    routes:DashboardRoute[]
}
function RouteGroup({groupName,routes}: RouteGroupProps) {
    return (
        <div>
            <h6 className='text mb-4 ml-4 text-light-grey text-md'>{groupName}</h6>
            <ul className='flex flex-col gap-4'>
                {
                    routes.map((route:DashboardRoute,idx:number)=>(
                        <li key={idx}>
                            <RoutingLink href={route.href}>
                                <div className='h-[32px] flex text-xl items-center'>
                                    <span className='text-2xl mx-4'>{route.iconComponent}</span>
                                    <span>{route.name}</span>
                                </div>
                            </RoutingLink>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default RouteGroup

import SideNav from '@/components/layout/sideNav/SideNav'
import { redirect } from 'next/navigation'


function DashboardLayout({children}:Children) {


    const isAuthenticated :boolean = true

    if (!isAuthenticated) {
        return redirect("/login")
    }

    return (
            <main className='w-full h-screen overflow-hidden flex items-center justify-center '>
                
                <div className='w-[95%] h-[95%] flex items-center justify-center gap-5'>
                    <SideNav/>
                    <div className='h-full overflow-auto flex-1'>
                        {
                            children
                        }
                    </div>
                </div>
            
            </main>
    )
}

export default DashboardLayout
"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavigationTab = {
    href:string,
    label:string
}

type NavigationTabsProps = {
    tabs:NavigationTab[] 
}


function NavigationTabs({tabs}:NavigationTabsProps) {
    const pathname = usePathname()

    return (
        <div className='max-w-[750px] mx-auto flex font-semibold text-2xl border-primary border h-[60px] rounded-3xl overflow-hidden w-[80%]'>
            {
                tabs.map((tab:NavigationTab,idx:number) => {
                    const isTabActive = pathname.includes(tab.href)
                    return (
                        <Link href={tab.href} key={idx} className={`h-full flex justify-center items-center flex-1 ${isTabActive ? "bg-primary rounded-3xl text-smokey-white" : "text-primary"}`}>
                            {
                                tab.label
                            }
                        </Link>
                    )
                })
            }
        </div>
    )
}

export default NavigationTabs
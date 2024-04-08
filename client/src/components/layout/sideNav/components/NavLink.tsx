"use client"

import { NavLinksProviderData, useNavLinksProvider } from '@/context/NavLinksContext'
import Link from 'next/link'
import React from 'react'

type NavLinkProps = {
    href: string
    children: any,
    className?: string
}

function NavLink({href,children,className}:NavLinkProps) {  
    
    const NavLinksData : NavLinksProviderData = useNavLinksProvider()
    const isLinkActive :boolean = NavLinksData?.currentPath === href

    return (
        <div style={{
            background:isLinkActive ? 'linear-gradient(to right,var(--primary) 40%,transparent)' : "transparent",
            color: isLinkActive ? "var(--smokey-white)" : "var(--light-grey)"
        }}>
            <Link
                href={href}
                className={`${className || ""}`}
                onClick={()=> NavLinksData?.changeCurrentPath(href)}
            >
                {children}
            </Link>
        </div>
   
    )
}

export default NavLink
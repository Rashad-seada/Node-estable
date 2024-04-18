"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'

type NavLinkProps = {
    href: string
    children: any,
    className?: string,
}

function NavLink({href,children,className}:NavLinkProps) {  

    const pathName = usePathname()

    const isLinkActive :boolean = pathName === href
    
    return (
        <div style={{
            background:isLinkActive ? 'linear-gradient(to right,var(--primary) 40%,transparent)' : "transparent",
            color: isLinkActive ? "var(--smokey-white)" : "var(--light-grey)"
        }}>
            <Link
                href={href}
                className={`${className || ""}`}
            >
                {children}
            </Link>
        </div>
   
    )
}

export default NavLink
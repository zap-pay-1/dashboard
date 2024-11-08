"use client"


import React from 'react'
import { usePathname } from 'next/navigation';
import NavItem from './nav-item';
import Image from 'next/image';
import Link from 'next/link';
import { sideBarMenu } from '@/constants';
import Logo from '../logo';


export default function Sidebar() {
    const pathName = usePathname()
  return (
    <div  className={`  w-[200px] border-border h-screen sticky  top-0  border-r  py-2 px-3`}>

        <div className='mb-14 mt-3 flex items-center justify-center '>
        <Link href={`/`} className='flex items-center space-x-1 md:space-x-2'>
     <Logo  />
      <span className='text-xs font-bold text-gray-400'>BETA</span>
      </Link>
        </div>
        {sideBarMenu.map((item, i)  =>  (
            <NavItem key={i} route={pathName} item={item}  />
        ))}
    </div>
  )
}

"use client"
import {Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar'
import React from 'react'
import Image from 'next/image'
import { Compass, GalleryHorizontalEnd, Ghost, LogIn, Search } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'

const MenuOptions=[
    {
        title:'Home',
        icon:Search,
        path:'/'
    },
    {
        title:'Discover',
        icon:Compass,
        path:'/discover'
    },
    {
        title:'Library',
        icon:GalleryHorizontalEnd,
        path:'/library'
    },
    {
        title:'Sign',
        icon:LogIn,
        path:'#'
    },
]

const AppSidebar = () => {
    const path=usePathname();
  return (
    <div>
        
        <Sidebar>
      <SidebarHeader className="bg-accent flex items-center py-5">
        <Image src={'/devv.png'} alt="logo" width={180} height={140} />
      </SidebarHeader>
      <SidebarContent className="bg-accent">
        <SidebarGroup>
        <SidebarContent >
            <SidebarMenu>
                {MenuOptions.map((menu,index)=>(
                    <SidebarMenuItem key={index}>
                        <SidebarMenuButton asChild className={`p-5 py-6 hover:bg-transparent hover:font-bold
                            ${path?.includes(menu.path) && 'font-bold'}`}>
                            <a href={menu.path} className=''>
                                <menu.icon className='h-7 w-8' />
                                <span className='text-lg'>{menu.title}</span>
                            </a>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                ))}
            </SidebarMenu>
                
            <Button className="rounded-full mx-4 mt-4">Sign Up</Button>
        </SidebarContent>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter className='bg-accent'>
        <div className='p-3'>
            <h2 className='text-gray-500'>Try Now</h2>
            <p className='text-gray-400'>Upgrade for image upload, Smarter Ai & more copilot</p>
            <Button variant={'Secondary'} className="text-gray-500">Learn More</Button>
        </div>
      </SidebarFooter>
    </Sidebar>
    </div>
  )
}

export default AppSidebar
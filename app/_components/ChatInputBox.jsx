"use client"
import React, { useState } from 'react' 
import Image from 'next/image'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowRight, Atom, AudioLines, Cpu, Globe, Mic, Paperclip, Pin, SearchCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { AIModelsOption } from '@/services/Shared'
import { useUser } from '@clerk/nextjs'
import { supabase } from '@/services/supabase'

function ChatInputBox () {
    const [userSearchInput, setUserSearchInput] = useState();
    const [searchInput, setSearchInput] = useState('search');
    const {user} = useUser();
    const onSearchQuery =async() =>{
        const result = await supabase.from('Library').insert([
            {
                searchInput:userSearchInput,
                userEmail: user?.primaryEmailAddress.emailAddress,
                type: searchInput
            }
        ]).select();
        console.log(result);
    }
  return (
    <div className='flex flex-col h-screen items-center justify-center w-full'>
        <Image src={'/devv.png'} alt="DevVerse" width={260} height={250} />
        <div className='p-2 w-full max-w-2xl border rounded-2xl mt-10'>
            <div className='flex justify-between items-end'>
                <Tabs defaultValue="Search" className="w-[400px]">
                <TabsContent value="Search">
                    onChange={(e)=>setUserSearchInput(e.target.value)}
                    <input type="text" placeholder='Ask Anything' 
                    className='w-full p-4 outline-none' />
                </TabsContent>
                <TabsContent value="Research">
                    <input type="text" placeholder='Research Anything' 
                    onChange={(e)=>setUserSearchInput(e.target.value)}
                        className='w-full p-4 outline-none' />
                </TabsContent>
                <TabsList>
                    <TabsTrigger value="Search" className={"text-primary"} onClick={()=>setSearchInput("search")}> <SearchCheck/> Search</TabsTrigger>
                    <TabsTrigger value="Research" className={"text-primary"} onClick={()=>setSearchInput("research")} ><Atom /> Research</TabsTrigger>
                </TabsList>
                </Tabs>
                <div className='flex items-center gap-4 '> 
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant='ghost'>
                    <Cpu className="text-gray-500 h-5 w-5"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                            {/* <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator /> */}
                            {AIModelsOption.map((model,index)=>(
                                <DropdownMenuItem key={index}>
                                    <div className='mb-1'>
                                        <h2 className='text-sm'>{model.name}</h2>
                                        <p className='text-x5'>{model.desc}</p>
                                    </div>
                                </DropdownMenuItem>
                            ))}
                        
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <Button variant='ghost'>
                    <Globe className="text-gray-500 h-5 w-5"/>
                    </Button>
                    <Button variant='ghost'>
                    <Paperclip className="text-gray-500 h-5 w-5"/>
                    </Button>
                    <Button variant='ghost'>
                    <Mic className="text-gray-500 h-5 w-5"/>
                    </Button>
                    <Button variant='ghost'>
                        {!userSearchInput?<AudioLines className="text-white-500 h-5 w-5" />
                        : <ArrowRight className="text-white-500 h-5 w-5" /> }
                    </Button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ChatInputBox
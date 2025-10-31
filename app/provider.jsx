"use client"
import { UserDetailContext } from '@/context/UserDetatilContext';
import { useUser } from '@clerk/nextjs'
// import { SupabaseClient } from '@supabase/supabase-js';
// import { SupabaseAuthClient } from '@supabase/supabase-js/dist/module/lib/SupabaseAuthClient';
import React, { useEffect } from 'react'

function Provider({childre}) {
    const {user} = useUser();
    const [userDetail,setUserDetail] = useState();
    useEffect(()=>{
      user && CreateNewUser();
    },[user])
    const CreateNewUser = async() =>{
        //if user already exists
        
        let { data: Users, error } = await supbase
        .from('Users')
        .select('*')
        .eq('email',user?.primaryEmailAddress.emailAddress);
        console.log(Users);
        if(Users.length==0){
          
          const { data, error } = await supabase
            .from('Users')
            .insert([
              { 
                name: user?.fullName,
                email: user?.primaryEmailAddress.emailAddress
              },
            ])
            .select();
            
            setUserDetail(data[0]);
            return ;
          }
          setUserDetail(Users[0]);
    }
  return (
    <UserDetailContext.Provider value={{userDetail,setUserDetail}}>
      <div className='w-full'>{children}</div>
    </UserDetailContext.Provider>
  )
}

export default Provider
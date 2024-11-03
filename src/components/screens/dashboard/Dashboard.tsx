
//@ts-nocheck

"use client"
import React, {useEffect} from 'react'
import Home from './Home'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import withAuth from '@/components/middleware/auth-middleware'
import { useUserContext } from '../../providers/user-context'
import AuthAlert from '@/components/notes/AuthAlert'
import { CiWarning } from 'react-icons/ci'
import { BACKEND_URL } from '@/constants'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useSession , signOut} from 'next-auth/react'

const Dashboard = ()  =>  {
  const {userProfile}  = useUserContext()


console.log("user profile", userProfile)

    const AUTH_BASE_URL = `${BACKEND_URL}/auth/`
   const LOCAL_AUTH_URL ="http://localhost:5000/auth/"
     const fetchUserProfile =  async ()  =>   {
       const res = axios.get(`${AUTH_BASE_URL}user/${userProfile?.id}`)
       return (await res).data
     }

      const {data, error}  = useQuery({
        queryKey : ['profile'],
        queryFn : fetchUserProfile,
        enabled : !!userProfile
      })
   console.log("the user", data)
   console.log("user error", error)


   if(!userProfile)  {
    return(
      <div className='w-full h-screen flex items-center justify-center'>
       
        <div className='flex items-center justify-center space-y-3 flex-col'>
         <h1>Your not  authenticated</h1>
         <Link href={"/login"} className='py-2 px-4 bg-orange-400 text-white'>Sign in</Link>
         </div>
      </div>
    )
   }
  return (
    <div  className='w-full   '>
       <button onClick={() => signOut({redirect : "/auth/signin"})}>sign out</button>
         <div  className=' w-full max-w-[1600px]   min-h-screen  mx-auto relative '>
   
         {
          ! data?.user.businessName  &&(
            <div className='  text-red-500 py-2 px-2 flex items-center justify-center space-x-2 '>
              <CiWarning  className='w-4 h-4 text-red-500'  />
        <p className=' text-sm text-center'>You're almost there! Complete your profile to create invoices and payment links. Click Settings to finish setting up</p>
     </div>
          )
           
         }
      <Home  />
      </div>
    </div>
  )
}

export default  ( Dashboard)

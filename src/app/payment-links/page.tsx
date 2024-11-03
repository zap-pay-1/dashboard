import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { BACKEND_URL } from '@/constants'
import { PaymentLinks } from '@/components/screens/dashboard/PaymentLinks'

export default async function page() {
    
    const session =  await getServerSession(authOptions)
    const {email, id} = session?.user

    const getUserPayLinks =  async ()  =>  {
        const  res =  await axios.get(`${BACKEND_URL}/auth/user/${id}/payment-links`)
        return res.data
         }
         const  data = await getUserPayLinks()
  return (
    <div>
    
      <PaymentLinks   data={data} />
    </div>
  )
}

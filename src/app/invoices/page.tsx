import React from 'react'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { BACKEND_URL } from '@/constants'
import Invoices from '@/components/screens/dashboard/Invoices'

export default  async function page() {
    const session =  await getServerSession(authOptions)
    const {email, id} = session?.user
    const getUserInvoices =  async ()  =>  {
        const  res =   await axios.get(`${BACKEND_URL}/invoice/${id}/invoices`)
        return res.data
         }

         const data = await getUserInvoices()
  return (
    <div>
    <Invoices  data={data}  />
    </div>
  )
}
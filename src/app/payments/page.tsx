import React from 'react'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { BACKEND_URL } from '@/constants'
import LatestPayments from '@/components/screens/dashboard/LatestPayments'

export default async function page() {

    const session =  await getServerSession(authOptions)
    const {email, id} = session?.user

    const latestPayments =  async ()  =>  {
      const  res =  await axios.get(`${BACKEND_URL}/pay/payments/${id}`)
      return res.data
       }
      const data = await latestPayments()
  return (
    <div>
    <LatestPayments   data={data} />
    </div>
  )
}

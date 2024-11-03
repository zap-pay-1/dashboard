import { BACKEND_URL } from '@/constants'
import axios from 'axios'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import SettingPage from '@/components/screens/dashboard/setting-page'

export default  async function page() {
    const session =  await getServerSession(authOptions)
    const {email, id} = session?.user
    const  getUserInfo  =  async ()  =>  {
        const res =  await axios.get(`${BACKEND_URL}/auth/user/${id}`)
        return res.data
     }
     const data = await getUserInfo()
  return (
    <div>
<SettingPage   data={data} />
    </div>
  )
}

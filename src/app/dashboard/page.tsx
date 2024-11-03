

import Dashboard from '@/components/screens/dashboard/Dashboard'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
export default  async function page() {
  const session =  await getServerSession(authOptions)

  const { id, email } = session.user; 

  console.log("userid", id)

  console.log("the session details", session)
  return (
    <div>
      <Dashboard  />
    </div>
  )
}


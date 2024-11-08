//@ts-nocheck

import { getServerSession } from "next-auth";
import Image from "next/image";
import { BACKEND_URL } from "@/constants";
import axios from "axios";
import LatestPayments from "@/components/screens/dashboard/LatestPayments";
import { TopCrads } from "@/components/screens/dashboard/TopCards";
import { redirect } from "next/navigation";
import { authOptions } from "@/lib/auth-options";
export default  async function Home() {
  const session =  await getServerSession(authOptions)
    const {id, email} = session?.user

    const latestPayments =  async ()  =>  {
      const  res =  await axios.get(`${BACKEND_URL}/pay/payments/${id}`)
      return res.data
       }
      const data = await latestPayments()
      console.log(`this is email ${email} and this is id ${id}`)
       console.log("dataaa", data)
  return (
    <div className="  font-[family-name:var(--font-geist-sans)] w-full    min-h-screen mx-auto">
<TopCrads  />
   <LatestPayments data={data} />
    </div>
  );
}

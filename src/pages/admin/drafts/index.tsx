import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Typography } from '@mui/material'
import DataGridWrap from '@/components/gen/data-grid-wrapper/grid-wrapper'
import { useAdminData } from '@/lib/Hooks/use-admin'
import { useContext, useEffect, useState } from 'react'
import LoadingScreen from '@/components/gen/loading'



const AdminHomePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {Data,isUserError,isUserValidating,updateUser}= useAdminData(session)
  const [ isLoading ,setIsLoading] = useState(false)

  useEffect(()=>{console.log(Data);
  },[Data])

if(status==="loading" || isLoading){
  return <LoadingScreen/>
}
 
return (
  <AdminLayout >

      <DataGridWrap/>

  </AdminLayout>
  ) 
}

export default AdminHomePage 



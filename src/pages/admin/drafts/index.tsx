import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Typography } from '@mui/material'
import DataGridWrap from '@/components/gen/data-grid-wrapper/grid-wrapper'
import { useUser } from '@/lib/Hooks/use-user'
import { useEffect } from 'react'

const AdminHomePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {User,isUserError,isUserValidating,updateUser}= useUser(session?.user?.name ??  "")

  useEffect(()=>{console.log(User);
  },[User])

if(status==="loading"){
  return<div>loading...</div>
}

  

return (
  <AdminLayout >

      <DataGridWrap/>

  </AdminLayout>
  ) 
}

export default AdminHomePage 



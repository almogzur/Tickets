import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'

import { Typography } from '@mui/material'
import AdminLayout from '@/Wrappers/admin'

const AdminHomePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()



if(status==="loading"){
  return<div>loading...</div>
}
  

return (
  <AdminLayout >
      <Typography variant='h2' textAlign={"center"} >פורטל ניהול</Typography>
      


  </AdminLayout>
  ) 
}

export default AdminHomePage 



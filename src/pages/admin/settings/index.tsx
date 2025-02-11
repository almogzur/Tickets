import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import AdminLayout from '@/layouts/admin-layout'

const AdminHomePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()



if(status==="loading"){
  return<div>loading...</div>
}
  

return (
  <AdminLayout >
      <Typography variant='h2' textAlign={"center"} >הגדרות</Typography>
      


  </AdminLayout>
  ) 
}

export default AdminHomePage 



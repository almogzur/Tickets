import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Typography } from '@mui/material'

const AdminHomePage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()



if(status==="loading"){
  return<div>loading...</div>
}
  

return (
  <AdminLayout HeaderName={'פורטל ניהול '} >
      <Typography variant='h2' textAlign={"center"} >סטיסטיקה</Typography>
  </AdminLayout>
  ) 
}

export default AdminHomePage 



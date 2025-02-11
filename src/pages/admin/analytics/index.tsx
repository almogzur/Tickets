import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import AdminLayout from '@/components/layouts/admin-layout'

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



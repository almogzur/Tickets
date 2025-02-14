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
  < >
      <Typography variant='h2' textAlign={"center"} >קופאי</Typography>
      


  </>
  ) 
}

export default AdminHomePage 



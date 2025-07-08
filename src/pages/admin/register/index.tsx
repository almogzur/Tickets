import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { Typography } from '@mui/material'
import AdminLayout from '@/layouts/admin'

const RegisterPage=()=>{

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

export default RegisterPage 



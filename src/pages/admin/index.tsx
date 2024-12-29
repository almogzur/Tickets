import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Paper, Typography } from '@mui/material'
import { Container , Box ,Stack as Flex } from '@mui/system'
import { GetStaticPaths, GetStaticProps } from 'next/types'

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



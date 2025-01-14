import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import { Typography } from '@mui/material'

const ManageEventsPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
        <AdminLayout>
           <Typography>אירועים</Typography>
        </AdminLayout>
) 
}

export default ManageEventsPage


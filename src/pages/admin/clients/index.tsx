import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Box ,Stack as Flex } from '@mui/material'
import { grey } from '@mui/material/colors'
import InputWrap from '@/components/gen/TeextFiledWrpa/input-wrap'
import AdminLayout from '@/components/layouts/admin-layout'

const ClientListPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <AdminLayout>



    </AdminLayout>
) 
}

export default ClientListPage
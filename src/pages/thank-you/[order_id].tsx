import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Box, useTheme , Stack as Flex, Typography } from '@mui/material'
import ClientLayout from '@/Wrappers/client'

const Invoice=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()
  const {order_id} = router.query

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (

     <Flex
     height={"80%"}
     alignItems={"center"}
     justifyContent={"center"}
    >
      <Box 
      maxWidth={1000}
      width={"80%"}
      boxShadow={`0px 0px 52px  0em ${ theme.palette.secondary.light}`}

      height={400}
    >
            <Typography color='secondary' >{order_id as string}</Typography>

    </Box>
    </Flex>

) 
}

export default Invoice
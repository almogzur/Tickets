
import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'

import { Box, Typography, useTheme ,Stack as Flex, Button } from '@mui/material'

const OrderErrPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()

  useEffect(()=>{

        })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
      <Flex alignItems={"center"} justifyContent={"center"}  height={"100vh"}  >
     <Flex
      alignItems={'center'}
      justifyContent={"center"}
      maxWidth={1000}
      width={"80%"}
      boxShadow={`0px 0px 52px  0em ${ theme.palette.secondary.light}`}

      height={400}
    >
            <Typography textAlign={"center"} variant='h3'>לא בוצע חיוב </Typography>
            <Typography textAlign={"center"} variant='h3'   >שגיאה  נסה  שנית </Typography>
            <Button
             onClick={()=> router.push("/")}

            > חזרה  </Button>
            
    </Flex>
    </Flex>

) 
}

export default OrderErrPage
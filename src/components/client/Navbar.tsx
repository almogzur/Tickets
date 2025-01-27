import Link from 'next/link';
import Image from 'next/image'
import { Box, Button, Container, Stack as Flex , Typography, useTheme } from '@mui/material'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react"
import WidthContext from '@/context/WidthContext';
import { useContext } from 'react';

import { ImHome } from "react-icons/im";

const ClientNavbar = () => {
  const { data: session, status } = useSession()
  const router =useRouter()
 const theme = useTheme()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  return (
    <Flex   
           direction={"row"} 
           alignItems={"center"}
           justifyContent={"space-between"}
            bgcolor={theme.palette.secondary.main} 
            width={"100%"} 
            height={!xs?55: 75} 
            
            >
    
            <Box
            p={1}
                 sx={{cursor:"pointer"}}
                onClick={()=>{
                      const path = session?.user?.name ? "/admin" : "/auth/singin"
                      router.push( path )
                     }}
                > {
                  session?.user?.displayName ?
                  <Typography   >פורטל ניהול{}</Typography>
                  :
                  <>
                  <Typography fontSize={!xs?12:14} >שלום לך</Typography>
                  <Typography  fontSize={!xs?12:19}  >  לאזור האישי   </Typography>
                  </>
                }
                
           </Box>
           { router.pathname !== '/' &&

             <Box
                
                 p={1}
                 sx={{ }} 
                onClick={() => { router.push("/",undefined,{shallow:false,}) }}  
         >
            <ImHome size={!xs? "1.5em": "2em"} />
                 
             </Box>
            }


    </Flex>
);
}
 
export default ClientNavbar;
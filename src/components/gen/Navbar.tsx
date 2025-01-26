import Link from 'next/link';
import Image from 'next/image'
import { Button, Container, Stack as Flex , Typography, useTheme } from '@mui/material'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react"


const ClientNavbar = () => {
  const { data: session, status } = useSession()
  const router =useRouter()
 const theme = useTheme()

  return (
    <Flex direction={"row"}  bgcolor={"black"}  width={"100%"} >
    
       <Flex
            m={1}
            direction={'row'}
            justifyContent={"space-between"}
            boxShadow={`0px 1px 40px  0.2em ${theme.palette.secondary.dark}`}
            height={80} 
            alignItems={"center"}
            width={"inherit"}
            borderRadius={"10px"}
            sx={{}}
           >
            { router.pathname !== '/' &&
            <Button 
              variant='contained'
                 sx={{
                    height:50, m:2 , 
                    bgcolor:theme.palette.secondary.main,
                  "&:hover":{
                    boxShadow:`0px 1px 50px  0.2em ${theme.palette.secondary.light}`,
                    scale:1.03,
                    transform: 'scale(0.98)', // Use transform instead of scale
                  }
                 }} 
                onClick={() => { router.push("/",undefined,{shallow:false,}) }}  
         >
        
          <Typography variant='subtitle2' > דף הבית </Typography>
           </Button>
        }

           <Button variant='contained'  
              sx={{
                 height:50 ,
                 m:2,
                 bgcolor:theme.palette.secondary.main,
                   "&:hover":{
                      boxShadow:`0px 1px 20px  0.2em ${theme.palette.secondary.dark}`,
                      scale:1.03,
                      transform: 'scale(0.98)', // Use transform instead of scale
                }
                }} 

            onClick={()=>{
              const path = session?.user?.name ? "/admin" : "/auth/singin"
              router.push( path )
              }}
>
            <Typography variant='subtitle2' >{
             session?.user?.displayName
                   ?  session.user.displayName 
            : session?.user?.name
                   ?  session?.user.name
                   :   "התחברות למערכת "
                  }</Typography>

            

          </Button>
          
        

      </Flex>

    </Flex>
);
}
 
export default ClientNavbar;
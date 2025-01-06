import Link from 'next/link';
import Image from 'next/image'
import { Button, Container, Stack as Flex , Typography, useTheme } from '@mui/material'
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { signIn } from "next-auth/react"


const Navbar = () => {
  const { data: session, status } = useSession()
  const router =useRouter()
const theme = useTheme()
  const linkStyle = {textDecoration:'none'   } 

  return (
    <Flex direction={"row"} justifyContent={"center"} bgcolor={"black"} >
    <Container sx={{p:0,m:0, direction:"rtl" }} >
    <Flex direction={'row'} justifyContent={"space-between"} mb={3} boxShadow={' 0px 4px  0.2em #fff'} height={80} alignItems={"center"} >

      
        <Button variant='contained'   sx={{  height:50, m:2 , bgcolor:theme.palette.secondary.main}} 
            onClick={() => { router.push("/",undefined,{shallow:false,}) }}  
         >
        
          <Image src="/logo.png" alt="site logo" width={50} height={30} />
          <Typography variant='subtitle2' >הזמנת כרטיסים  דף הבית </Typography>

        </Button>
 



   
          <Button variant='contained'  
            sx={{ height:50 ,m:2,bgcolor:theme.palette.secondary.main}} 
            onClick={()=>{router.push("/auth/singin")}}
>
            <Typography variant='subtitle2' >התחברות למערכת </Typography>

            

          </Button>
          
        

    </Flex>
    </Container>
    </Flex>
);
}
 
export default Navbar;
import Link from 'next/link';
import Image from 'next/image'

import { Button, Container, Stack as Flex , Typography } from '@mui/material'
import { useSession } from 'next-auth/react';
import { Colors } from '@/lib/colors';


const Navbar = () => {
  const { data: session, status } = useSession()

  const linkStyle = {textDecoration:'none'   } 

  return (
    <Flex direction={"row"} justifyContent={"center"} bgcolor={"black"} >
    <Container sx={{p:0,m:0, direction:"rtl" }} >
    <Flex direction={'row'} justifyContent={"space-between"} mb={3} boxShadow={' 0px 4px  0.2em #fff'} height={80} alignItems={"center"} >

      <Link href="/" style={linkStyle} > 
        <Button variant='contained'   sx={{  height:50, m:2 , bgcolor:Colors.b}}  >

          <Image src="/logo.png" alt="site logo" width={50} height={30} />
          <Typography variant='subtitle2' >הזמנת כרטיסים  דף הבית </Typography>

        </Button>
      </Link>



        <Link href={"/auth/singin"}  style={linkStyle} >
          <Button variant='contained'  sx={{ height:50 ,m:2,bgcolor:Colors.b}} > {"התחברות למערכת "} 

          </Button>
        </Link>
        

    </Flex>
    </Container>
    </Flex>
);
}
 
export default Navbar;
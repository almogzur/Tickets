import Link from 'next/link';
import Image from 'next/image'

import { Stack as Flex , Typography } from '@mui/material'
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const { data: session, status } = useSession()
  return (
    <Flex style={{
      height:60 ,
       display:'flex',
       alignItems:"center",
       boxShadow: '3px  red inset ,  5px blue ,  5px pink ,  5px gray inset',  
       } } >
      <Link href="/" style={{textDecoration:'none'}} > 
        <Flex direction={'row'} alignItems={"center"} sx={{}} >
          <Image src="/logo.png" alt="site logo" width={40} height={30} />
          <Typography variant="h6" >הזמנת כרטיסים  דף הבית </Typography>
        </Flex>
      </Link>
      <Link href={"/admin"} >{"התחברות למערכת "} </Link>

    </Flex>
);
}
 
export default Navbar;
import Link from 'next/link';
import Image from 'next/image'

import { Stack, Typography } from '@mui/material'

const Navbar = () => {
  return (
    <nav style={{
      height:60 ,
       display:'flex',
       alignItems:"center",
       boxShadow: '3px  red inset ,  5px blue ,  5px pink ,  5px gray inset',  
       } } >
      <Link href="/" style={{textDecoration:'none'}} > 
        <Stack direction={'row'} alignItems={"center"} sx={{}} >
          <Image src="/logo.png" alt="site logo" width={40} height={30} />
          <Typography variant="h6" >הזמנת כרטיסים  דף הבית </Typography>
        </Stack>
      </Link>

    </nav>
);
}
 
export default Navbar;
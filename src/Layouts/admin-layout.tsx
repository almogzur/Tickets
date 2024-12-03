import {  useEffect } from 'react';
import MiniDrawer from '../components/Drawer'
import {Stack as Flex, Container } from '@mui/material'
import { useSession } from 'next-auth/react';
import router from 'next/router';

const AdminLayout = ({ children }: any) => {
  const { data: session ,status ,update} = useSession()

useEffect(()=>{
  console.log(session , status);
  if(status === 'unauthenticated'){
    router.push('/')
  }
},[session,status])


  return (

      <>
      <MiniDrawer  />

        <Flex direction={"row"}
          sx={{
  
            background:"gray"
     }}
            >
          <Container  >
            {children}
          </Container>
        </Flex>
      </>
  );
}
 
export default AdminLayout;
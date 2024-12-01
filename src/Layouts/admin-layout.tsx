import { useContext, useEffect } from 'react';
import MiniDrawer from '../components/Drawer'
import {Stack as Flex, Paper , Box, Container } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';


import AdmindDawerContext from '../context/AdmindDawerContext';
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
    < Container>
      
      <MiniDrawer  />
        <Flex 
          sx={{
            direction:"rtl",
     }}
            >
          { children }
        </Flex>
    </Container>
  );
}
 
export default AdminLayout;
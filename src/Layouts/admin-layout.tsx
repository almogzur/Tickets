
import {  ReactNode, useContext, useEffect } from 'react';
import AdminDrawer from '../components/admin/admin-drawer'
import {Stack as Flex, Container } from '@mui/material'
import { useSession } from 'next-auth/react';
import router from 'next/router';
import WidthContext from '@/context/WidthContext';


const AdminLayout = ({ children }: {children?:ReactNode}) => {
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


useEffect(()=>{
  console.log(session , status);
  if(status === 'unauthenticated'){
    router.push('/')
  }
},[session,status])


  return ( 
   <>
    <AdminDrawer  />  
    {children}          
  </>
  );
}
 
export default AdminLayout;

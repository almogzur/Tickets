
import {  ReactNode, useContext, useEffect } from 'react';
import {Stack as Flex, Container, useTheme, Box } from '@mui/material'
import { useSession } from 'next-auth/react';
import router from 'next/router';
import WidthContext from '../../context/WidthContext'
import AdminDrawer from '../../components/admin/admin-drawer'

interface AdminLayoutPropsType  {
  children?:ReactNode,
   noScrool?:boolean,
   HeaderName?:string
  }


const AdminLayout = (props: AdminLayoutPropsType ) => {
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


useEffect(()=>{
  console.log(session , status);
  if(status === 'unauthenticated'){
    router.push('/')
  }
},[session,status])

const {children, noScrool, HeaderName} = props

  return ( 
    <>
      <AdminDrawer  />  
       {children}          
    </>
  );
}
 
export default AdminLayout;


 
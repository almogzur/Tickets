import {  ReactNode, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router from 'next/router';
import WidthContext from '@/context/WidthContext';
import AdminDrawer from '@/pages-components/admin/admin-drawer';

interface AdminWrapperPropsType  {
   children?:ReactNode,
   noScrool?:boolean,
   HeaderName?:string
  }

const AdminWrapper = (props: AdminWrapperPropsType ) => {
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {  data ,  status, update, } = useSession()


useEffect(()=>{
  if(status==='unauthenticated'){
    router.push("/")
  }
},[status])

const {children, noScrool, HeaderName} = props

if(status === 'unauthenticated'){
  return <h4 style={{direction:'rtl'}} >מאמת משתמש...</h4>
}
if(status==='loading'){
  return <h4>טוען...</h4>
}
else if(status === 'authenticated'){
  return ( 
    <>
      <AdminDrawer  />  
       {children}          
    </>
  );

}



}
 
export default AdminWrapper;


 
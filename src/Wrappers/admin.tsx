import {  ReactNode, useContext, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import router, { useRouter } from 'next/router';
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
  const router =useRouter()


useEffect(()=>{
  if(status==='unauthenticated'){
    router.push("/")
  }
},[router, status])

const {children, noScrool, HeaderName} = props

if(status === 'unauthenticated' ){ 
  return <h4>מאמת משתממש</h4>
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


 
import { useSession } from 'next-auth/react'
import {useEffect,useMemo,useState} from 'react'
import { useRouter } from 'next/router'
import { useAdminEvents } from '@/util/Hooks/admin/Hooks/use-get-admin-events'
import { GetServerSideProps } from 'next'
import { ClientEventType } from '@/types/pages-types/new-event-types'
import axios from 'axios'
import AdminLayout from '@/components/Layouts/admin-layout'

export const getServerSideProps: GetServerSideProps<{Events: ClientEventType[];}> =
   async (context) => {
      try {
        const response = await axios.get<ClientEventType[]>(
         "http://localhost:8888/api/client/events/R/get-events"
       );
       if(response.status=== 200){
         return { props: { Events: response.data } };
       }
       return{ notFound:true}
     }
    catch (error) {
      console.error("Error fetching events:", error);
    
    return { props: { Events: [] } }; // Return an empty array as a fallback
  }
};


const EventInfoPage=({Events}:{Events:ClientEventType[]})=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { id } = router.query


  const PageEvent = useMemo(() => {
    return Events?.filter((event) => event._id === id);
  }, [Events, id]); 

  useEffect(()=>{ console.log(PageEvent)},[PageEvent])



    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (    <AdminLayout>
                    logs,
                    paymets,
                    customers,
                    views,
                    total ernings,
              </AdminLayout>
) 
}

export default EventInfoPage
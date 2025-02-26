import { useSession } from 'next-auth/react'
import {useEffect,useMemo,useState} from 'react'
import { useRouter } from 'next/router'
import { useAdminEvents } from '@/hooks/admin/use-admin-events'
import { GetServerSideProps } from 'next'
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types'
import axios from 'axios'



const EventInfoPage=()=>{



  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { Events,isEventsError,isEventsValidating ,updateEvents }  =  useAdminEvents(session)
  

  const { id } = router.query

  const PageEvent=  Events?.find((event) => event._id === id);



  const getPaymenys = async ()=>{

    const payment = axios.get(
      '/api/admin/live-events/get-event-payments',
      {
        params:{id} // back end its query
      }
      
   )

  }



  useEffect(()=>{ 

    console.log(PageEvent)},[PageEvent]

  )

  if(!PageEvent){
     return
  }







    if (status === 'loading') {
      return <h1 style={{textAlign:'center'}}>Loading...</h1>
   }

return (    <>
                    logs,
                    paymets,
                    customers,
                    views,
                    total ernings,
              </>
) 
}

export default EventInfoPage
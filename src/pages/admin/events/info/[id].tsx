import { useSession } from 'next-auth/react'
import {useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { useAdminEvents } from '@/lib/admin/Hooks/use-get-admin-events'
import AdminLayout from '@/Layouts/admin-layout'

const EventInfoPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const { id } = router.query

  const { Events } = useAdminEvents(session)

  const PageEvent = Events.filter((event)=> event._id == id   )


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
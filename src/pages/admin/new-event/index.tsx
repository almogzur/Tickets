// React | Next
import { useSession } from 'next-auth/react'
import { useState} from 'react'


//components
import Head from 'next/head'
import AdminLayout from '@/Layouts/admin-layout'
import LoadingScreen from '@/components/gen/loading'
import NewEventFormWraper from '@/components/admin/newEvent/from-wrapper'


const NewEventPage=()=>{

   //Global State 
   const {data: session ,status ,update} = useSession()
   const sessionStatus = status


   // Page State 
   const [loadingScrenText ,setLoadingScrenText] =useState<string|undefined>(undefined)

       if (sessionStatus === 'loading'  ) {

      return <LoadingScreen text={loadingScrenText} />
      }

       return (
    <>
     <Head>
      <meta name="viewport" content="width=device-width, user-scalable=no"/>
    </Head>

    <AdminLayout>
      <NewEventFormWraper  />
    </AdminLayout>

    </>
      ) 
}

export default NewEventPage




  /**
   * // solotion from https://stackoverflow.com/questions/71052832/zod-set-min-max-after-transform-string-to-number   
  The issue of e123 being considered valid likely arises from how JavaScript's Number type and related transformations interpret scientific notation. For example, e123 would be parsed as 10^123 in JavaScript when converted to a number using functions like parseFloat or Number.

If you want to disallow scientific notation (like e123) while validating numbers in your schema, you need a regex that explicitly excludes e or similar characters.

Updated Regex
javascript
Copy code
/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/ */
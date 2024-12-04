import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {  Typography , OutlinedInput , Stack as Flex} from '@mui/material'

import { mainSeats ,surroundSeats ,  surroundSeatsStyles ,surroundTextStyles } from '../../../constants/theathers/eilat_1'


import WidthContext from '@/context/WidthContext'
import Editor from '@/components/text-editor/editor'
import DatesList from '@/components/date-list'
import SeatsControl from '@/components/admin/SeatsControl'

const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const [newEventState , setNewEventState ]= useState()

  useEffect(()=>{  })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <AdminLayout>
      <Typography variant='h3' textAlign={"center"} > אירוע חדש</Typography>
     


         <Flex direction={ md? "row" :'column'} gap={2}   justifyContent={"center"} alignItems={'baseline'}  >

                <Flex width={md? '40%':"100%"} >

                  <OutlinedInput required inputProps={{alt:""  }} placeholder='שם' />        
                  <OutlinedInput required placeholder="כתובת"/>        
                  <OutlinedInput required placeholder="קטגוריה"/>
                  <OutlinedInput required placeholder="תויות" />
               </Flex>

                <Flex width={ md? "60%": "100%"} >
                  <Editor/>
                </Flex>


         </Flex>   

     
        <DatesList/>
        <SeatsControl  
            mainSeats={mainSeats} 
            surroundSeats={surroundSeats} 
            surroundSeatsStyles={surroundSeatsStyles} 
            surroundTextStyles={surroundTextStyles}
             />

    </AdminLayout>
) 
}

export default NewEventPage




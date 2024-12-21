
// React | Next
import { useSession } from 'next-auth/react'
import { ChangeEvent, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'

//Types
import { FullDateOptions,  } from '@/pages/_app'
import dayjs from 'dayjs'

//components
import Head from 'next/head'
import {Typography  , Stack as Flex,  useTheme, Button} from '@mui/material'
import AdminLayout from '@/Layouts/admin-layout'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import TabsForm from '@/components/admin/newEvent/tabs/tabs-form'
import Theater from '@/components/admin/newEvent/theater/theater'

//WraperContex
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import InfoTabContext from '@/context/admin/new-event/tabs/tabs-info-context'
import { Seats, SeatStyles } from '@/constants/models/Events'

export interface InfoFormType  {
  eventName:string ,
  location:string,
   cat:string
   pre:string
   image:File|undefined
   preview:string
   day: Date|undefined;
   isEventClosedForSeal:boolean
   closingSealesDate:Date|undefined
   theater:TheaterType|undefined
}
export  interface BaceTicket  {
  evenName:string
  location:string
  TicketClosingSealesDate:string
  eventDate:string
  finelPrice:string ,
  priceInfo:string
  selectedType:string


}
export interface TicketType extends BaceTicket  {
    // just for form function one hasMap will be sent  
    types:{
        normal:{ price:string , info:string ,  },
        discount:{price:string, info:string },
        citizen:{ price:string , info:"הנחת תושב"}
    }
}
export interface TheaterType {
  mainSeats?:Seats 
  sideSeats?:Seats 
  textsStyle?:SeatStyles
  styles?:SeatStyles
  ThaeaterName?:string
}

const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()

  // G Info Filed 
  const [infoFileds,setInfoFileds]=useState<InfoFormType>({
    eventName:"",
     location:"",
      cat:"",
     theater:undefined,
     day:undefined,
     closingSealesDate:undefined,
     isEventClosedForSeal:false,
     pre:"",
     image:undefined,
     preview:""
    })
  
  //Tickets
  const [tickets, setTickets] =useState<TicketType[]>([])

  // Seats Amount 
  const [totalSeats ,setTotalSeats]= useState<number>(0)

  // Ad Text 
  const [adText,setAdText ]= useState()

  useEffect(()=>{  })

if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}


return (
  <>
  <Head>
   <meta name="viewport" content="width=device-width, user-scalable=no"/>
  </Head>
     <AdminLayout>
       <form>  
         <InfoTabContext.Provider value={{infoFileds,setInfoFileds}}>
         <TabsTickets.Provider  value={{tickets ,setTickets}} >
        
         <TabsForm />

           {  infoFileds.theater && infoFileds.theater.mainSeats && 
          <Theater  /> 
           }

         </TabsTickets.Provider>
         </InfoTabContext.Provider> -

        <Flex p={4} alignItems={"center"}  >
        <Button disabled   sx={{height:50 ,width:100,background:"black"}} >  </Button>
      </Flex>
      </form>

     </AdminLayout>
    </>
) 
}

export default NewEventPage














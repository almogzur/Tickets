// React | Next
import { useSession } from 'next-auth/react'
import { ChangeEvent, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'

// Input  Validation 
import { z }  from 'zod'

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

// validate schimas 
export const BaceTicketVS = z.object({
  eventName : z.string().min(3).max(20),
  location: z.string().min(3).max(20),
  cat: z.string().min(3).max(20),
  Date:z.date(),
  EndSealesDate: z.date(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("citizen"),z.undefined()]),
  priceInfo:z.string().min(3),
  finelPrice: z.number().or(z.string().regex(/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/g,{message:"not valid number"}).transform(Number)) // notes below 
  .refine((n) => n >= 0)
})  

export type  BaceTIcketType  =   z.infer<typeof BaceTicketVS  > 

export type  BaceTIcketType_Partial = Partial<BaceTIcketType>

export interface InfoFormType  {
   eventName:string ,
   location:string,
   cat:string
   pre:string
   Theater:TheaterType|undefined
   image:File|undefined
   preview:string
   isEventClosedForSeal:boolean
   Date:Date|undefined
}export interface TheaterType {
  mainSeats:Seats 
  sideSeats:Seats 
  textsStyle:SeatStyles
  styles:SeatStyles
  ThaeaterName:string
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
    Theater:undefined,
     Date:undefined,
     isEventClosedForSeal:false,
     pre:"",
     image:undefined,
     preview:""
    })
  
  //Tickets
  const [tickets, setTickets] =useState<BaceTIcketType[]>([])

  // Seats Amount 
  const [totalSeats ,setTotalSeats]= useState<number>(0)

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

           {  infoFileds.Theater &&
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













  /**
   * // solotion from https://stackoverflow.com/questions/71052832/zod-set-min-max-after-transform-string-to-number   
  The issue of e123 being considered valid likely arises from how JavaScript's Number type and related transformations interpret scientific notation. For example, e123 would be parsed as 10^123 in JavaScript when converted to a number using functions like parseFloat or Number.

If you want to disallow scientific notation (like e123) while validating numbers in your schema, you need a regex that explicitly excludes e or similar characters.

Updated Regex
javascript
Copy code
/^(?:[1-9]\d*|0)(?:\.\d{1,2})?$/ */
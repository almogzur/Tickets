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
import TabsWraper from '@/components/admin/newEvent/tabs/tabs-wraper'
import TheaterComponent from '@/components/admin/newEvent/theater/theater'

//WraperContex
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'
import { Seats, SeatStyles } from '@/constants/models/Events'


///////
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import { Positions } from '@/pages/_app'
import AdminTransformContext  from '@/context/admin/new-event/map/admin-map-positions-context'

///////

// validate schimas 
export const BaceTicketVS = z.object({
  eventName : z.string().min(3).max(20),
  location: z.string().min(3).max(20),
  cat: z.union([z.string().min(3).max(20),z.undefined()]),
  Date:z.date(),
  EndSealesDate: z.date(),
  selectedType:z.union([z.literal("normal"),z.literal("discount"),z.literal("citizen")]),
  priceInfo:z.string().min(3),
  price: z
     .string()
    .regex(/^(?!0$)(?:[1-9]\d*|0?\.\d{1,2})$/g,{message:"not valid number"})
    .or(z.number().nonnegative().min(1))
})  

export type  BaceTIcketType  =   z.infer<typeof BaceTicketVS  > 
export type  BaceTIcketType_Partial = Partial<BaceTIcketType>

export interface InfoFormType  {
   eventName:string ,
   location:string,
   cat:string
   pre:string
   TheaterName:string|undefined
   Theater:TheaterType|undefined
   image:File|undefined
   preview:string
   isEventClosedForSeal:boolean
   Date:Date|undefined,
}
export interface TheaterType {
  mainSeats:Seats 
  sideSeats:Seats 
  textsStyle:SeatStyles
  styles:SeatStyles
  ThaeaterName:string
}
export interface TipinfoType {
initValue:number
row:string
seatNumber:number
} 
export interface MultiTipeInfoType  {
seatNumber: number|undefined
row: string
first:number|undefined
second:number|undefined
totalselected:number
err:string
selectdir:"R"|"L"|undefined
}

const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()

    // AdminSingleTipState 
    const [ singleTipPositions, setSingleTipPositions]=useState<Positions>({x:0,y:0})
    const [ seatTipInfo , setSeatTipInfo ] = useState<TipinfoType>({initValue:0,row:"",seatNumber:0})
    const resetSingleTip  = () :void=> { setSingleTipPositions({x:0,y:0}) ; setSeatTipInfo({initValue:0, row:"" , seatNumber:0}) }
    const [AdminMapPositions , setAdminMapPositions] = useState<Positions>({x:0,y:0,Scale:0,disabled:false})

    //AdminMiltiTipState
    const [multiTipInfo, setMultiTipInfo]=useState<MultiTipeInfoType>({
        first:undefined, 
        second:undefined,
        totalselected:0 ,
         row:"" ,
         err:"" ,
         seatNumber:undefined  ,
        selectdir:undefined
         })
    const [ multiTipPositions , setMutiTipPositions ]= useState<Positions>({x:0,y:0})
    const resetMultiTip = ():void=>{ setMutiTipPositions({x:0,y:0}) ; setMultiTipInfo(p=>({first:undefined, second:undefined,totalselected:0 , row:"" ,err:"" ,seatNumber:undefined  , selectdir:undefined})  ) }
    const resetErr = () : void=>{ setMultiTipInfo(p=>({...p,err:""}))}
  
  

  // G Info Filed 
  const [infoFileds,setInfoFileds]=useState<InfoFormType>({
    eventName:"",
     location:"",
    cat:"",
    Theater:undefined,
    TheaterName:undefined,
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


         <TabInfoContext.Provider value={{infoFileds,setInfoFileds}}>

         <TabsTickets.Provider  value={{tickets ,setTickets}} >
            <TabsWraper />
         </TabsTickets.Provider>

          {  infoFileds.Theater &&
             <AdminTransformContext.Provider value={{AdminMapPositions,setAdminMapPositions}}>   
              <MultiSelectContext.Provider value={{multiTipPositions,setMutiTipPositions,resetMultiTip , multiTipInfo, setMultiTipInfo ,resetErr }} >
               <SingleTipContext.Provider value={{ singleTipPositions, setSingleTipPositions, seatTipInfo, setSeatTipInfo , resetSingleTip }}>
                   <TheaterComponent  TheaterDate={infoFileds.Theater}  /> 
              </SingleTipContext.Provider>
              </MultiSelectContext.Provider>
            </AdminTransformContext.Provider>        
          }

         </TabInfoContext.Provider> 




        <Flex p={4} alignItems={"center"} gap={4} direction={"row"} justifyContent={"center"} >
        <Button disabled   sx={{height:50 ,width:100,background:"black"}} > פרסם </Button>
        <Button disabled   sx={{height:50 ,width:100,background:"black"}}>טויוטה</Button>

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
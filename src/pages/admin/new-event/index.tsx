// React | Next
import { useSession } from 'next-auth/react'
import { ChangeEvent, MutableRefObject, RefObject, useContext, useEffect,useRef,useState} from 'react'
import { useRouter } from 'next/router'
import { z, ZodIssue }  from 'zod'
import axios from 'axios'


//WraperContex
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import AdminTransformContext  from '@/context/admin/new-event/map/admin-map-positions-context'
import TabsPageContext from '@/context/admin/new-event/tabs/tabs-page-context'
import TabsEroorsContext from '@/context/admin/new-event/tabs/tabs-eroors-context'
//components
import Head from 'next/head'
import { Stack as Flex,  useTheme, Button, Backdrop, CircularProgress, Skeleton, Box, Grid, Grid2, Typography} from '@mui/material'
import AdminLayout from '@/Layouts/admin-layout'
import TabsWraper from '@/components/admin/newEvent/tabs/tabs-wraper'
import TheaterComponent from '@/components/admin/newEvent/theater/theater'

// Ions 
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import SpeedDialWrap from '@/components/gen/speed-dail-wrap'
import { FaFirstdraft } from 'react-icons/fa6'
import { NextResponse } from 'next/server'

///// Types 
import { infoFiledsType, ProductionInfoFiledsValidtinSchema, RequestStatusType, TempInfoFiledsValidationSchema, TempInfoType, TicketType,  } from '@/components/admin/newEvent/types/new-event-types'
import { TheaterMultiTipeInfoType, Positions, TheaterTipinfoType, RefsType } from '@/components/admin/newEvent/theater/types/theater-types'


/////// Use Context 
import WidthContext from '@/context/WidthContext'
import { MdPublic } from 'react-icons/md'


import LoadingScreen from '@/components/gen/loading'


///////

// validate schimas 


const NewEventPage=()=>{

         const QuickActions = [
          { icon: <FaFirstdraft size={"2em"} />,
           name: 'שמור טיוטה' , 
           ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveTempEvent(infoFileds,tickets)} 
          },
          { icon: <MdPublic size={"2.5em"} />,
           name: ' פרסם ' , 
           ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveProductionEvent()} 
         },
         ];
        //Global State 

        const [tabValue, setTabValue] = useState(0);
        const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        const router = useRouter()
        const theme = useTheme()
        const {data: session ,status ,update} = useSession()

        const sessionStatus = status

        // Page State 
        ///////////////////
        const [SaevNewEventReqestStatus, setSaevNewEventReqestStatus] = useState<RequestStatusType>(undefined)
        const [isLoading, setIsLoading ] = useState<boolean>(false)
        const [loadingScrenText ,setLoadingScrenText] =useState<string|undefined>(undefined)
        const eventNameRef = useRef<HTMLInputElement>(null);
        ////////////////////
        ////////////////////


         // Theater State 
        ////////////////////
        const [ singleTipPositions, setSingleTipPositions]= useState<Positions>({x:0,y:0,Scale:0,disabled:false})
        const [ multiTipPositions , setMutiTipPositions ]= useState<Positions>({x:0,y:0})
        const [ AdminMapPositions , setAdminMapPositions] = useState<Positions>({x:0,y:0,Scale:0,disabled:false})
        const [seatTipInfo , setSeatTipInfo ] = useState<TheaterTipinfoType>({initValue:0,row:"",seatNumber:0})
        const resetSingleTip =() :void=> { setSingleTipPositions({x:0,y:0}) ; setSeatTipInfo({initValue:0, row:"" , seatNumber:0}) }
        const [multiTipInfo, setMultiTipInfo ] = useState<TheaterMultiTipeInfoType>({ first:undefined, second:undefined,totalselected:0 ,row:"" ,err:"" ,seatNumber:undefined  ,selectdir:undefined})
        const resetMultiTip = ():void=>{ setMutiTipPositions({x:0,y:0}) ; setMultiTipInfo(p=>({first:undefined,second:undefined,totalselected:0,row:"",err:"",seatNumber:undefined,selectdir:undefined}))}
        const resetErr = () : void=>{ setMultiTipInfo(p=>({...p,err:""}))}
        /////////////////////
        ////////////////////
        
      
        // For DB Data 
        ////////////////////
        const [infoFileds,setInfoFileds]=useState<infoFiledsType>({
               eventName:"",
               cat:"",
               TheaterName:"",
               pre:"",
               availableSeatsAmount:undefined,
               Theater:undefined,
               Date:null,
               Hour:null,
               OpenDorHour:null,
               isEventClosedForSeal:false,
               image:undefined,
               preview:""
          })
        const [tickets, setTickets] =useState<TicketType[]>([])
        const [ eventSetting , setEventSetting] =useState({})
         /////////////////////
        ////////////////////

        // Form Validations Saving Options 
        const newEventValidateFiled = ( filed:string ): string | undefined  => {  
          const TempInfoFiledsIssues = TempInfoFiledsValidationSchema.safeParse(infoFileds).error?.issues
          const ProductionInfoFiledsIssues= ProductionInfoFiledsValidtinSchema.safeParse(infoFileds).error?.issues      
          
           const issue  =
                        SaevNewEventReqestStatus === 'Temp' ? TempInfoFiledsIssues?.find(item => item.path.join("") === filed)
                        :
                        SaevNewEventReqestStatus === 'Production' ? ProductionInfoFiledsIssues?.find(item => item.path.join("") === filed)
                        :
                       undefined
            return issue?.message
        }
        // Requests 
        const saveTempEvent = async (infoFileds:infoFiledsType, tickets: TicketType[]):Promise<NextResponse|undefined> => {

          setSaevNewEventReqestStatus('Temp')
            console.log("sending req" ,infoFileds.image);
            const ValidationResult =  TempInfoFiledsValidationSchema.safeParse(infoFileds);

 
            try {

              if(ValidationResult.success){
                   setIsLoading(true)
                   setTimeout(()=>{setIsLoading(false)},2000)
                 // Make the POST request
                 const response = await axios.post("/api/admin/drafts/C/draft", { infoFileds,tickets },{} );

              // Handle response
              console.log(response);
              
                  if(response.statusText==="OK"){
                    router.push("/admin")
                  }
                
              }
              else{
                // focuse name 
                   if(eventNameRef.current){
                     eventNameRef.current.scrollIntoView({block:'end',behavior:'smooth'})
                     console.log(eventNameRef);
                    }
                   else{
                      setTabValue(0)
                      console.log('no ref');
                      
                      
                  }
               return undefined
              }
             }
           catch (error) {
             if (error instanceof z.ZodError) {
               // Handle validation errors
               console.error("Validation Errors:", error.errors);
               console.log("Invalid input data");
             }
             console.error("API Error:", error);
            console.log("Failed to save the event");
           }
        };

        const saveProductionEvent = async () =>{
          setSaevNewEventReqestStatus('Production')

        }

      if (sessionStatus === 'loading'  || isLoading  ) {

      return <LoadingScreen text={loadingScrenText} />
      }
        

      return (
    <>
     <Head>
     <meta name="viewport" content="width=device-width, user-scalable=no"/>
    </Head>
    <AdminLayout>
      <TabsEroorsContext.Provider value={{newEventValidateFiled}}>
      <TabsPageContext.Provider value={{tabValue,setTabValue, isLoading, setIsLoading, SaevNewEventReqestStatus, setSaevNewEventReqestStatus ,loadingScrenText ,setLoadingScrenText }}>
      <TabInfoContext.Provider value={{infoFileds,setInfoFileds}}>
      <TabsTickets.Provider  value={{tickets ,setTickets}} >
          <TabsWraper eventNameRef={eventNameRef} />
          { 
           infoFileds.Theater &&
          <AdminTransformContext.Provider value={{AdminMapPositions,setAdminMapPositions}}>   
            <MultiSelectContext.Provider value={{multiTipPositions,setMutiTipPositions,resetMultiTip , multiTipInfo, setMultiTipInfo ,resetErr }} >
            <SingleTipContext.Provider value={{ singleTipPositions, setSingleTipPositions, seatTipInfo, setSeatTipInfo , resetSingleTip }}>
               <TheaterComponent  TheaterDate={infoFileds.Theater}  /> 
          </SingleTipContext.Provider>
          </MultiSelectContext.Provider>
         </AdminTransformContext.Provider>    
          }
     </TabsTickets.Provider>
     </TabInfoContext.Provider> 
     </TabsPageContext.Provider>
     </TabsEroorsContext.Provider>
     <SpeedDialWrap
              actions={QuickActions}
              mainIcon={<SlOptions size={"2em"} />}
              openToolTip
              openToolTipPlacement="right"
              direction={"up"}
              positions={!sm?{ bottom: 0,left:0 }:{bottom:16,left:10}}       
              
              />

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
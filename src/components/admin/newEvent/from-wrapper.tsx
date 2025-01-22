import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { infoFiledsType, ProductionInfoFiledsValidtinSchema, RequestStatusType, TempInfoFiledsValidationSchema, TicketType } from "./types/new-event-types";

//WraperContex
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import AdminTransformContext  from '@/context/admin/new-event/map/admin-map-positions-context'
import TabsPageContext from '@/context/admin/new-event/tabs/tabs-page-context'
import TabsEroorsContext from '@/context/admin/new-event/tabs/tabs-eroors-context'
import { Positions, TheaterMultiTipeInfoType, TheaterTipinfoType } from "./theater/types/theater-types";


import TabsWraper from '@/components/admin/newEvent/tabs/tabs-wraper'
import TheaterComponent from '@/components/admin/newEvent/theater/theater'



import { z, ZodIssue }  from 'zod'
import axios from 'axios'
import { NextResponse } from 'next/server'




// Ions 
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import SpeedDialWrap from '@/components/gen/speed-dail-wrap'
import { FaFirstdraft } from 'react-icons/fa6'
import { MdPublic } from "react-icons/md";
import { useRouter } from "next/router";
import WidthContext from "@/context/WidthContext";
import { useAdminDrafts } from "@/lib/Hooks/use-admin-drafts";
import { useSession } from "next-auth/react";
import { RiDraftFill } from "react-icons/ri";
import { useTheme } from "@mui/material";


type NOPropsTypeRequired ={
  EventId?: string;
  setEventId?: Dispatch<SetStateAction<string | undefined>>;
}

type WithIdPropsTypeRequired ={
  EventId: string;
  setEventId: Dispatch<SetStateAction<string | undefined>>;
  }

 type NewEventFormWrapperProps = NOPropsTypeRequired | WithIdPropsTypeRequired
  

const NewEventFormWraper = ({EventId,setEventId}:NewEventFormWrapperProps)=>{

  

  const { data: session ,status ,update} = useSession()
  const { Drafts , isDraftsValidating, isDraftsError , updateDrafts}=useAdminDrafts(session)

    // For DB Data 
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
const eventNameRef = useRef<HTMLInputElement>(null);



    useEffect(()=>{
   
          if(EventId && typeof EventId === 'string' && session?.user?.name ){
             // console.log(EventId);
             const Draft = Drafts?.find((draft) => draft._id === EventId);
              
              if(Draft){
                console.log(Draft);
                
                const {tickets, ...InfoFileds} = Draft // Sparating 
                
                  setInfoFileds(InfoFileds)
           
                if(tickets){
                 setTickets(tickets)
                }
              }

        }
    },[Drafts, EventId, session?.user?.name])


  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const router = useRouter()
  const theme = useTheme()



  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading ] = useState<boolean>(false)
  const [loadingScrenText ,setLoadingScrenText] =useState<string|undefined>(undefined)
  const [SaevNewEventReqestStatus, setSaevNewEventReqestStatus] = useState<RequestStatusType>(undefined)

 // Theater State 
  const [ singleTipPositions, setSingleTipPositions]= useState<Positions>({x:0,y:0,Scale:0,disabled:false})
  const [ multiTipPositions , setMutiTipPositions ]= useState<Positions>({x:0,y:0})
  const [ AdminMapPositions , setAdminMapPositions] = useState<Positions>({x:0,y:0,Scale:0,disabled:false})
  const [seatTipInfo , setSeatTipInfo ] = useState<TheaterTipinfoType>({initValue:0,row:"",seatNumber:0})
  const resetSingleTip =() :void=> { setSingleTipPositions({x:0,y:0}) ; setSeatTipInfo({initValue:0, row:"" , seatNumber:0}) }
  const [multiTipInfo, setMultiTipInfo ] = useState<TheaterMultiTipeInfoType>({ first:undefined, second:undefined,totalselected:0 ,row:"" ,err:"" ,seatNumber:undefined  ,selectdir:undefined})
  const resetMultiTip = ():void=>{ setMutiTipPositions({x:0,y:0}) ; setMultiTipInfo(p=>({first:undefined,second:undefined,totalselected:0,row:"",err:"",seatNumber:undefined,selectdir:undefined}))}
  const resetErr = () : void=>{ setMultiTipInfo(p=>({...p,err:""}))}


   // Functions 

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

  const updateDraft = async (EventId:string, infoFileds:infoFiledsType, tickets: TicketType[])=>{


    const ReqData = { ...infoFileds, tickets, id:EventId }

    if(EventId){
      try{ 
        console.log("With ID")
        const response = await axios.post("/api/admin/drafts/U/update-draft",ReqData );
        if(response.status===200){
            
        }

       }
      catch (err){  
        console.log("Update_`Draft",err);
        
      }
      finally { 
         router.push("/admin")
       }

    }
  }
   // Requests 
  const saveTempEvent = async ( infoFileds:infoFiledsType, tickets: TicketType[] , EventId?:string ):Promise<NextResponse|undefined> => {
      console.log("sending req" ,infoFileds.image);
      setSaevNewEventReqestStatus('Temp')
      const ValidationResult =  TempInfoFiledsValidationSchema.safeParse(infoFileds);
        try {
            if(ValidationResult.success){
                 setIsLoading(true)
                 setTimeout(()=>{setIsLoading(false)},2000)
               // Make the POST request

                const Data ={ ...infoFileds, tickets } 
                const response = await axios.post("/api/admin/drafts/C/new-draft",Data ,{} );

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


  const QuickActions = [
            { icon: <FaFirstdraft size={"2em"} />,
             name: 'שמור טיוטה' , 
             ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>
                EventId
                ? updateDraft(EventId, infoFileds,tickets) 
                : saveTempEvent(infoFileds,tickets ,EventId)
              
            },
            { icon: <MdPublic size={"2.5em"} />,
             name: ' פרסם ' , 
             ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveProductionEvent()} 
           },
        
           ];

   const withIdQuickAction =[
    {
      icon:<RiDraftFill size={"2.5em"} />,
      name:"בטל וחזור",
      ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{ setEventId? setEventId(""):null} 
    },
    { icon: <FaFirstdraft size={"2em"} />,
    name: 'עדכן טיוטה ' , 
    ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>
       EventId
       ? updateDraft(EventId, infoFileds,tickets) 
       : saveTempEvent(infoFileds,tickets ,EventId)
   },
   { icon: <MdPublic size={"2.5em"} />,
   name: ' פרסם ' , 
   ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveProductionEvent()} 
 },

   ]


  return(
    
    <TabsEroorsContext.Provider value={{newEventValidateFiled}}>
    <TabsPageContext.Provider value={{tabValue,setTabValue, isLoading, setIsLoading, SaevNewEventReqestStatus, setSaevNewEventReqestStatus ,loadingScrenText ,setLoadingScrenText }}>
    <TabInfoContext.Provider value={{infoFileds,setInfoFileds}}>
    <TabsTickets.Provider  value={{tickets ,setTickets}} >
           <TabsWraper EventId={EventId}  />
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
          <SpeedDialWrap
              actions={EventId? withIdQuickAction :  QuickActions}
              mainIcon={<SlOptions size={"2em"} />}
              openToolTip
              openToolTipPlacement="right"
              direction={"up"}
              positions={!sm?{ bottom: 0,left:0 }:{bottom:16,left:10}}       
           />
        </TabsTickets.Provider>
   </TabInfoContext.Provider> 
   </TabsPageContext.Provider>
   </TabsEroorsContext.Provider>



   

  )
}


export const  DraftForm = ()=>{
  
}

export default  NewEventFormWraper



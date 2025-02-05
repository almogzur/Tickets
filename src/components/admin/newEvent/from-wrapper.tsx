import { Dispatch, SetStateAction, useContext, useEffect, useRef, useState } from "react";
import { EventSettingType, infoFiledsType, EventValidtinSchema, RequestStatusType, DraftValidationSchema, TicketType } from "./types/new-event-types";

//WraperContex
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import AdminTransformContext  from '@/context/admin/new-event/map/admin-map-positions-context'
import TabsPageContext from '@/context/admin/new-event/tabs/tabs-page-context'
import TabsEroorsContext from '@/context/admin/new-event/tabs/tabs-eroors-context'
import TabsEventSettingsContest from '@/context/admin/new-event/tabs/tabs-event-settings-context'





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
import { useAdminDrafts } from "@/lib/admin/Hooks/use-admin-drafts";
import { useSession } from "next-auth/react";
import { RiDraftFill } from "react-icons/ri";
import { useTheme } from "@mui/material";
import { ImRedo2 } from "react-icons/im";
import LoadingScreen from "@/components/gen/loading";


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
        // For DB Data 
            // For DB Data 
    const [infoFileds,setInfoFileds]=useState<infoFiledsType>({
      eventName:"",
      cat:"",
      TheaterName:"",
      pre:"",
      availableSeatsAmount:undefined,
      Theater:undefined,
      Date:"",
      Hour:"",
      OpenDorHour:"",
      isEventClosedForSeal:false,
      image:undefined,
      preview:""
 })


const [tickets, setTickets] =useState<TicketType[]>([])
const [ eventSetting , setEventSetting] =useState<EventSettingType>({
  limitClientTicket: true, // true is disabled flase enabled
  ticketLimit:'5', // mum start at 0 array form()
  canSelectNotRelatedSites:true, 
})

    // For DB Data 
        // For DB Data 
            // For DB Data 


    useEffect(()=>{
   
          if(EventId && typeof EventId === 'string' && session?.user?.name ){
             // console.log(EventId);
             const Draft = Drafts?.find((draft) => draft._id === EventId);
              
              if(Draft){
                console.log(Draft);
                
                const { eventSetting, tickets, ...InfoFileds} = Draft // Sparating 
                
                  setInfoFileds(InfoFileds)
                  setEventSetting(eventSetting)
           
                if(tickets){
                 setTickets(tickets)
                }
              }

        }
    },[Drafts, EventId, session?.user?.name])


    useEffect(()=>{
      console.log(eventSetting,"form maunted  wrapper snapshot  ")},[eventSetting])


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
    const TempInfoFiledsIssues = DraftValidationSchema.safeParse(infoFileds).error?.issues
    const ProductionInfoFiledsIssues= EventValidtinSchema.safeParse(infoFileds).error?.issues      
    
     const issue  =
                  SaevNewEventReqestStatus === 'Temp' ? TempInfoFiledsIssues?.find(item => item.path.join("") === filed)
                  :
                  SaevNewEventReqestStatus === 'Production' ? ProductionInfoFiledsIssues?.find(item => item.path.join("") === filed)
                  :
                 undefined
      return issue?.message
  }

  const updateDraft = async (EventId:string, infoFileds:infoFiledsType, tickets: TicketType[], eventSetting : EventSettingType)=>{
    setIsLoading(true)
    setLoadingScrenText("מעדכן")

    const ReqData = { ...infoFileds, tickets, eventSetting , id:EventId }

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
         setIsLoading(false)
         setLoadingScrenText("")
       }
  }}
   // Requests 
  const saveDraft = async (
          infoFileds:infoFiledsType,
          tickets: TicketType[],
          eventSetting:EventSettingType 
         , EventId?:string 
        ):Promise<void>=> {
          console.log("sending req" ,infoFileds.image);
         setSaevNewEventReqestStatus('Temp')
      const ValidationResult =  DraftValidationSchema.safeParse(infoFileds); //validate form on click 
         try {
               if(ValidationResult.success){

                  setIsLoading(true)
                  setLoadingScrenText("שומר")
                   const ReqData ={ ...infoFileds, tickets , eventSetting} 
                   const response = await axios.post("/api/admin/drafts/C/new-draft",ReqData ,{} );
            
                if(response.status === 200 ){
                      router.push("/admin")
                }}
              else{
              // focuse name 

                    setTabValue(0)
                    console.log('no ref');
                  
            
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
         finally{
          setIsLoading(true)
          setLoadingScrenText("שומר")
         }
    };
  
  const saveEvent = async () =>{
            setSaevNewEventReqestStatus('Production')
  
    }
  

  const QuickActions = [
            { icon: <FaFirstdraft size={"2em"} />,
             name: 'שמור טיוטה' , 
             ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>
                EventId
                ? updateDraft(EventId, infoFileds,tickets,eventSetting) 
                : saveDraft(infoFileds,tickets, eventSetting ,EventId)
              
            },
            { icon: <MdPublic size={"2.5em"} />,
             name: ' פרסם ' , 
             ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveEvent()} 
           },
        
           ];

   const withIdQuickAction =[
    {
      icon:<ImRedo2  size={'2em'} />
      ,
      name:"בטל וחזור",
      ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{ setEventId? setEventId(""):null} 
    },
    { icon: <RiDraftFill size={"2em"} />,
    name: 'עדכן טיוטה ' , 
    ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>
       EventId
       ? updateDraft(EventId, infoFileds,tickets,eventSetting) 
       : saveDraft(infoFileds,tickets,eventSetting ,EventId)
   },
   { icon: <MdPublic size={"2.5em"} />,
   name: ' פרסם ' , 
   ClickHendler:(e:React.MouseEvent<HTMLDivElement>)=>{saveEvent()} 
 },

   ]

          if (isLoading)  {
   
         return <LoadingScreen text={loadingScrenText} />
         }

  return(

    <TabsEroorsContext.Provider value={{newEventValidateFiled}}>
    <TabsPageContext.Provider value={{tabValue,setTabValue, isLoading, setIsLoading, SaevNewEventReqestStatus, setSaevNewEventReqestStatus ,loadingScrenText ,setLoadingScrenText }}>
    <TabInfoContext.Provider value={{infoFileds,setInfoFileds}}>
    <TabsTickets.Provider  value={{tickets ,setTickets}} >
    <TabsEventSettingsContest.Provider value={{ eventSetting, setEventSetting}} >

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
    </TabsEventSettingsContest.Provider>
   </TabsTickets.Provider>
   </TabInfoContext.Provider> 
   </TabsPageContext.Provider>
   </TabsEroorsContext.Provider>



   

  )
}


export const  DraftForm = ()=>{
  
}

export default  NewEventFormWraper



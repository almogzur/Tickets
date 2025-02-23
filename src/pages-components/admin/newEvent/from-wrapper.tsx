import { useContext, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { useSession } from "next-auth/react";
import { useTheme } from "@mui/material";
import axios from "axios";
import { z, ZodIssue } from "zod";

// Import Types
import {
  EventSettingType,
  infoFiledsType,
  NewDraftZVS,
    TicketType,
  NewDraftType,
  UpdateDraftType,
  EventFromDraftType,
  NewEventZVS,
  NewEventType,
  UpdateDraftZVS,
  EventFromDraftZVS,
} from '@/types/pages-types/admin/admin-event-types'
import {
  Positions,
  TheaterMultiTipeInfoType,
  TheaterTipinfoType
} from "../../../types/components-typs/admin/theater/admin-theater-types";

// Import Contexts
import TabsTicketsContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import AdminTransformContext from '@/context/admin/new-event/map/admin-map-positions-context';
import TabsPageContext from '@/context/admin/new-event/tabs/tabs-page-context';
import TabsEroorsContext from '@/context/admin/new-event/tabs/tabs-eroors-context';
import TabsEventSettingsContext from '@/context/admin/new-event/tabs/tabs-event-settings-context';
import WidthContext from "@/context/WidthContext";

// Import Hooks
import { useAdminDrafts } from "@/hooks/admin/use-admin-drafts";
import { useAdminBilingInfo } from "@/hooks/admin/use-admin-biiling-info";

// Import Icons
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { MdPublic } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import { UserPayPalInfo, UserPayPalInfoValidationSchema } from "@/types/pages-types/admin/user-biling-info-types";
import { RequestStatusType } from "@/types/pages-types/client/client-event-type";

// Dynamic Component Imports (Lazy Loading)
const TabsWraper = dynamic(() => import("@/pages-components/admin/newEvent/tabs/tabs-wraper"), { ssr: false });
const TheaterComponent = dynamic(() => import("@/pages-components/admin/newEvent/theater/theater"), { ssr: false });
const SpeedDialWrap = dynamic(() => import("@/HOCs/speed-dail-wrap"), { ssr: false });
const LoadingScreen = dynamic(() => import('@/HOCs/loading'), { ssr: false });

type NewEventFormWrapperProps = {
  Draft?: NewDraftType
  DraftId?: string
}

const NewEventFormWraper = ({ Draft, DraftId }: NewEventFormWrapperProps) => {

  const { data: session, status, update } = useSession()
  const { PayPalInfo} = useAdminBilingInfo(session)

  useEffect(() => {
    if (Draft) {
      const { settings, tickets, info } = Draft
      setInfoFileds(info)
      setSetting(settings)
      if (tickets) { setTickets(tickets) }
    }
  }, [Draft])


  // For DB Data 
  const [infoFileds, setInfoFileds] = useState<infoFiledsType>({
    eventName: "",
    cat: "",
    TheaterName: "",
    pre: "",
    availableSeatsAmount: 0,
    Theater: undefined,
    Date: "",
    Hour: "",
    OpenDoors: "",
    isEventClosedForSeal: false,
    preview: ""
  })
  const [tickets, setTickets] = useState<TicketType[]>([])
  const [settings, setSetting] = useState<EventSettingType>({
    limitClientTicket: true, // true is disabled flase enabled
    ticketLimit: '5', // mum start at 0 array form()
    canSelectNotRelatedSites: true,
  })

  // useEffect(()=>{
  // console.log(eventSetting,"form maunted  wrapper snapshot  ")},[eventSetting])

  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)
  const router = useRouter()
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingScrenText, setLoadingScrenText] = useState<string | undefined>(undefined)
  const [SaevNewEventReqestStatus, setSaevNewEventReqestStatus] = useState<RequestStatusType>(undefined)

  // Theater State 
  const [singleTipPositions, setSingleTipPositions] = useState<Positions>({ x: 0, y: 0, Scale: 0, disabled: false })
  const [multiTipPositions, setMutiTipPositions] = useState<Positions>({ x: 0, y: 0 })
  const [AdminMapPositions, setAdminMapPositions] = useState<Positions>({ x: 0, y: 0, Scale: 0, disabled: false })
  const [seatTipInfo, setSeatTipInfo] = useState<TheaterTipinfoType>({ initValue: 0, row: "", seatNumber: 0 })
  const resetSingleTip = (): void => { setSingleTipPositions({ x: 0, y: 0 }); setSeatTipInfo({ initValue: 0, row: "", seatNumber: 0 }) }
  const [multiTipInfo, setMultiTipInfo] = useState<TheaterMultiTipeInfoType>({ first: undefined, second: undefined, totalselected: 0, row: "", err: "", seatNumber: undefined, selectdir: undefined })
  const resetMultiTip = (): void => { setMutiTipPositions({ x: 0, y: 0 }); setMultiTipInfo(p => ({ first: undefined, second: undefined, totalselected: 0, row: "", err: "", seatNumber: undefined, selectdir: undefined })) }
  const resetErr = (): void => { setMultiTipInfo(p => ({ ...p, err: "" })) }

  // ganerate  errors for form inputs  
  const GetFormErrors = (filed: string) => {

    const DraftIssues = NewDraftZVS.safeParse( {info:infoFileds ,tickets, settings} ).error?.issues
    const EvenntIssues = NewEventZVS.omit({public_id:true}).safeParse({ info:infoFileds, tickets, settings }).error?.issues // sparidng both to create 1 continues object 

    const issues = 
       SaevNewEventReqestStatus === 'Temp' 
      ? DraftIssues?.find(item => item.path?.[1] === filed)
      :
      SaevNewEventReqestStatus === 'Production'
      ? EvenntIssues?.find(item => item.path?.[1] === filed)
         :
       undefined;

       const filedIssue = issues?.message
 
       //issues?.find((issue)=>issue.path[1] === filed)
 
    return filedIssue
  }
  const ValidateUserPaymentInfo = (): { success: boolean, eroors: z.ZodError<UserPayPalInfo> | undefined } => {
    const vlidate = UserPayPalInfoValidationSchema.safeParse(PayPalInfo)
     // console.log(vlidate.error, vlidate.success, " ValidatePayment")
    return { success: vlidate.success, eroors: vlidate.error }
  }

  // Requests 
  const saveDraft = async (): Promise<void> => {

    setSaevNewEventReqestStatus('Temp')

    const isValidData = NewDraftZVS.safeParse({ info:infoFileds, tickets, settings }); //validate form on click 

    if (!isValidData.success){
      // make llist of errs and payments errs
      alert("  אנא הזן  את כול הפרטים המסומנים ב ❌")
      return 
    } 

    try {
      if (isValidData.success) {
        setIsLoading(true)
        setLoadingScrenText("שומר")

        const ReqData: NewDraftType =isValidData.data

        const response = await axios.post("/api/admin/drafts/new-draft", ReqData, {});

        if (response.status === 200) {
          router.push("/admin")
        }
      }
      else {
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
    finally {
      setIsLoading(false)
      setLoadingScrenText("")
    }
  };

  const updateDraft = async (EventId: string) => {
    //   setIsLoading(true)
    setLoadingScrenText("מעדכן")

    const isValidData = UpdateDraftZVS.safeParse({ info:infoFileds, tickets, settings  , _id : EventId })

    if(!isValidData.success){
       console.log( " No Validation " , "updateDraft" , isValidData.error.issues)
      return
    }
    const ReqData: UpdateDraftType = isValidData.data
 
      try { 
         const response = await axios.post("/api/admin/drafts/update-draft", ReqData);
         if (response.status === 200) { }
      }
      catch (err) {
        console.log("Update_`Draft", err);

      }
      finally {
        router.push("/admin")
        setIsLoading(false)
        setLoadingScrenText("")
      }


    
  }

  const saveEvent = async () => {
    setSaevNewEventReqestStatus('Production')

    const isValidData = NewEventZVS.safeParse({ info:infoFileds, tickets, settings , public_id:PayPalInfo.clientId, })

    if(!isValidData.success || !ValidateUserPaymentInfo().success ){
      // make llist of errs and payments errs
      alert("  אנא הזן  את כול הפרטים המסומנים ב ❌")
      return
    }     
    // setIsLoading(true)
    const NewEventData : NewEventType =isValidData.data
    try {
      const response = await axios.post("/api/admin/live-events/new-event", NewEventData, {});
      if (response.status === 200) {
        return router.push("/admin")
     }
    }catch (err) {
      console.log(err)
    }
  }

  const saveEventFromDraft = async (id:string) =>{

    setSaevNewEventReqestStatus('Production')


    const isValidData = EventFromDraftZVS.safeParse({   
         info: infoFileds,   
         tickets,
         settings,
         _id:id,
         public_id: PayPalInfo.clientId
     })

     if (!isValidData.success || !ValidateUserPaymentInfo().success ){
          setSaevNewEventReqestStatus('Production')
         // make llist of errs and payments errs
           alert("  אנא הזן  את כול הפרטים המסומנים ב ❌")
         return 

    }     
    const  CreateEventFromDraftData :EventFromDraftType  = isValidData.data

     try{ 
      const response = await axios.post("/api/admin/live-events/new-event-from-draft", CreateEventFromDraftData, {});
       return response
      }
     catch (err){  
      alert(err)
      return
     }
     finally { 
      return  router.push("/admin")
      }

     
  
  }

  const QuickAction =( DraftId? :string )=>{   
    return [
     {
      icon: <RiDraftFill size={"2em"} />,
      name: DraftId ?  'עדכן טיוטה ' : "שמור טיוטה ",
      ClickHendler: (e: React.MouseEvent<HTMLDivElement>) =>{
        DraftId
          ? updateDraft(DraftId)
          : saveDraft()
      }
    },
    {
      icon: <MdPublic size={"2.5em"} />,
      name:   DraftId ?  " פרסם טיוטה" :  'פרסם ',
      ClickHendler: (e: React.MouseEvent<HTMLDivElement>) =>  {  
        DraftId? 
        saveEventFromDraft(DraftId):
        saveEvent()
      }
    },
  ]
}


  if (isLoading) {
    return <LoadingScreen text={loadingScrenText} />
  }
  return (
    <TabsEroorsContext.Provider value={{ GetFormErrors }}>
    <TabsPageContext.Provider value={{ tabValue, setTabValue, isLoading, setIsLoading, SaevNewEventReqestStatus, setSaevNewEventReqestStatus, loadingScrenText, setLoadingScrenText }}>
    <TabInfoContext.Provider value={{ infoFileds, setInfoFileds }}>
    <TabsTicketsContext.Provider value={{ tickets, setTickets }} >
    <TabsEventSettingsContext.Provider value={{ settings, setSetting }} >
        <TabsWraper DraftId={DraftId} />
        {
          infoFileds.Theater &&
        <AdminTransformContext.Provider value={{ AdminMapPositions, setAdminMapPositions }}>
        <MultiSelectContext.Provider value={{ multiTipPositions, setMutiTipPositions, resetMultiTip, multiTipInfo, setMultiTipInfo, resetErr }} >
        <SingleTipContext.Provider value={{ singleTipPositions, setSingleTipPositions, seatTipInfo, setSeatTipInfo, resetSingleTip }}>
            <TheaterComponent TheaterDate={infoFileds.Theater} />
        </SingleTipContext.Provider>
        </MultiSelectContext.Provider>
        </AdminTransformContext.Provider>
        }
        <SpeedDialWrap
          actions={QuickAction(DraftId)}
          mainIcon={<SlOptions size={"2em"} />}
          openToolTip
          openToolTipPlacement="right"
          direction={"up"}
          positions={!sm ? { bottom: 0, left: 0 } : { bottom: 16, left: 10 }}
         />
    </TabsEventSettingsContext.Provider>
     </TabsTicketsContext.Provider>
    </TabInfoContext.Provider>
    </TabsPageContext.Provider>
    </TabsEroorsContext.Provider>
  )
}

export const DraftForm = () => { }

export default NewEventFormWraper



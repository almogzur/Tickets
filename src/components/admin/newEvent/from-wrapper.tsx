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
  infoFieldsType,
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
  TheaterMultiTipInfoType,
  TheaterTipInfoType
} from "../../../types/components-types/admin/theater/admin-theater-types";

// Import Contexts
import TabsTicketsContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import AdminTransformContext from '@/context/admin/new-event/map/admin-map-positions-context';
import TabsPageContext from '@/context/admin/new-event/tabs/tabs-page-context';
import TabsErrorsContext from '@/context/admin/new-event/tabs/tabs-errors-context';
import TabsEventSettingsContext from '@/context/admin/new-event/tabs/tabs-event-settings-context';
import WidthContext from "@/context/WidthContext";

// Import Hooks
import { useAdminDrafts } from "@/hooks/admin/use-admin-drafts";

// Import Icons
import { SlOptions, SlOptionsVertical } from "react-icons/sl";
import { MdPublic } from "react-icons/md";
import { RiDraftFill } from "react-icons/ri";
import { UserPayPalInfoType, PayPalInfoZVS, IsracardZVS, UserIsracardInfoType, } from "@/types/pages-types/admin/user-billing-info-types";
import { RequestStatusType } from "@/types/pages-types/client/client-event-type";
import { useAdminIsracardBillingInfo } from "@/hooks/admin/use-admin-isracard-billing-info";
import { Session } from "next-auth/core/types";
import { useAdminPaypalBillingInfo } from "@/hooks/admin/use-admin-paypal-billing-info";

// Dynamic Component Imports (Lazy Loading)
const TabsWrap = dynamic(() => import("@/components/admin/newEvent/tabs/tabs-wrap"), { ssr: false });
const TheaterComponent = dynamic(() => import("@/components/admin/newEvent/theater/theater"), { ssr: false });
const SpeedDialWrap = dynamic(() => import("@/mui-components/speed-dial-wrap"), { ssr: false });
const LoadingScreen = dynamic(() => import('@/mui-components/loading'), { ssr: false });

type NewEventFormWrapperProps = {
  Draft?: NewDraftType
  DraftId?: string
}

const NewEventFormWrap = ({ Draft, DraftId }: NewEventFormWrapperProps) => {

  const { data: session, status, update } = useSession()

  const { UserDBPayPalInfo } = useAdminPaypalBillingInfo(session)

  const { UserDBIsracardInfo } = useAdminIsracardBillingInfo(session)

  useEffect(() => {
    if (Draft) {
      const { settings, tickets, info } = Draft
      setInfoFields(info)
      setSetting(settings)
      if (tickets) { setTickets(tickets) }
    }
  }, [Draft])


  // For DB Data 
  const [infoFields, setInfoFields] = useState<infoFieldsType>({
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
    limitClientTicket: true, // true is disabled false enabled
    ticketLimit: '5', // mum start at 0 array form()
    canSelectNotRelatedSites: true,
  })

  // useEffect(()=>{
  // console.log(eventSetting,"form   wrapper snapshot  ")},[eventSetting])

  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)
  const router = useRouter()
  const theme = useTheme()
  const [tabValue, setTabValue] = useState(0);
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [loadingScreenText, setLoadingScreenText] = useState<string | undefined>(undefined)
  const [saveNewEventRequestStatus, setSaveNewEventRequestStatus] = useState<RequestStatusType>(undefined)

  // Theater State 
  const [singleTipPositions, setSingleTipPositions] = useState<Positions>({ x: 0, y: 0, Scale: 0, disabled: false })
  const [multiTipPositions, setMutiTipPositions] = useState<Positions>({ x: 0, y: 0 })
  const [AdminMapPositions, setAdminMapPositions] = useState<Positions>({ x: 0, y: 0, Scale: 0, disabled: false })
  const [seatTipInfo, setSeatTipInfo] = useState<TheaterTipInfoType>({ initValue: 0, row: "", seatNumber: 0 })
  const resetSingleTip = (): void => { setSingleTipPositions({ x: 0, y: 0 }); setSeatTipInfo({ initValue: 0, row: "", seatNumber: 0 }) }
  const [multiTipInfo, setMultiTipInfo] = useState<TheaterMultiTipInfoType>({ first: undefined, second: undefined, totalSelected: 0, row: "", err: "", seatNumber: undefined, selectDir: undefined })
  const resetMultiTip = (): void => { setMutiTipPositions({ x: 0, y: 0 }); setMultiTipInfo(p => ({ first: undefined, second: undefined, totalSelected: 0, row: "", err: "", seatNumber: undefined, selectDir: undefined })) }
  const resetErr = (): void => { setMultiTipInfo(p => ({ ...p, err: "" })) }

  // create  errors for form inputs  
  const GetFormErrors = (filed: string) => {

    const DraftIssues = NewDraftZVS.safeParse({ info: infoFields, tickets, settings }).error?.issues
    const EventIssues = NewEventZVS.safeParse({ info: infoFields, tickets, settings }).error?.issues // spreading both to create 1 continues object 

    const issues =
      saveNewEventRequestStatus === 'Temp'
        ? DraftIssues?.find(item => item.path?.[1] === filed)
        :
        saveNewEventRequestStatus === 'Production'
          ? EventIssues?.find(item => item.path?.[1] === filed)
          :
          undefined;

    const filedIssue = issues?.message

    //issues?.find((issue)=>issue.path[1] === filed)

    return filedIssue
  }

  type ValidateUserPaymentInfoReturnType<T> = {
    success: boolean,
    errors?: z.ZodError<T>
    data?: z.SafeParseSuccess<T>['data']
  }

  const ValidateIsracardInfo = (): ValidateUserPaymentInfoReturnType<UserIsracardInfoType> => {

    const validateIsracard = IsracardZVS.safeParse(UserDBIsracardInfo);

    if (validateIsracard.success) {
      return { success: true, errors: undefined, data: validateIsracard.data };
    } else {
      console.log("ValidateIsracardInfo" ,validateIsracard.error.issues)

      return { success: false, errors: validateIsracard.error };
    }
  }
  const ValidatePayPalInfo = (): ValidateUserPaymentInfoReturnType<UserPayPalInfoType> => {

    const validatePaypal = PayPalInfoZVS.safeParse(UserDBPayPalInfo);

    if (validatePaypal.success) {
      return { success: true, data: validatePaypal.data };
    } else {
      console.log("ValidatePayPalInfo" ,validatePaypal.error.issues)
      return { success: false, errors: validatePaypal.error };
    }

  }



 //Drafts 

  const saveDraft = async (): Promise<void> => {

    setSaveNewEventRequestStatus('Temp')

    const isValidData = NewDraftZVS.safeParse({ info: infoFields, tickets, settings }); //validate form on click 

    if (!isValidData.success) {
      // make list of errs and payments errs
      alert("  אנא הזן  את כול הפרטים המסומנים ב ❌")
      return
    }

    try {
      if (isValidData.success) {
        setIsLoading(true)
        setLoadingScreenText("שומר")

        const ReqData: NewDraftType = isValidData.data

        try {
          const response = await axios.post("/api/admin/drafts/new-draft", ReqData, {});

          if (response.status === 200) {
            router.push("/admin")
          }

        }
        catch (err) {
          console.log(err)
        }




      }
      else {
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
      setSaveNewEventRequestStatus('Temp')
    }
  };

  const updateDraft = async (EventId: string) => {
    //   setIsLoading(true)
    setLoadingScreenText("מעדכן")

    const isValidData = UpdateDraftZVS.safeParse({ info: infoFields, tickets, settings, _id: EventId })

    if (!isValidData.success) {
      console.log(" No Validation ", "updateDraft", isValidData.error.issues)
      return
    }
    const ReqData: UpdateDraftType = isValidData.data

    try {
      const response = await axios.post("/api/admin/drafts/update-draft", ReqData);
      if (response.status === 200) {

      }
    }
    catch (err) {
      console.log("Update_`Draft", err);

    }
    finally {
      router.push("/admin")
      setIsLoading(false)
      setSaveNewEventRequestStatus('Production')
    }



  }





// Event 

  const saveEvent = async () => {

    setSaveNewEventRequestStatus('Production')

    if( ! ValidateIsracardInfo().success && ! ValidatePayPalInfo().success ) {
      return alert(" 🏦 אנא הזן  פרטי חשבון להעברת כספים  ")
    }

    if( ValidatePayPalInfo().success ) {

      const isValidData = NewEventZVS.safeParse({
        info: infoFields,
        tickets,
        settings,
        public_id: UserDBPayPalInfo.clientId
      })
      
      try {
        const response = await axios.post("/api/admin/live-events/new-event-from-draft", isValidData.data);
        return response
      }
      catch (err) {
        alert(err)
        return
      }
      finally {
        return router.push("/admin")
        
      }


    }

    const isValidData = NewEventZVS.safeParse({
      info: infoFields,
      tickets,
      settings,
    })

    if(!isValidData.success){
      return   alert("אנא הזן  את כול הפרטים המסומנים ב ❌ ")
    }

    // setIsLoading(true)
    const NewEventData: NewEventType = isValidData.data

    try {
      const response = await axios.post("/api/admin/live-events/new-event", NewEventData);
      if (response.status === 200) {
        return router.push("/admin")
      }
    } catch (err) {
      console.log(err)
    }
  }


  const saveEventFromDraft = async (id: string) => {

    setSaveNewEventRequestStatus('Production')

    if ( ! ValidateIsracardInfo().success && !ValidatePayPalInfo().success) {
      return alert(" 🏦 אנא הזן  פרטי חשבון להעברת כספים  ")
    }
    
    if (ValidatePayPalInfo().success) {

      const isValidData = EventFromDraftZVS.safeParse({
        info: infoFields,
        tickets,
        settings,
        _id: id,
        public_id: UserDBPayPalInfo.clientId
      })

      if (!isValidData.success) {

        setSaveNewEventRequestStatus('Production')

        // make list of errs and payments errs
        alert("  אנא הזן  את כול הפרטים המסומנים ב ❌" + JSON.stringify(isValidData.error.issues))

        return

      }

      try {
        const response = await axios.post("/api/admin/live-events/new-event-from-draft", isValidData.data);
        return response
      }
      catch (err) {
        alert(err)
        return
      }
      finally {
        return router.push("/admin")
      }


    }


      const isValidData = EventFromDraftZVS.safeParse(
        {
          info: infoFields,
          tickets,
          settings,
          _id: id,
        }
      )
  
      try {
        const response = await axios.post("/api/admin/live-events/new-event-from-draft", isValidData.data, {});
        return response
      }
      catch (err) {
        alert(err)
        return
      }
      finally {
        return router.push("/admin")
      }
    }

  







  const QuickAction = (DraftId?: string) => {
    return [
      {
        icon: <RiDraftFill size={"2em"} />,
        name: DraftId ? 'עדכן טיוטה ' : "שמור טיוטה ",
        ClickHandler: (e: React.MouseEvent<HTMLDivElement>) => {
          DraftId
            ? updateDraft(DraftId)
            : saveDraft()
        }
      },
      {
        icon: <MdPublic size={"2.5em"} />,
        name: DraftId ? " פרסם טיוטה" : 'פרסם ',
        ClickHandler: (e: React.MouseEvent<HTMLDivElement>) => {
          DraftId ?
            saveEventFromDraft(DraftId) :
            saveEvent()
        }
      },
    ]
  }


  if (isLoading) {
    return <LoadingScreen text={loadingScreenText} />
  }

  return (
    <TabsErrorsContext.Provider value={{ GetFormErrors }}>
      <TabsPageContext.Provider value={{ tabValue, setTabValue, isLoading, setIsLoading, saveNewEventRequestStatus, loadingScreenText, setLoadingScreenText , setSaveNewEventRequestStatus }}>
        <TabInfoContext.Provider value={{ infoFields, setInfoFields }}>
          <TabsTicketsContext.Provider value={{ tickets, setTickets }} >
            <TabsEventSettingsContext.Provider value={{ settings, setSetting }} >
              <TabsWrap DraftId={DraftId} />
              {
                infoFields.Theater &&
                <AdminTransformContext.Provider value={{ AdminMapPositions, setAdminMapPositions }}>
                  <MultiSelectContext.Provider value={{ multiTipPositions, setMutiTipPositions, resetMultiTip, multiTipInfo, setMultiTipInfo, resetErr }} >
                    <SingleTipContext.Provider value={{ singleTipPositions, setSingleTipPositions, seatTipInfo, setSeatTipInfo, resetSingleTip }}>
                      <TheaterComponent TheaterDate={infoFields.Theater} />
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
    </TabsErrorsContext.Provider>
  )
}


export default NewEventFormWrap




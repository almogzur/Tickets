
// React | Next
import { useSession } from 'next-auth/react'
import { ChangeEvent, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'

//Types
import { Schedule, TheaterType, Ticket } from '@/pages/_app'
import dayjs from 'dayjs'

//components
import Head from 'next/head'
import {Typography  , Stack as Flex,  useTheme, Button} from '@mui/material'
import AdminLayout from '@/Layouts/admin-layout'
import InfoForm from '@/components/admin/newEvent/info-form'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import TabsForm from '@/components/admin/newEvent/tabs/tabs-form'
import Theater from '@/components/admin/newEvent/theater/theater'

//WraperContex
import TabsEventDatesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context'
import TabsTickets from '@/context/admin/new-event/tabs/tabs-tikits-context'



const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()

  //Theater 
  const [theater,setTheater] = useState<TheaterType>({mainSeats:null,sideSeats:null,styles:null,testsStyle:null,ThaeaterName:""})
  //const resetTheater= ()=>{ setMainSeatsState({...mainSeats}) ; setSideSeatsState({...sideSeats}) }

  // Info
  const [info,setInfo]=useState({name:"",loction:"",cat:""})
  const InfoHndler =  (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const name = e.target.name 
    const value = e.target.value
    setInfo(prve=>({...prve,[name]:value}))
  }

  // Schedules Coontext State
  const [schedule, setSchedule] = useState<Schedule>({day:null,hour:null,closingSealesDate:null,isEventClosedForSeal:null})
  const [dateEroor,setDateEroor ]= useState(false)

  const addScheduleDate = (e:dayjs.Dayjs,context:PickerChangeHandlerContext<DateTimeValidationError>) :void => {

       if (e && e.year() && e.month() && e.day() ) {
          const newDate = new Date(e.year() , e.month() ,e.day()) 
          setSchedule(p=>({...p,day:newDate }))
             
         }
       //  error henler
  };
  const removeScheduleDate = (schedulArg: Schedule ):void => {
      setSchedule(p=>({...p,day:null , hour:null}))

  };
  const addScheduleHour = (e: dayjs.Dayjs,schedule:Schedule, ): void => {
    

    if (e && e.hour() || e.hour() && e.minute()) {
      const day = schedule.day.getDay()
      const month = schedule.day.getMonth()
      const year = schedule.day.getFullYear()

      const newTime = new Date(year,month,day,e.hour(), e.minute())
        setSchedule(p=>({...p,hour:newTime}))

      
    }
  };
  const removeScheduleHour = ():void=>{
    
      setSchedule(p=>({...p,hour:null}))
  

  }
  const setEndOfDate= (e:dayjs.Dayjs,schedule:Schedule) :void =>{
      
    if (e && e.hour() || (e.hour() && e.minute())) {

      const day = schedule.day.getDay() + 1 // see : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date/getDay
      const month = schedule.day.getMonth()
      const year = schedule.day.getFullYear()

      const newDate = new Date(year,month,day,e.hour(),e.minute())
      setSchedule(p=>({...p,closingSealesDate:newDate}))
      console.log(newDate);
      
    } 

  }
  const removeEndOdDate = ()=>{
     setSchedule(p=>({...p,closingSealesDate:null}))
  }
  
  //Tickets
  const [tickets, setTickets] =useState<Ticket[]>([])
  const updateTicketsPrice =():void=>{}
  const updateTicketslabel =():void=>{}
  const updateTickitDiscription=():void=>{}

  // Cover 
  const [file, setFile] = useState<File>(null);
  const [preview ,setPreview] = useState<string>("")
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        console.log(e.target.files);
        

      const selectedFile :File = e.target.files[0];


      if (selectedFile) {
        setFile (selectedFile)
        setPreview(URL.createObjectURL(e.target.files[0]));

      }
    };

  // Seats Amount 
  const [totalSeats ,setTotalSeats]= useState<number>(0)

  // Ad Text 
  const [adText,setAdText ]= useState()




   
  // Tikit Settings 


  // Color Theams
 

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
       <InfoForm InfoKeys={info} KysHndler={InfoHndler} TheaterHndler={setTheater} />

       { theater.mainSeats && <Theater theater={theater} setTheater={setTheater} />}


        {/* TavsFormNexted */}
         <TabsTickets.Provider  value={{tickets ,setTickets,updateTicketsPrice,updateTicketslabel,updateTickitDiscription,}} >
         <TabsEventDatesContext.Provider value={{schedule,setSchedule,dateEroor,addScheduleDate,removeScheduleDate,addScheduleHour,removeScheduleHour,setEndOfDate,removeEndOdDate}}>
        
       <TabsForm 
        // file 
         file={file} 
         setFile={setFile}
         preview={preview} 
         setPreview={setPreview} 
         onFileChange={handleFileChange} 

        //Setings
        //Colors
          />
         </TabsEventDatesContext.Provider>
         </TabsTickets.Provider>
          {/* TabsForm Nexted */}
      <Flex p={4} alignItems={"center"}  >
        <Button   sx={{height:50 ,width:100,background:"black"}} > שמור </Button>
      </Flex>
      </form>

     </AdminLayout>
    </>
) 
}

export default NewEventPage














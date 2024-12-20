
// React | Next
import { useSession } from 'next-auth/react'
import { ChangeEvent, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'

//Types
import { FullDateOptions, InfoFormType, Schedule, TheaterType, Ticket } from '@/pages/_app'
import dayjs from 'dayjs'

//components
import Head from 'next/head'
import {Typography  , Stack as Flex,  useTheme, Button} from '@mui/material'
import AdminLayout from '@/Layouts/admin-layout'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import TabsForm from '@/components/admin/newEvent/tabs/tabs-form'
import Theater from '@/components/admin/newEvent/theater/theater'

//WraperContex
import TabsEventDatesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context'
import TabsTickets from '@/context/admin/new-event/tabs/tabs-ticket-context'
import InfoTabContext from '@/context/admin/new-event/tabs/tabs-info-context'


const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const theme = useTheme()

  //Theater 
  //const [theater,setTheater] = useState<TheaterType>({mainSeats:null,sideSeats:null,styles:null,testsStyle:null,ThaeaterName:""})
  //const resetTheater= ()=>{ setMainSeatsState({...mainSeats}) ; setSideSeatsState({...sideSeats}) }

  // Info
// setter function in Component
  const [infoFileds,setInfoFileds]=useState<InfoFormType>({
     keys:{name:"",location:"",cat:""} ,
     theater:{mainSeats:{},sideSeats:{},styles:{},testsStyle:{},ThaeaterName:""}
    })

  // Schedules Coontext State
  const [schedule, setSchedule] = useState<Schedule>({day:undefined,closingSealesDate:new Date(),isEventClosedForSeal:false})
  const [dateEroor,setDateEroor ]= useState(false)

  const addScheduleDate = (e:dayjs.Dayjs) :void => {

       if (e && e.year() && e.month() && e.date() && e.day()  ,e.hour(), e.minute() ) {
         // set the time in utc  -3 form area time , 
          const newDate = new Date(e.toDate())
          setSchedule(p=>({...p,day:newDate }))
             
         }
       //  error henler
  };
  const removeScheduleDate = (schedulArg: Schedule ):void => {
      setSchedule(p=>({...p,day:undefined ,closingSealesDate:undefined}))

  };
  const setEndOfDate= (e:dayjs.Dayjs,schedule:Schedule) :void =>{
      
    if (e && e.year() && e.month() && e.date() && e.day()  ,e.hour(), e.minute()) {
      const newDate = new Date(e.toDate())
      setSchedule(p=>({...p,closingSealesDate:newDate}))
      console.log(newDate);
      
    } 

  }
  const removeEndOdDate = ()=>{
     setSchedule(p=>({...p,closingSealesDate:undefined}))
  }
  
  //Tickets
  const [tickets, setTickets] =useState<Ticket[]>([])

  const updateTicket=(  key: "price"|"type"|"discription"|"discoundInfo" , value:string|number ):void=>{

      setTickets(p=>({...p,[key]:value}))
  }
  const updteTicketsArray= (ticket:Ticket, Action:"add"|"remove"):void=>{
    
     if(Action==="add"){setTickets(p=>([...p,ticket]))}
     else if (Action === "remove"){
          setTickets(p=>([...p].filter((item)=> item !== ticket)))
     }

  }
 
  // Cover 
  const [file, setFile] = useState<File>();
  const [preview ,setPreview] = useState<string>("")
  // romve function in cover upload component 
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {

      const selectedFile  = e.target.files !== null  ?  e.target.files[0] :null


        if (selectedFile) {
          
        setFile (selectedFile)
        setPreview(URL.createObjectURL(selectedFile));

      
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
         <InfoTabContext.Provider value={{infoFileds,setInfoFileds}}>
         <TabsTickets.Provider  value={{tickets ,setTickets,updateTicket,updteTicketsArray}} >
         <TabsEventDatesContext.Provider value={{schedule,setSchedule,dateEroor,addScheduleDate,removeScheduleDate,setEndOfDate,removeEndOdDate}}>
        
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
          {  infoFileds.theater ? infoFileds.theater.mainSeats && <Theater  /> :null }
         </TabsEventDatesContext.Provider>
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














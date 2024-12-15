import { useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, Key, MouseEventHandler, SetStateAction, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel, Button} from '@mui/material'

import WidthContext from '@/context/WidthContext'
import Theater from '@/components/admin/newEvent/theater/theater'
import TabsForm from '@/components/admin/newEvent/tabs/tabs-form'
import { Seats, SeatStyles } from '@/constants/models/Events'
import Head from 'next/head'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import { Schedule, TheaterType } from '@/pages/_app'
import InfoForm from '@/components/admin/newEvent/info-form'
import { grey } from '@mui/material/colors'
import TabsEventDatesContext from '@/context/tabs-event-dates-context'
import { time } from 'console'
import dayjs from 'dayjs'




const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
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


  // Dates  Coontext 

  const [schedules, setSchedules] = useState<Schedule[]>([])
  const [dateEroor,setDateEroor ]= useState(false)

  const addEventDate = (e:dayjs.Dayjs,context:PickerChangeHandlerContext<DateTimeValidationError>) :void => {


         if (e && e.year() && e.month() && e.day() ) {
          const newDate = new Date(e.year() , e.month() ,e.day()) 
          setSchedules(p=>[...p , {date:newDate ,hours:[],isEventClosedForSeal:false}])
             
         }
       //  error henler
  };

  const removeDate = (schedulArg: Schedule ):void => {
    setSchedules((prev) => [...prev].filter((schedul) => schedul !== schedulArg)  )  

  };


  const addEventHour = (e: dayjs.Dayjs,schedul:Schedule,  schedulIndex: number): void => {
    

    if (e && (e.hour() || (e.hour() && e.minute()))) {
      const newTime = new Date(0, 0, 0, e.hour(), e.minute()).toLocaleTimeString("he-IL");
      setSchedules((prev) =>
        prev.map((schedule, index) =>
          index === schedulIndex
            ? ({
                ...schedule,
                hours: schedule.hours.hasOwnProperty(newTime)// Check for duplicates
                  ? schedul.hours// Keep the existing hours if duplicate
                  : [...schedule.hours, { time: newTime, endOfSales: null }], // Add with `endOfSales` as null (or a valid Date object)
              })
            : schedule // Return other schedules unchanged
        )
      );

      console.log(schedules);
      
    }
  };


  const removeEventHour = (hourIndex:number,schedulIndex:number):void=>{

    console.log(hourIndex,schedulIndex);
    
      setSchedules(prev=>
        prev.map((schedule, index) =>
          index === schedulIndex ?
        ({
          ...schedule,
           hours:[...schedule.hours].filter((item,i)=> i !== hourIndex )
        })
        :
        schedule
    )
  )
      


  }



  //Price
  const [Prices, setPrices] =useState({normal:"",discount:"", })
  const PricesHndler =  (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const name = e.target.name 
    const value = e.target.value
    const isValidPirce = tryTransformToNumber(value)

    function tryTransformToNumber(valuearg: string) {
      const number = Number(valuearg);
      return isNaN(number) ? "" : number; 
  }
    if(!isValidPirce){
      setDateEroor(true) 
    }
    
    setPrices(prev=>({...prev,[name]:tryTransformToNumber(value)}))  
  }
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

      <Typography  variant='h4' m={1} textAlign={"start"} sx={{color:"black"  } } > אירוע חדש</Typography>

       <InfoForm InfoKeys={info} KysHndler={InfoHndler} TheaterHndler={setTheater} />
       { theater.mainSeats && <Theater theater={theater} setTheater={setTheater} />}

       <TabsEventDatesContext.Provider value={{schedules,setSchedules,dateEroor,addEventDate,removeDate,addEventHour,removeEventHour}}>
        
       <TabsForm 
       // Tikit
         normal={Prices.normal}
        dicount={Prices.discount}
        PriceHndler={PricesHndler}

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
      
      <Flex p={4} alignItems={"center"}  >
        <Button sx={{height:70 ,width:100}} > שמור </Button>
      </Flex>

     </AdminLayout>
    </>
) 
}

export default NewEventPage














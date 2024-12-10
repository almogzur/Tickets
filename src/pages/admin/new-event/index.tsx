import { useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, Key, SetStateAction, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel} from '@mui/material'
import  Eilat_1 from '../../../constants/theathers/eilat_1'
import  Eilat_2 from '@/constants/theathers/eilat_2'
import WidthContext from '@/context/WidthContext'
import DatesList from '@/components/admin/newEvent/date-list'
import TheaterControls from '@/components/admin/newEvent/theater-controls'
import TikitForm from '@/components/admin/newEvent/tikit-form-form'
import { Seats, SeatStyles } from '@/constants/models/Events'
import Head from 'next/head'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import { TheaterType } from '@/pages/_app'
import InfoForm from '@/components/admin/newEvent/info-form'
import TheaterSelect from '@/components/admin/newEvent/theater-select'


const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()

  //Theater 
  const TheaterList :TheaterType[] = [ Eilat_1, Eilat_2]
  const [theater,setTheater] = useState<TheaterType>({mainSeats:null,sideSeats:null,styles:null,testsStyle:null,ThaeaterName:""})
  //const resetTheater= ()=>{ setMainSeatsState({...mainSeats}) ; setSideSeatsState({...sideSeats}) }

  // Info
  const [info,setInfo]=useState({name:"",loction:"",cat:"",tag:""})
  const InfoHndler =  (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>)=>{
    const name = e.target.name 
    const value = e.target.value
    setInfo(prve=>({...prve,[name]:value}))
  }
  // Dates 
  const [Dates, setDates] = useState<Date[]>([])
  const [dateEroor,setDateEroor ]= useState(false)
  const addDate = (e:any,context:PickerChangeHandlerContext<DateTimeValidationError>) :void => {
    // console.log(e , context);
        const newDate = new Date(e.$y , e.$M ,e.$D,e.$H , e.$m) 

         if (e && e.$y && e.$M && e.$D && e.$H && e.$m ) {
             setDates((prev) => prev.indexOf(newDate) ?  [...prev, newDate ] :null);
             
         }
       //  error henler
    };
  const removeDate = (dateToRemove: Date):void => {
      setDates((prev) => prev.filter((date) => date !== dateToRemove));
    };

  //Price
  const [Prices, setPrices] =useState({normalPrice:"",discountPricel:""})
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
  // ad Text 
  const [adText,setAdText ]= useState()

 

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
      <Typography variant='h3' textAlign={"center"} color='primary' > אירוע חדש</Typography>
     
       <InfoForm InfoKeys={info} Hndler={InfoHndler} />
       <DatesList Dates={Dates} addDataHndler={ addDate } removeDateHndler={ removeDate} />
      {Dates.length && <TikitForm normalPrice={Prices.normalPrice} dicountPrice={Prices.discountPricel} PriceHndler={PricesHndler} Dates={Dates}  />}
       <TheaterSelect theaters={TheaterList} seter={setTheater} />
       { theater.mainSeats && <TheaterControls theater={theater} setTheater={setTheater} />}
      

     </AdminLayout>
    </>
) 
}

export default NewEventPage









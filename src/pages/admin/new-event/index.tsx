import { useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, Dispatch, FormEvent, Key, SetStateAction, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel, Button} from '@mui/material'

import WidthContext from '@/context/WidthContext'
import Theater from '@/components/admin/newEvent/theater/theater'
import TabsForm from '@/components/admin/newEvent/tabs/tabs-form'
import { Seats, SeatStyles } from '@/constants/models/Events'
import Head from 'next/head'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import { TheaterType } from '@/pages/_app'
import InfoForm from '@/components/admin/newEvent/info-form'
import { grey } from '@mui/material/colors'

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
  // Ad Text 
  const [adText,setAdText ]= useState()
  // Seats Amount 
  const [totalSeats ,setTotalSeats]= useState<number>(0)
   
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

       <TabsForm 
       // Price
        normalPrice={Prices.normalPrice}
        dicountPrice={Prices.discountPricel}
        PriceHndler={PricesHndler}
        // Dates
        Dates={Dates} 
        addDataHndler={addDate } 
        removeDateHndler={ removeDate}
        file={file} 
        setFile={setFile}
         preview={preview} 
         setPreview={setPreview} 
         onFileChange={handleFileChange} 


        //Setings
        //Colors
          />
 
      

  

      <Flex p={4} alignItems={"center"}  >
        <Button sx={{height:70 ,width:100}} > שמור </Button>
      </Flex>

     </AdminLayout>
    </>
) 
}

export default NewEventPage














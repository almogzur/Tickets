import { useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, FormEvent, Key, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {  Typography , OutlinedInput , Stack as Flex, TextField, Select , MenuItem, InputLabel, SelectChangeEvent, Box, FormControl, Theme, useTheme} from '@mui/material'

import { mainSeats ,sideSeats ,sideSeateTextStyles ,sideSeatsStyles } from '../../../constants/theathers/eilat_1'
import OutLineInputWrap from '@/components/admin/input-wrap'

import WidthContext from '@/context/WidthContext'
import Editor from '@/components/text-editor/editor'
import DatesList from '@/components/admin/date-list'
import SeatsControl from '@/components/admin/SeatsControl'
import PicerForm from '@/components/admin/price-form'

import { Seats } from '@/constants/models/Events'
import Head from 'next/head'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()



  // Theater 
  const [mainSeatsState, setMainSeatsState]= useState<Seats>({...mainSeats})
  const [sideSeatsState , setSideSeatsState] = useState<Seats>({...sideSeats})

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
     
       <InfoForm InfoKeys={info} Hndler={InfoHndler}/>
       <DatesList Dates={Dates} addDataHndler={ addDate } removeDateHndler={ removeDate} />
       <PicerForm normalPrice={Prices.normalPrice} dicountPrice={Prices.discountPricel} PriceHndler={PricesHndler}  />

       <TheaterSelect />
       
       <SeatsControl  
            mainSeats={mainSeatsState} 
            sideSeats={sideSeatsState} 
            sideSeateTextStyles={sideSeateTextStyles} 
            sideSeatsStyles={sideSeatsStyles}
            setMainSeatsState={setMainSeatsState}
            setSideSeatsState={setSideSeatsState}
             />
    </AdminLayout>
    </>
) 
}

export default NewEventPage



interface InfoFormType { InfoKeys:{name:string,loction:string,cat:string,tag:string ,  } ,Hndler : ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>}

const InfoForm =({InfoKeys,Hndler}:InfoFormType)=>{

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()

   return(
    <Flex direction={ md? "row" :'column'} gap={2}   justifyContent={"center"} alignItems={'baseline'} boxShadow={` 3px 3px 3px 2px ${theme.palette.primary.main}`}  >

    <Flex width={md? '40%':"100%"} > 
      {Object.entries(InfoKeys).map(([name,value],i)=>{

          let Locolize = (name: Key)  =>{

            let LocLabel = ""
            

             switch(name){
              case "name": LocLabel += "שם";
              break;
              case "loction": LocLabel += "מיקום";
              break;
              case "cat": LocLabel += "קטגוריה";
              break;
              case "tag": LocLabel += "תגית";
              break;
              default : LocLabel += name
            }

            return LocLabel
          }
        
          return <OutLineInputWrap key={name} stateName={name} label={Locolize(name)} value={value} onChangeHndler={Hndler } />

      })}
   </Flex>

    <Flex width={ md? "60%": "100%"} >
      <Editor/>
    </Flex>


</Flex>   

   )

}



const TheaterSelect =({})=> { 

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
      <>
       <Typography variant='h3' textAlign={"center"} color='primary' >סימון מושבים</Typography> 
       <FormControl  sx={{  minWidth:200 }} >

      <Select
          displayEmpty
          value={""}
          input={<OutlinedInput />}
     
        >
          <MenuItem disabled value="">
            <em>בחר אולם</em>
          </MenuItem>

        </Select>
       </FormControl>
      </>
  );
}




import { Alert, AlertTitle, Box , Button, Divider, Fade, Stack as Flex , Popover, Typography , useTheme} from "@mui/material"
import { ChangeEventHandler, useContext, useState } from "react"
import InputWrap from "../../input"
import { grey } from "@mui/material/colors"
import WidthContext from "@/context/WidthContext"
import { TheaterType } from "@/pages/_app"


import { GiSettingsKnobs } from "react-icons/gi";
import { MdEventSeat } from "react-icons/md";
import { TbInfoSquareFilled } from "react-icons/tb";

interface TikitsTabPropsType {
    Dates:Date[]
    normal:string
    dicount:string
    PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
     }
 
   const TikitsTab = ({Dates,PriceHndler,normal,dicount}:TikitsTabPropsType)=>{ 
     const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
       const [poporIsOpen ,SetPoperIsOpen] = useState<boolean>(false) 

       const [anchorEl, setAnchorEl] = useState<SVGElement | null>(null);

       const handleClick = (event: React.MouseEvent<SVGElement>) => {
         setAnchorEl(event.currentTarget);
       };
     
       const handleClose = () => {
         setAnchorEl(null);
       };
     
       const open = Boolean(anchorEl);
       const id = open 

  const countTheaterSeatAmount = ( theater: TheaterType ) : number =>{

    const combineSeats  = [theater.mainSeats,theater.sideSeats]

    combineSeats.map((data,i)=>{
       console.log(data);
       
    })

return 0
}

     
 
     return (
       <Flex         
        height={'calc(100% - 80px)'}
        overflow={"auto"} 
        >
        {/* Seats Amount */}
        <Flex direction={"row"} px={2} m={1} gap={1} alignItems={"center"} >
          <MdEventSeat size={!xs? "1.5em":"2em"} color={"black"}  style={{border:"solid" , borderRadius:45, padding:3 }} />
            <Flex>
              <Typography   color="black" fontSize={!xs?17:20} >מספר כרטיסים זמינים למכירה  {100} </Typography >
              <Typography  color="black"   fontSize={!xs?13:15}  >מסיר את המושבים המסומנים כחסומים</Typography>
            </Flex>
        </Flex>
            
        {/*  set price too all in one place  */}
        {  Dates.length >=2 &&
        <Box  >
            <Divider sx={{borderWidth:2}} />

         <Flex px={2} m={1} gap={1} direction={"row"} alignItems={"center"}  >
            <GiSettingsKnobs color="black" size={!xs? "1.5em":"2em"}  style={{border:"solid" , borderRadius:45, padding:4 }}   />
            <Typography  fontSize={!xs?15:20}>   ניתן לקבוע מחיר לכול הכרטיסים ו או לכול כרטיס בנפרד   </Typography>
         </Flex>
         
          <Flex direction={'row'} flexWrap={'wrap'}  gap={!xs? -0 : 1} justifyContent={"center"} p={1}  >
            
            <InputWrap stateName={""} label={"רגיל"}    variant='outlined' helpText="מחיר מלא"   />
            <InputWrap stateName={""} label={"מוזל"} variant='outlined' helpText="מחיר כרטיס מוזל " />
            <InputWrap stateName={""} label={"% הנחת תושב  "} variant='outlined' helpText="הנחת תושב באחוזים %" />

   
         </Flex>
         <Divider sx={{borderWidth:2}} />
        </Box>
         }


        {/*  tikit  */}
        <Box > 
     
        {
         Dates.length ?   Dates.map((date:Date,i:number)=>{
     
            return <Tikit key={date.toString()+i} date={date} />
        })
        :
        <Flex justifyContent={"center"} alignItems={"center"} alignContent={"center"} height={"inherit"}  >
         <Typography variant="h6" sx={{color:"black"}} >בחר תאריך לאירוע </Typography>
        </Flex>
     }           

       </Box>

   
     </Flex>
     )
   }

   export default TikitsTab




  interface TikitPropsType { date:Date}

  const Tikit = ({date}:TikitPropsType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const options :Intl.DateTimeFormatOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    

    const [ Prices, setPrices ] = useState({ normal  : 0 , discount : 0 , citizen : 0  })

    return (   
       <Flex  
         key={date.toString()}  
        justifyContent={"space-around"} 
        m={1} 
    
   
       

       
     >
          <Typography variant="body1" fontWeight={700}  >פרטי כרטיס</Typography>
          <Typography variant="body2" fontWeight={700}  textAlign={"start"}   > לתאריך  : {date.toLocaleDateString("he-IL",options)  } </Typography>
          <Typography fontWeight={700} >שעה: {date.toLocaleTimeString("he-IL") }</Typography>

   

        
          <Flex direction={'row'} flexWrap={'wrap'}  gap={!xs? -0 : 1} justifyContent={"center"} p={1}  >
          <InputWrap  label={' רגיל'} stateName={""}  variant='outlined' helpText="מחיר מלא"  />
          <InputWrap  label={' מוזל'} stateName={""}  variant='outlined'  helpText="מחיר כרטיס מוזל "  />
          <InputWrap  label={' % הנחת תושב' } stateName={""}  variant='outlined' helpText="הנחת תושב באחוזים %" />
         </Flex>

    

       
        <Flex   direction={ 'row'} gap={2} flexWrap={"wrap"} mb={1} >
         <InputWrap  isInputRequired  label={' תאריך סגירת מכירות'} stateName={'discountPricel'}    Fgrow={4}  />
         <InputWrap  label={'  תיאור'}  stateName={'discountPricel'}    Fgrow={12}   />
        </Flex>

        <Divider sx={{borderWidth:3 }} />
      </Flex>
)
  }

import {  CSSProperties, Dispatch, SetStateAction, useContext, useState } from 'react'
import {  Stack as Flex ,  Container, Typography, useTheme, Box, Avatar, } from '@mui/material'
import SingleSelectTip from './singel-select-tip';
import AdminSeatBtn from './adminSeatBtn'
import MuliSelectTip from '@/components/admin/newEvent/theater/multi-select-tip'
import AdminNewEventTheatherMap from './new-event-theather-map';



// Types 

// Context 
import WidthContext from '@/context/WidthContext';
import TabsInfoContest from '@/context/admin/new-event/tabs/tabs-info-context'
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { Seats } from '@/components/theater-gen/types/theater-types';
 
const Theater = ({TheaterDate}:{TheaterDate:TheaterType}) => {

      const {setInfoFileds} = useContext(TabsInfoContest)
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      const theme = useTheme()    
       const [isMultiSelect , setIsMultiSelect]=useState<boolean>(false)
       const [amountOfSeatsSelcted , setAmountOfSeatsSelcted] = useState<number>(0)
       
       const InnerMap = Flex


       const sideSeatsStylesObject =  Object.fromEntries(
        Object.entries<CSSProperties>(TheaterDate.styles ).map(([row, positions]) => [row, positions])
      )
       const sideTextStylesObject =     Object.fromEntries(
        Object.entries<CSSProperties>(TheaterDate.textsStyle).map(([row, positions]) => [row, positions])
      )
       const MainSeatS  =   Object.entries<number[]>(TheaterDate.mainSeats).map(([row, rowContent]) => {
        const colValue  = rowContent.map((seatValue: number, i: number) => {
          const textset = "מושב";
          const textrow = "שורה";
      
          return (
            <AdminSeatBtn // uses Context
                key={`${row}.${i}`}
              seatValue={seatValue}
              seatnumber={i}
              row={row}
                isMultiSelect={isMultiSelect} 
              />
          );
        })
      
        return (
          <Flex 
            key={row}
            justifyContent="center"
            
            direction={'row'}
            sx={{direction:"ltr"}}
            alignItems={'top'}
          >
            <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"black"}}  >{ !xs ? row.slice(5) :  row  }</Typography>
              {colValue}
              <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"black"}}  >{ !xs? row.slice(5) :  row  }</Typography>
            
          </Flex>
        );
      })
       const SideSeats =   Object.entries<number[]>(TheaterDate.sideSeats).map(([row, rowContent])=>{
        const colValue  = rowContent.map((seatValue: number, i: number) => {
         
        
            return (
              <AdminSeatBtn
                key={`${row}.${i}`}
                seatValue={seatValue}
                seatnumber={i}
                row={row}
                isMultiSelect={isMultiSelect} 
              
                  />
            );
          });
        
          return (
            <Flex
    
              key={row}
              style={ sideSeatsStylesObject ? sideSeatsStylesObject[row] : {}} // target by key in CSS
              justifyContent="center"
          
              direction={'row'}
              sx={{direction:"ltr"}}
            >
              {colValue}
            </Flex>
          );
      })
       const Text =  Object.entries(TheaterDate.sideSeats).map(([row, rowContent])=>{
           return <Typography key={row}  color='textPrimary' height={0} style={sideTextStylesObject? sideTextStylesObject[row] :{}} >{row}</Typography>
      })

    return (
      <>  
          <SingleSelectTip 
              theaterDate={  TheaterDate}
               setTheater={setInfoFileds}
           /> 

         <MuliSelectTip 
            isMultiSelect={isMultiSelect}
            theaterDate={TheaterDate}
            setTheater={setInfoFileds}
          />
      
            
         <AdminNewEventTheatherMap // style in children 
           isMultiSelect={isMultiSelect}  
           setIsMultiSelect={setIsMultiSelect}
            multiSelectBadgeInfo={amountOfSeatsSelcted}   
             >
             <InnerMap direction={"column"}    height={!xs? 320 : !sm? 400 : !md? 500 : 700}      sx={{direction:"ltr"}}  >
               <Stage  />
               {MainSeatS}
               {Text}
               {SideSeats}
   
            </InnerMap> 
     
         </AdminNewEventTheatherMap>    
  
 
      </>
      );
  };

  const Stage = ()=>{
const theme = useTheme()

    const Styles :CSSProperties =  {          
        height:40 ,
        margin:20,
         background:"silver",
           color:"red",
           width:"100%",
           borderBottomLeftRadius: "45%",
            borderBottomRightRadius:"45%" ,
            display:'flex',
            flexDirection:'row',
            justifyContent:'center',
            alignItems:'center',
            alignContent:'center',
            }

    return    <Flex direction={'row'}  justifyContent={'center'}> 
                <div style={Styles} > 
                  <Typography variant='h6' color={theme.palette.secondary.main}>במה</Typography> 
               </div>
             </Flex >
    }   
  export default Theater


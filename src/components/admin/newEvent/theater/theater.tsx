import {  CSSProperties, Dispatch, SetStateAction, useContext, useState } from 'react'
import {  Stack as Flex ,  Container, Typography, useTheme, Box, Avatar, } from '@mui/material'
import SingleSelectTip from './single-select-tip';
import AdminSeatBtn from './adminSeatBtn'
import AdminNewEventTheaterMap from './new-event-theater-map';



// Types 

// Context 
import WidthContext from '@/context/WidthContext';
import TabsInfoContest from '@/context/admin/new-event/tabs/tabs-info-context'
import { TheaterType } from '@/types/components-types/admin/theater/admin-theater-types';
import MuliSelectTip from './multi-select-tip';
 
const Theater = ({TheaterDate}:{TheaterDate:TheaterType}) => {

      const {setInfoFields} = useContext(TabsInfoContest)
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      const theme = useTheme()    
       const [isMultiSelect , setIsMultiSelect]=useState<boolean>(false)
       const [amountOfSeatsSelected , setAmountOfSeatsSelected] = useState<number>(0)
       
       const InnerMap = Flex


       const sideSeatsStylesObject =  Object.fromEntries(
        Object.entries<CSSProperties>(TheaterDate.styles ).map(([row, positions]) => [row, positions])
      )
       const sideTextStylesObject =     Object.fromEntries(
        Object.entries<CSSProperties>(TheaterDate.textsStyle).map(([row, positions]) => [row, positions])
      )
       const MainSeatS  =   Object.entries<number[]>(TheaterDate.mainSeats).map(([row, rowContent]) => {
        const colValue  = rowContent.map((seatValue: number, i: number) => {

      
          return (
            <AdminSeatBtn // uses Context
                key={`${row}.${i}`}
              seatValue={seatValue}
              seatNumber={i}
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
                seatNumber={i}
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
               setTheater={setInfoFields}
           /> 

         <MuliSelectTip 
            isMultiSelect={isMultiSelect}
            theaterDate={TheaterDate}
            setTheater={setInfoFields}
          />
      
            
         <AdminNewEventTheaterMap // style in children 
           isMultiSelect={isMultiSelect}  
           setIsMultiSelect={setIsMultiSelect}
            multiSelectBadgeInfo={amountOfSeatsSelected}   
             >
             <InnerMap direction={"column"}    height={!xs? 320 : !sm? 400 : !md? 500 : 700}      sx={{direction:"ltr"}}  >
               <Stage  />
               {MainSeatS}
               {Text}
               {SideSeats}
   
            </InnerMap> 
     
         </AdminNewEventTheaterMap>    
  
 
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


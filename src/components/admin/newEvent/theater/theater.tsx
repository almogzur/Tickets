import {  CSSProperties, Dispatch, SetStateAction, useContext, useState } from 'react'
import { Seats , SeatStyles } from '@/constants/models/Events';
import {  Stack as Flex ,  Container, Typography, useTheme, } from '@mui/material'
import WidthContext from '@/context/WidthContext';
import { Colors } from '@/lib/colors';
import SingleSelectTip from './singel-select-tip';
import AdminSeatBtn from './adminSeatBtn'
import MuliSelectTip from '@/components/admin/newEvent/theater/multi-select-tip'
import AdminNewEventTheatherMap from './new-event-theather-map';
import { TheaterType } from '@/pages/_app';
import AdminMapPositionsContext from '@/context/admin/new-event/map/admin-map-positions-context';





  interface TheaterPropsType { 
     theater: TheaterType ,
     setTheater:Dispatch<SetStateAction<TheaterType>> 
    }

    const Theater = ({theater,setTheater}:TheaterPropsType ) => {
      const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)

      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      const theme = useTheme()
    
    
       const [isMultiSelect , setIsMultiSelect]=useState<boolean>(false)
       const [amountOfSeatsSelcted , setAmountOfSeatsSelcted] = useState<number>(0)


       const sideSeatsStylesObject = theater.styles &&  Object.fromEntries(
        Object.entries(theater.styles ).map(([row, positions]) => [row, positions])
      );
       const sideTextStylesObject = theater.testsStyle &&  Object.fromEntries(
        Object.entries(theater.testsStyle).map(([row, positions]) => [row, positions])
      );
       const MainSeatS  = Object.entries(theater.mainSeats).map(([row, rowContent]) => {
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
        });
      
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
      });
       const SideSeats = theater.sideSeats &&  Object.entries(theater.sideSeats).map(([row, rowContent])=>{
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
              style={sideSeatsStylesObject[row]} // target by key in CSS
              justifyContent="center"
          
              direction={'row'}
              sx={{direction:"ltr"}}
            >
              {colValue}
            </Flex>
          );
      })
       const Text = theater.testsStyle  &&  Object.entries(theater.sideSeats).map(([row, rowContent])=>{
           return <Typography key={row}  color='textPrimary' height={0} style={sideTextStylesObject[row]} >{row}</Typography>
      })

    return (

      <>
       <SingleSelectTip 
         theraer={theater}
         setTheater={setTheater}
         isMultiSelect={isMultiSelect}
           /> 

         <MuliSelectTip 
            isMultiSelect={isMultiSelect}
            theraer={theater}
            setTheater={setTheater}
          /> 

         <AdminNewEventTheatherMap // style in children 
           isMultiSelect={isMultiSelect}  
           setIsMultiSelect={setIsMultiSelect}
            multiSelectBadgeInfo={amountOfSeatsSelcted}   
             >
             <Flex direction={"column"}    height={!xs? 320 : 600}      sx={{direction:"ltr"}}  >
               <Stage  />
               {MainSeatS}
               {Text}
               {SideSeats}
            </Flex>      
         </AdminNewEventTheatherMap>      
 
      </>
      );
  };

  const Stage = ()=>{

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
                  <Typography variant='h6' color={Colors.b}>במה</Typography> 
               </div>
             </Flex >
    }   
  export default Theater


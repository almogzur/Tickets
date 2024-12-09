import {  CSSProperties, SetStateAction, useContext, useState } from 'react'
import { Seats , SeatStyles } from '@/constants/models/Events';
import {  Stack as Flex ,  Container, Typography, useTheme, } from '@mui/material'
import WidthContext from '@/context/WidthContext';
import { Colors } from '@/lib/colors';
import Transporm from './admin-new-event-theather-map'
import SingleSelectTip from './singel-select-tip';
import AdminSeatBtn from '../admin/adminSeatBtn'
import MuliSelectTip from '@/components/admin/multi-select-tip'
import AdminNewEventTheatherMap from './admin-new-event-theather-map';


interface SeatsControlProps  { 
     mainSeats:Seats ,
     sideSeats?:Seats ,
     sideSeatsStyles?:SeatStyles,
     sideSeateTextStyles?:SeatStyles,
     setMainSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
     setSideSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
     }

const SeatsControl = ({mainSeats, sideSeats , sideSeatsStyles , sideSeateTextStyles , setMainSeatsState, setSideSeatsState   }:SeatsControlProps ) => {
    
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
      const theme = useTheme()
    
    /* state for handling Muliti seat  passed to transport component */
       const [isMultiSelect , setIsMultiSelect]=useState<boolean>(false)
       const [amountOfSeatsSelcted , setAmountOfSeatsSelcted] = useState<number>(0)


       const mainHendler = (seatValue: number, seatNumber: number, row: string , updatedValue:number) => {
  
    
        setMainSeatsState( prevMovies => {
             // Find the movie object reference
   
             const updatedMovies = {...prevMovies};
       
              const updatedRow = [...updatedMovies[row]]; // Clone the specific row

             // Skip updates for unavailable or already selected seats
             if (updatedRow[seatNumber] === 1) {
                return prevMovies; // No update
            }

                 // Toggle seat state: 0 to 2 or 2 to 0
        updatedRow[seatNumber] = updatedRow[seatNumber] === 0 ? 2 : 0;

            // Assign the updated row back to the seat details
            updatedMovies[row] = updatedRow;

  // Assign the updated seat details back to the movie


  return updatedMovies; // Return the updated state
           });

                       
     
      
      
      };
       const sideHendler = (seatValue: number, seatNumber: number, row: string) => {
  
    
        setSideSeatsState( prevMovies => {
             // Find the movie object reference
   
             const updatedMovies = {...prevMovies};
       
            const updatedRow = [...updatedMovies[row]]; // Clone the specific row

          // Skip updates for unavailable or already selected seats
            if (updatedRow[seatNumber] === 1) {
                return prevMovies; // No update
            }

                 // Toggle seat state: 0 to 2 or 2 to 0
             updatedRow[seatNumber] = updatedRow[seatNumber] === 0 ? 2 : 0;

             // Assign the updated row back to the seat details
             updatedMovies[row] = updatedRow;

            // Assign the updated seat details back to the movie


            return updatedMovies; // Return the updated state
           });

                       
     
      
      
      };

       const sideSeatsStylesObject = sideSeatsStyles &&  Object.fromEntries(
        Object.entries(sideSeatsStyles).map(([row, positions]) => [row, positions])
      );
       const sideTextStylesObject = sideSeateTextStyles &&  Object.fromEntries(
        Object.entries(sideSeateTextStyles).map(([row, positions]) => [row, positions])
      );
       const MainSeatS  = Object.entries(mainSeats).map(([row, rowContent]) => {
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
            alignItems={'baseline'}
          >
            <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"black"}}  >{ !xs ? row.slice(5) :  row  }</Typography>
              {colValue}
              <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"black"}}  >{ !xs? row.slice(5) :  row  }</Typography>
            
          </Flex>
        );
      });
       const SideSeats = sideSeats &&  Object.entries(sideSeats).map(([row, rowContent])=>{
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
       const Text = sideSeateTextStyles &&  Object.entries(sideSeats).map(([row, rowContent])=>{
           return <Typography key={row}  color='textPrimary' height={0} style={sideTextStylesObject[row]} >{row}</Typography>
      })




    return (

      <>
       <SingleSelectTip 
         setMainSeatsState={setMainSeatsState} 
         setSideSeatsState={setSideSeatsState} 
         mainSeats={mainSeats} 
         sideSeats={sideSeats}  
         isMultiSelect={isMultiSelect}
           /> 

        <MuliSelectTip 
            isMultiSelect={isMultiSelect}
          />


       <Container   sx={{boxShadow:` 3px 3px 3px 2px ${theme.palette.primary.main}`, marginBottom:3}} >
        <AdminNewEventTheatherMap isMultiSelect={isMultiSelect}  setIsMultiSelect={setIsMultiSelect} multiSelectBadgeInfo={amountOfSeatsSelcted}  admin   >
          <Flex direction={"column"}    height={!xs? 320 : 600}      sx={{direction:"ltr"}}  >
             <Stage  />
             {MainSeatS}
             {Text}
             {SideSeats}
          </Flex>      
        </AdminNewEventTheatherMap>      
      </Container>
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
  export default SeatsControl


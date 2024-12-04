import {  CSSProperties, useContext, useState } from 'react'
import { Seats , SeatStyles } from '@/constants/models/Events';
import {  Stack as Flex ,  Container, Typography, } from '@mui/material'
import TooltopButton from '../client/tooltip-btn'
import WidthContext from '@/context/WidthContext';
import TipContext from '@/context/Tip-context';
import { Colors } from '@/lib/colors';
import Transporm from '../Transporm'
import AdminMapTipTool from './adminTipTool';



interface SeatsControlProps  { 
     mainSeats:Seats ,
     sideSeats?:Seats ,
     sideSeatsStyles?:SeatStyles,
     sideSeateTextStyles?:SeatStyles,
     setMainSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
     setSideSeatsState:React.Dispatch<React.SetStateAction<Seats>>,
     }

const SeatsControl = ({mainSeats, sideSeats , sideSeatsStyles , sideSeateTextStyles , setMainSeatsState, setSideSeatsState   }:SeatsControlProps ) => {
    
    const { tipX, setTipX , tipY, setTipY}=useContext(TipContext)
    const [tipTitel,setTipTitel] = useState<string>("")
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    // passed 3 lev down throu props its in the same brantch 
    const [isMultiSelect , setIsMultiSelect]=useState<boolean>(false)




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

      const multiSelectHndler=()=>{

      }




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
            <TooltopButton
              key={`${row}.${i}`}
              row={row}
              seatnumber={i}
              seatValue={seatValue}
              hendler={mainHendler}
              setTipX={setTipX}
              setTipY={setTipY}
              setTipTitel={setTipTitel}
             
               cizCost={1} 

                />
          );
        });
      
        return (
          <Flex
  
            key={row}
          
            justifyContent="center"
            direction={'row'}
            sx={{direction:"ltr"}}
          >
            {colValue}
          </Flex>
        );
      });
      const SideSeats = sideSeats &&  Object.entries(sideSeats).map(([row, rowContent])=>{
        const colValue  = rowContent.map((seatValue: number, i: number) => {
            const textset = "מושב";
            const textrow = "שורה";
        
            return (
              <TooltopButton
                key={`${row}.${i}`}
                row={row}
                seatnumber={i}
                seatValue={seatValue}
                hendler={sideHendler}
                setTipX={setTipX}
                setTipY={setTipY}
                setTipTitel={setTipTitel}
               
                 cizCost={1} 
  
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
           return <Typography key={row}  height={0} style={sideTextStylesObject[row]} >{row}</Typography>
      })


    return (
     <>

        <AdminMapTipTool />
  
       <Container   sx={{boxShadow:' 3px 3px 3px 2px #fff', marginBottom:3}} >   
        <Transporm isMultiSelect={isMultiSelect}  setIsMultiSelect={setIsMultiSelect} >
          <Flex direction={"column"}    height={!xs? 350 : 600}      sx={{direction:"ltr"}}  >
             <Stage  />
             {MainSeatS}
             {Text}
             {SideSeats}
          </Flex>      
        </Transporm>      
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
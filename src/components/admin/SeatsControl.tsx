import {  CSSProperties, useContext, useState } from 'react'
import { motion ,AnimatePresence } from "framer-motion"
import { Seats , SeatStyles } from '@/constants/models/Events';
import {  Stack as Flex ,  Container, Typography, } from '@mui/material'
import TooltopButton from '../tooltip-btn'
import WidthContext from '@/context/WidthContext';
import TipContext from '@/context/Tip-context';
import { Colors } from '@/lib/colors';
import Transporm from '../Transporm'



interface SeatsControlProps  { 
     mainSeats:Seats ,
     surroundSeats?:Seats ,
     surroundSeatsStyles:SeatStyles,
     surroundTextStyles:SeatStyles,
     }

const SeatsControl = ({mainSeats, surroundSeats , surroundSeatsStyles , surroundTextStyles   }:SeatsControlProps ) => {
    
    const { tipX, setTipX , tipY, setTipY}=useContext(TipContext)
    const [tipTitel,setTipTitel] = useState<string>("")
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const surroundSeatsStylesObject = Object.fromEntries(
        Object.entries(surroundSeatsStyles).map(([row, positions]) => [row, positions])
      );
    const surroundTextStylesObject =Object.fromEntries(
        Object.entries(surroundTextStyles).map(([row, positions]) => [row, positions])
      );

    const styles :Record<string,CSSProperties> =  { 
        stage:{          
         height:40 ,
         margin:20,
          background:"silver",
            color:"red",
            width:"50%",
            borderBottomLeftRadius: "45%",
             borderBottomRightRadius:"45%" ,
             display:'flex',
             flexDirection:'row',
             justifyContent:'center',
             alignItems:'center',
             alignContent:'center',
             },
             

       };  


    const hendler = (seatValue: number, seatNumber: number, row: string) => {
  
    
        // setEvents( prevMovies => {
        //     // Find the movie object reference
        //     const movie = prevMovies.find((mov) => mov.id === parseInt(id));
        //     if (!movie) {
        //       return prevMovies; // If the movie is not found, return the previous state
        //     }
          
        //     // Create a deep copy of the movie object and its seat details
        //     const updatedMovie = { ...movie };
        //     const updatedSeatDetails = { ...updatedMovie.seats };
        //     const updatedRow = [...updatedSeatDetails[row]];
          
        //     // Skip updates for unavailable or already selected seats
        //     if (updatedRow[seatNumber] === 1 ) {
        //       return prevMovies; // No update
        //     }
          
        //     // Toggle seat state: 0 to 2 or 2 to 0
        //     const newSeatValue = updatedRow[seatNumber] === 0 ? 2 : 0;
          
        //     // Update the seat value
        //     updatedRow[seatNumber] = newSeatValue;
          
        //     // Assign the updated row back to the seat details
        //     updatedSeatDetails[row] = updatedRow;
          
        //     // Assign the updated seat details back to the movie object
        //     updatedMovie.seats = updatedSeatDetails;
          
        //     // Replace the old movie object with the updated one in the movies array
        //     const updatedMovies = prevMovies.map((mov) =>
        //       mov.id === updatedMovie.id ? updatedMovie : mov
        //     );
          
        //     return updatedMovies; // Return the updated movies array
        //   });
                       
        //   // Update the selected seats array
        //      setSlectedSeats( prevSelectedSeats => {
        //      const seatKey = `${row}:${seatNumber}`;
        //      const isAlreadySelected = prevSelectedSeats.includes(seatKey);
        //       if(  seatValue === 1   ){
        //         return  prevSelectedSeats
        //       }  
        //           if (isAlreadySelected) {
        //        // Remove the seat if already selected
        //        return prevSelectedSeats.filter((seat) => seat !== seatKey);
        //           }
        //          // Add the seat if not already selected
        //          return [...prevSelectedSeats, seatKey];
        //     });
      
      
      };

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
              hendler={hendler}
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
            style={styles[`${row}`]} // target by key in CSS
            justifyContent="center"
            direction={'row'}
            sx={{direction:"ltr"}}
          >
            {colValue}
          </Flex>
        );
      });
      const SurroundSeats =Object.entries(surroundSeats).map(([row, rowContent])=>{
        const colValue  = rowContent.map((seatValue: number, i: number) => {
            const textset = "מושב";
            const textrow = "שורה";
        
            return (
              <TooltopButton
                key={`${row}.${i}`}
                row={row}
                seatnumber={i}
                seatValue={seatValue}
                hendler={hendler}
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
              style={surroundSeatsStylesObject[row]} // target by key in CSS
              justifyContent="center"
              direction={'row'}
              sx={{direction:"ltr"}}
            >
              {colValue}
            </Flex>
          );
      })

      const Text =  Object.entries(surroundSeats).map(([row, rowContent])=>{
           return <Typography  height={0} style={surroundTextStylesObject[row]} >{row}</Typography>
      })
        
    return (
     <>
      <AnimatePresence>
           {tipX && tipY  && (
          <motion.h1
           style={{
              background: "#fff",
              color: "black",
              borderRadius: "4px",
              height:"fin-content",
              width:"fin-content",
              position:'absolute',
              zIndex:99,
              top:`${tipY-40 }px`,
              left:`${tipX-60}px`,
              fontSize:!xs? 12 : 15,
              padding:10,
              textAlign:"end",
              fontWeight:"bold"
              
              
           }}
  
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y:-23,   transition: { duration: 0.5 } }}
           exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
           {tipTitel}
         </motion.h1>
          )}
      </AnimatePresence> 
  
       <Container   sx={{boxShadow:' 3px 3px 3px 2px #fff', marginBottom:3}} >   
        <Transporm>
          <Flex direction={"column"}    height={!xs? 350 : 600}      sx={{direction:"ltr"}}  >
             <Stage style={styles.stage} />
             {MainSeatS}
             {Text}
             {SurroundSeats}
          </Flex>      
        </Transporm>      
      </Container>
     </>
      );
  };

  const Stage = ({ style })=>{

    return    <Flex direction={'row'}  justifyContent={'center'}> 
                <div style={style} > 
                  <Typography variant='h6' color={Colors.b}>במה</Typography> 
               </div>
             </Flex >
    }   
  export default SeatsControl
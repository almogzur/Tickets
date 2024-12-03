import {  CSSProperties, useContext, useState } from 'react'
import { motion ,AnimatePresence } from "framer-motion"
import { Seats , TextPosition} from '@/constants/models/Events';
import {  Stack as Flex ,  Container, Typography, } from '@mui/material'

import TooltopButton from '../tooltip-btn'
import WidthContext from '@/context/WidthContext';
import TipContext from '@/context/Tip-context';
import { Colors } from '@/lib/colors';

interface SeatsControlProps  { mainSeats:Seats ,surroundSeats?:Seats , textpositions:TextPosition , mobTextPosiotions:TextPosition}

const SeatsControl = ({mainSeats, surroundSeats , textpositions ,mobTextPosiotions  }:SeatsControlProps ) => {
    
    const { tipX, setTipX , tipY, setTipY}=useContext(TipContext)
    const [tipTitel,setTipTitel] = useState<string>("")
    
    const positionAtr : CSSProperties = { 
        position:"relative",
        width:"fit-content",
        height:"fit-content",
        display:"flex",
        flexDirection:"column"
    }

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
      
        paymentButton: {},
        clearBtn:{   ...positionAtr,    color:"black"},
  
        "שירה 1 קומה 1": {top:-160, left:30 ,   ...positionAtr },  
        "שירה 1 קומה 2": {top:-200 ,left:-60 ,   ...positionAtr  },
  
        "שירה 2 קומה 1": {top:-160 ,left:-30, ...positionAtr},
        "2 שירה 2 קומה": {top:-192 ,left:-60 ,...positionAtr},
  
        "שירה 3 קומה 1":{top:-160 , left:-30, ...positionAtr},
        "שירה 3 קומה 2":{  top:-192 , left:-60, ...positionAtr},
  
        "קומי 1 קומה 1":{  top:-368 , left:300 , ...positionAtr },
        "קומי 1 קומה 2":{  top:-408 , left:330, ...positionAtr },
  
        "קומי 2 קומה 1":{  top:-368 , left:300 ,...positionAtr},
        "קומי 2 קומה 2":{  top:-400 , left:330 ,...positionAtr},
  
        "קומי 3 קומה 1":{ top:-368 , left:300, ...positionAtr},
        "קומי 3 קומה 2":{  top:-400 , left:330, ... positionAtr},
        
        "אופרה 1א שורה 1 קומה 1":{top:-380 , left:70 , ...positionAtr,flexDirection:"row" , },
        "אופרה 1א שורה 2 קומה 1":{top:-375 , left:75 , ...positionAtr,flexDirection:"row" ,},
  
        "אופרה 1ב שורה 1 קומה 1": {top:-396 , left:170 , ...positionAtr,flexDirection:"row"  },
        "אופרה 1ב שורה 2 קומה 2":{top:-391 , left:175 , ...positionAtr,flexDirection:"row" ,  },
  
        "אופרה 2א שורה 1 קומה 1": {top:-350 , left:70 , ...positionAtr,flexDirection:"row" ,},
        "אופרה 2א שורה 2 קומה 1":{top:-348 , left:75 , ...positionAtr,flexDirection:"row" , },
        "אופרה 2א שורה 3 קומה 2": {top:-345 , left:70 , ...positionAtr,flexDirection:"row" ,},
  
        "אופרה 2ב שורה 1 קומה 1": {top:-374 , left:170 , ...positionAtr,flexDirection:"row" ,},
        "אופרה 2ב שורה 2 קומה 1":{top:-371 , left:175 , ...positionAtr,flexDirection:"row" , },
        "אופרה 2ב שורה 3 קומה 2": {top:-369 , left:170 , ...positionAtr,flexDirection:"row" ,},
  
  
       };  

    const hendler = (seatValue: number, seatNumber: number, row: string) => {
  
    
        setEvents( prevMovies => {
            // Find the movie object reference
            const movie = prevMovies.find((mov) => mov.id === parseInt(id));
            if (!movie) {
              return prevMovies; // If the movie is not found, return the previous state
            }
          
            // Create a deep copy of the movie object and its seat details
            const updatedMovie = { ...movie };
            const updatedSeatDetails = { ...updatedMovie.seats };
            const updatedRow = [...updatedSeatDetails[row]];
          
            // Skip updates for unavailable or already selected seats
            if (updatedRow[seatNumber] === 1 ) {
              return prevMovies; // No update
            }
          
            // Toggle seat state: 0 to 2 or 2 to 0
            const newSeatValue = updatedRow[seatNumber] === 0 ? 2 : 0;
          
            // Update the seat value
            updatedRow[seatNumber] = newSeatValue;
          
            // Assign the updated row back to the seat details
            updatedSeatDetails[row] = updatedRow;
          
            // Assign the updated seat details back to the movie object
            updatedMovie.seats = updatedSeatDetails;
          
            // Replace the old movie object with the updated one in the movies array
            const updatedMovies = prevMovies.map((mov) =>
              mov.id === updatedMovie.id ? updatedMovie : mov
            );
          
            return updatedMovies; // Return the updated movies array
          });
                       
          // Update the selected seats array
             setSlectedSeats( prevSelectedSeats => {
             const seatKey = `${row}:${seatNumber}`;
             const isAlreadySelected = prevSelectedSeats.includes(seatKey);
              if(  seatValue === 1   ){
                return  prevSelectedSeats
              }  
                  if (isAlreadySelected) {
               // Remove the seat if already selected
               return prevSelectedSeats.filter((seat) => seat !== seatKey);
                  }
                 // Add the seat if not already selected
                 return [...prevSelectedSeats, seatKey];
            });
      
      
      };

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    

      const seatArray  = Object.entries(mainSeats).map(([row, rowContent]) => {
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
             
               <Flex direction={"column"}    height={!xs? 350 : 600}      sx={{direction:"ltr"}}  >

                      {/* <Typography style={{position:"relative", top:50 , left:-58 , color:Colors.b }}  height={0} > שירה</Typography>
                      <Typography style={{position:"relative", top:225, left:-155 , transform: 'rotate(90deg)',color:Colors.b }} fontSize={7} height={0} >  קומה 1</Typography>  
                      <Typography style={{position:"relative", top:225, left:-205 , transform: 'rotate(90deg)',color:Colors.b}} fontSize={7}  height={0} > קומה 2</Typography>
                      <Typography style={{position:"relative", top:50,  left:305 , color:Colors.b  }}  height={0}  > קומי </Typography>
                      <Typography style={{position:"relative", top:225, left:155 ,  transform: 'rotate(90deg)',   color:Colors.b    }}  height={0} fontSize={7} >   קומה 1 </Typography>
                      <Typography style={{position:"relative", top:225, left:205 , transform: 'rotate(90deg)' , color:Colors.b  }}  height={0} fontSize={7}>   קומה 2</Typography>  
                      <Typography style={{position:"relative", top:279, left:120 }} fontSize={11} color={Colors.b}   height={0} >  אופרה 1</Typography>
                      <Typography style={{position:"relative", top:345, left:120  }} fontSize={11} color={Colors.b}   height={0}  >  אופרה 2</Typography>
                      <Typography style={{position:"relative", top:335, left:40}}  fontSize={7} color={Colors.b}  height={0} > קומה 1</Typography>  
                      <Typography style={{position:"relative", top:360, left:40}} fontSize={7} color={Colors.b}  height={0} > קומה 2</Typography> 
                      <Typography style={{position:"relative", top:260, left:90}} fontSize={10} color={Colors.b}  height={0} > א</Typography> 
                      <Typography style={{position:"relative", top:260, left:190}} fontSize={10} color={Colors.b}  height={0} > ב</Typography> 
                         */}

                        {Object.entries(textpositions).map(([row,positions])=>{
                            return <Typography key={row} height={0} position={'relative'} {...positions}  >{row}</Typography>
                        })}

                         <Stage style={styles.stage} />
                        {seatArray}

              </Flex>      
          
          </Container>
        </>
      );
  };

  const Stage = ({ style })=>{

    return    <Flex direction={'row'}  justifyContent={'center'}> 
                <div style={style} > 
                  <Typography variant='h4' color={Colors.b}>במה</Typography> 
               </div>
             </Flex >
    }   
  export default SeatsControl
import {Box , Stack as Flex , Typography as Heading , Button} from '@mui/material'
import TooltopButton from './tooltip-btn'
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import MoviesContext from '../context/MoviesContext';
import Transporm from './Transporm';
import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';


const SeatWrapper = () => {
    const { movies ,setMovies} = useContext(MoviesContext);
    const router = useRouter();
    const { id, seats }: any = router.query;
    const movie = movies.find((mov) => mov.id === parseInt(id));
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const positionAtr : CSSProperties = { 
        position:"relative",
        width:"fit-content",
        height:"fit-content",
        display:"flex",
        flexDirection:"column"
    }

    const [selectedSeats,setSlectedSeats ]= useState ([])
    const [ tipX, setTipX]=useState(null)
    const [ tipY, setTipY]= useState(null)
    const [tipTitel,setTipTitel] = useState<string>("")
  
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
      "שירה-שורה1": {top:-160, left:-20 ,   ...positionAtr },  
      "שירה-שורה2": {top:-200 ,left:-30 ,   ...positionAtr  },
    
      "שירה2-שורה1": {top:-160 ,left:-20, ...positionAtr},
      "שירה2-שורה2": {top:-192 ,left:-30 ,...positionAtr},
    
      "שירה3-שורה1":{top:-160 , left:-20, ...positionAtr},
      "שירה3-שורה2":{  top:-192 , left:-30, ...positionAtr},
    
       
      "בידר1-שורה1": {  top:-368 , left:300 , ...positionAtr },
      "בידור1-שורה2":{  top:-408 , left:310, ...positionAtr },
    
      "בידור2-שורה1":{  top:-368 , left:300 ,...positionAtr},
      "בידור2-שורה2":{  top:-400 , left:310 ,...positionAtr},
    
      "בידור3-שורה1":{ top:-368 , left:300, ...positionAtr},
      "בידור3-שורה2":{  top:-400 , left:310, ... positionAtr},
    
      "אופרה-קומה1-שורה1":{top:-400 , left:109 , ...positionAtr,flexDirection:"row"},
      "אופרה-קומה1-שורה2": {top:-400 , left:109 ,...positionAtr,flexDirection:"row"},
    
      "אופרה-קומה2-שורה1":{ top:-385 , left:112, ...positionAtr,flexDirection:"row",},
      "אופרה-קומה2-שורה2":{ top:-385 , left:105, ...positionAtr,flexDirection:"row"},
      "אופרה-קומה2-שורה3":{ top:-385 , left:112, ...positionAtr,flexDirection:"row"},
        
     };  
  
    // useEffect(()=>{ clearSelectedSeats() },[])
     const Seats = () => {
   
      const seatArray  = Object.entries({...movie.seats}).map(([row, rowContent]) => {
        const colValue  = rowContent.map((seatValue: number, i: number) => {
          const textset = "מושב";
          const textrow = "שורה";
      
          return (
            <TooltopButton
              key={`${row}.${i}`}
              row={row}
              seatnumber={i}
              initValue={seatValue}
              hendler={hendler}
              setTipX={setTipX}
              setTipY={setTipY}
              setTipTitel={setTipTitel} tiketCost={undefined} 
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
              fontSize:15,
              padding:10,
              textAlign:"end"
              
           }}
  
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y:-23,   transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
    >
      {tipTitel}
         </motion.h1>
          )}
         </AnimatePresence> 
  
  
          <Box  bgcolor={'black'}  p={0} m={0} sx={{boxShadow:' 3px 3px 3px 2px #fff'}} >
                   <Transporm>
  
                     <Flex  direction={"column"}  height={ !xs? 400  : 600}   >
        
                        <Flex direction={'row'}  justifyContent={'center'}> 
                          <Stage style={styles.stage} />
                       </Flex > 
                   
                            {seatArray}          
               
                       </Flex> 
                
                  </Transporm>
         </Box>
  
        </>
      );
     };
  
     const PaymentButton = ({ movie,style})  =>  {
  
      if( selectedSeats.length === 0  ){
        return
      }
       return (
          <Link
            href={{
              pathname: "/payment",
              query: {
                movieId: movie?.id,
                selectedSeatsQuery: JSON.stringify(selectedSeats),
              },
            }}
          >
            <Button style={style}>
              סה״כ {selectedSeats.length * (movie?.ticketCost || 0) + " שח"}
            </Button>
          </Link>
        )
     
    };
  
   
    const hendler = (seatValue: number, seatNumber: number, row: string) => {
  
    
      setMovies((prevMovies) => {
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
        if (updatedRow[seatNumber] === 1 || updatedRow[seatNumber] === 3) {
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
       setSlectedSeats((prevSelectedSeats) => {
         const seatKey = `${row}-${seatNumber}`;
         const isAlreadySelected = prevSelectedSeats.includes(seatKey);
         if (isAlreadySelected) {
           // Remove the seat if already selected
           return prevSelectedSeats.filter((seat) => seat !== seatKey);
         }
         // Add the seat if not already selected
         return [...prevSelectedSeats, seatKey];
        });
  
  
     };
  
  
    const ResetSelectedSeats =()=>{
  
    if (selectedSeats.length) {
     return <Button 
          style={styles.clearBtn} 
          sx={{background:"#fff"}}    
           onClick={()=>{}} >
          נקה בחירה
         </Button>
    }else{return <></>}
  }
  //   const clearSelectedSeats = () => {
  //   setTipX(0)
  //   setTipY(0)
  //   setSeatDetails((prevSeatDetails) => {
  //     // Create a deep copy of the state to avoid mutating the original object
  //     const newMovieSeatDetails = { ...prevSeatDetails };
  
  //     for (let key in newMovieSeatDetails) {
  //       newMovieSeatDetails[key] = newMovieSeatDetails[key].map((seatValue: number) =>
  //         seatValue === 2 ? 0 : seatValue
  //       );
  //     }
  
  //     return newMovieSeatDetails;
  //   });
  
  //   setSlectedSeats([])
  // };
  
     return (
      <>
          <Heading p={2} variant='h4'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>
          
           <Seats /> 
          
           { selectedSeats && 
           <PaymentButton  style={styles.paymentButton} movie={movie} />
          } 
          <ResetSelectedSeats/>
      </>
  
    );
  };






export default SeatWrapper


const Stage = ({ style })=>{

  return   <div style={style} > 
             <Heading fontSize={"21l"}>במה</Heading> 
           </div>
} 



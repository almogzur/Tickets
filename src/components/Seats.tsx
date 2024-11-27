import {Box , Stack as Flex , Typography as Heading , Button, Container} from '@mui/material'
import TooltopButton from './tooltip-btn'
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import MoviesContext from '../context/MoviesContext';
import Transporm from './Transporm';
import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';
import {Colors} from '../lib/colors'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import TipContext from '@/context/Tip-context';
import { IoTicketSharp } from "react-icons/io5";

const SeatWrapper = () => {
    const { movies ,setMovies} = useContext(MoviesContext);
    const router = useRouter();
    const { id, seats }: any = router.query;
    const movie = movies.find((mov) => mov.id === parseInt(id));
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const [selectedSeats,setSlectedSeats ]= useState ([])
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
  
    // useEffect(()=>{ clearSelectedSeats() },[])
  const Seats = () => {
      const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

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
                   <Transporm  >
  
                       <Flex  direction={"column"}    height={!xs? 350 : 600}  width={'inherit'}   >
        
                        <Flex direction={'row'}  justifyContent={'center'}> 
                          <Stage style={styles.stage} />
                       </Flex > 
                   
                            {seatArray}          
               
                      </Flex> 
                     
                
                  </Transporm>
             
         </Container>
  
        </>
      );
    };
  
  const PaymentButton = ()  =>  {
  
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
            <Button  sx={{background:Colors.b , color:"#fff" , height:60}} >
             מעבר לתשלום   סה״כ {selectedSeats.length * (movie?.ticketCost || 0) + " שח"}
            </Button>
          </Link>
        )
     
  };
   
    const ResetSelectedSeats =()=>{
  
    if (selectedSeats.length) {
     return <Button 
              sx={{background:"#fff"  }} 
              onClick={()=>{clearSelectedSeats()}}
             > 
              נקה בחירה
             </Button>
    }else
    {return <></>}
  }

    const clearSelectedSeats = () => {
    setTipX(0);
    setTipY(0);
  
    setMovies((prevMovies) => {
      // Find the movie object to update
      const movie = prevMovies.find((mov) => mov.id === parseInt(id));
      if (!movie) {
        return prevMovies; // If the movie is not found, return the previous state
      }
  
      // Create a deep copy of the movie object and its seat details
      const updatedMovie = { ...movie };
      const updatedSeatDetails = { ...updatedMovie.seats };
  
      // Reset all selected seats (value `2` to `0`) in each row
      for (let key in updatedSeatDetails) {
        updatedSeatDetails[key] = updatedSeatDetails[key].map((seatValue: number) =>
          seatValue === 2 ? 0 : seatValue
        );
      }
  
      // Assign the updated seat details back to the movie object
      updatedMovie.seats = updatedSeatDetails;
  
      // Replace the movie in the movies array
      const updatedMovies = prevMovies.map((mov) =>
        mov.id === updatedMovie.id ? updatedMovie : mov
      );
  
      return updatedMovies; // Return the updated movies array
    });
  
    // Clear the selected seats array
    setSlectedSeats([]);
  };
  
  return (
      <>
       <Heading p={2} variant='h4'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>        
       <Seats />   
        {selectedSeats.length ?  <>
           <TikitList selectedSeats={selectedSeats}  />
            <Flex 
                direction={"row"} 
                justifyContent={"space-around"} 
                position={'fixed'} 
                bottom={0}
                bgcolor={Colors.a}
                height={60}
                width={'100%'}
                zIndex={1000} 
                 >
             <ResetSelectedSeats/>
             <PaymentButton/>
           </Flex>
           </>
           :null
           } 
         
      </>
  
    );
  };

export default SeatWrapper


const Stage = ({ style })=>{

  return   <div style={style} > 
             <Heading fontSize={"21l"}>במה</Heading> 
           </div>
} 

 const TikitList = ({selectedSeats})=>{
  const [checked, setChecked] = useState([0]);


  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };
  if(selectedSeats.length)
   return (  
      <Container sx={{boxShadow:' 3px 3px 3px 2px #fff', marginBottom:20}}   >  
           <List 
            sx={{ padding:2,   }}  
            
          >
                {selectedSeats.map((value) => {
              const labelId = `checkbox-list-label-${value}`;

        return (
          <ListItem
           sx={{    marginTop:2  , boxShadow : `0 6px 2px -2px  ${Colors.a} `   }  }
            key={value}
             
            secondaryAction={
              <IconButton   edge="end"  aria-label="comments">
                <IoTicketSharp color={Colors.b} size={"1.5em"}  />
              </IconButton>
            }
            disablePadding
          >
            <ListItemButton role={undefined} onClick={handleToggle(value)} dense>

              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={checked.includes(value)}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </ListItemIcon>

              <ListItemText sx={{textAlign:"end"}}  id={labelId} primary={` ${value }`} />
            </ListItemButton>

          </ListItem>
        );
      })}
          </List>

     </Container>
   )
 }



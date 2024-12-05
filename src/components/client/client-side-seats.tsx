import {Box , Stack as Flex , Typography as Heading , Button, Container, Typography, FormHelperText, FormLabel} from '@mui/material'
import TooltopButton from './client-seat-btn'
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import MoviesContext from '../../context/MoviesContext';
import Transporm from '../Transporm';
import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';
import {Colors} from '../../lib/colors'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import TipContext from '@/context/Tip-context';
import { IoTicketSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Seats } from '@/constants/models/Events';



const ClinetSideSeates = () => {
    const { events ,setEvents} = useContext(MoviesContext);
    const router = useRouter();
    const { id, seats }: any = router.query;
    const event = events.find((mov) => mov.id === parseInt(id));
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

      "שירה 1 קומה 1": {top:-160, left:-30 ,   ...positionAtr },  
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

      // reset tip 
     useEffect(()=>{
      setTipY(0)
      setTipX(0)
    },[])

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

  const clearSelectedSeats = () => {
    setTipX(0);
    setTipY(0);
  
    setEvents((prevMovies) => {
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

  const Seats = ({seatArrayProps}:{seatArrayProps:Seats} ) => {

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    
   

      const seatArray  = Object.entries(seatArrayProps).map(([row, rowContent]) => {
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
               tiketCost={event.ticketCost} 
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
            <Transporm  >              
               <Flex  direction={"column"}    height={!xs? 350 : 600}      sx={{direction:"ltr"}}  >

                      <Typography style={{position:"relative", top:50 , left:-58 , color:Colors.b }}  height={0} > שירה</Typography>
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


                      <Flex direction={'row'}  justifyContent={'center'}> 
                          <Stage style={styles.stage} />
                    
                      </Flex>

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
                movieId: event?.id,
                selectedSeatsQuery: JSON.stringify(selectedSeats),
              },
            }}
          >
            <Button  sx={{background:Colors.b , color:"#fff" , height:60 ,fontSize:!xs?20:30, letterSpacing:1 ,lineHeight:1.2 , }} >
              מעבר לתשלום    <br/>
              סה״כ {selectedSeats.length * (event?.ticketCost || 0) + " שח"}
            </Button>
          </Link>
        )
     
  };
   
  const ResetSelectedSeatsButton =()=>{
  
    if (selectedSeats.length) {
     return <Button 
              sx={{background:"#fff" , color:Colors.b ,fontWeight:"bold", fontSize:20 }} 
              onClick={()=>{clearSelectedSeats()}}

             > 
              נקה בחירה
             </Button>
    }else
    {return <></>}
  }

  const TikitList = ({selectedSeats})=>{
    const [checked, setChecked] = useState([0]);

  
    if(selectedSeats.length){


     return (  
        <Container sx={{boxShadow:' 3px 3px 3px 2px #fff', marginBottom:20 ,padding:1}}   >  
                <Typography variant='h3' textAlign={"center"}  > כרטיסים נבחרים</Typography>
             <List   sx={{  }} >
                  {selectedSeats.map((value) => {
                      return (  <Item value={value} key={value} hendler={hendler}  /> );

                    })}
            </List>
  
       </Container>
     )
    }
  }

 const Stage = ({ style })=>{

  return   <div style={style} > 
             <Typography variant='h4' color={Colors.b}>במה</Typography> 
           </div>
  }   

  
  return (
      <>
       <Heading p={2} variant='h4'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>        
       <Seats seatArrayProps={event.mainSeats}  />   
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
             <ResetSelectedSeatsButton/>
             <PaymentButton/>
           </Flex>
           </>
           :null
           } 
         
      </>
  
    );
  };

 const Item =({value ,hendler } )=>{

  const [age, setAge] = useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };
  

  const toArr = value.split(":")
  const row = toArr[0]
  const seatnumber = toArr[1]


  const displayRow = row.split(" ").reverse()
  const diplaySeatNumer = parseInt(seatnumber)+1



   useEffect(()=>{
    console.log( displayRow);

    
   },[displayRow])



  
   return(
    

      <ListItem alignItems='center'  sx={{ justifyContent:"space-between"  ,    marginTop:2  , boxShadow : `0 6px 2px -2px  ${Colors.a} `, padding:1,  }   }  key={value}  >

                  
            <Flex  direction={"row"} width={"40%"}  justifyContent={"space-between"} alignItems={"center"}    >

              
              <FaTrashAlt  color={Colors.a} size={"1.5em"} style={{border:`solid ${Colors.a}`, padding:7 ,  } } onClick={(e)=>{  hendler( 2 ,seatnumber,row)}}  />
  
     
               <FormControl sx={{color:"#fff" ,   }}   >
                 <InputLabel sx={{color:"#fff"}}  >סוג</InputLabel>
                  <Select
                     value={age}
                     label="Age"
                     onChange={handleChange}
                     sx={{color:"#fff", }}
                     size='small'
                     fullWidth
                     
         
                   >
           
                     <MenuItem value={20}>תושב</MenuItem>
                     <MenuItem value={30}>רגיל</MenuItem>
                 </Select>
              </FormControl>

             </Flex>



            <Flex direction={"row"} width={"60%"} alignItems={"center"}   >
              
              <Typography variant='subtitle2' width={"100%"} textAlign={"center"} >{ ` מושב ${diplaySeatNumer} :  ${row} `} </Typography>

              <IoTicketSharp color={Colors.b} size={"2em"} style={{border:`solid ${Colors.b}` , padding:3 }}  />

           </Flex>

      </ListItem>

      )
 }

 export default ClinetSideSeates
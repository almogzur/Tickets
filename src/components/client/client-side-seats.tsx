import {Box , Stack as Flex , Typography as Heading , Button, Container, Typography, FormHelperText, FormLabel} from '@mui/material'
import TooltopButton from './client-seat-btn'
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import MoviesContext from '../../context/Events';

import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';
import {Colors} from '../../lib/colors'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ClientTipContext from '@/context/client-tip-context'
import { IoTicketSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Seats, SeatStyles } from '@/constants/models/Events';
import TooltipButton from './client-seat-btn';

import {
  mainSeats as EilatMain ,
   sideSeats as EilatSide ,
    sideSeateTextStyles as EilatSideText ,
     sideSeatsStyles as EilatSideStyels
    } from '../../constants/theathers/eilat_1'
import ClientTheaterMap from './Client-theater-map';
import { purple } from '@mui/material/colors';



const ClinetSideSeates = () => {
    const { events ,setEvents} = useContext(MoviesContext);
    const router = useRouter();
    const { id, seats }: any = router.query;
    
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const [selectedSeats,setSlectedSeats ]= useState ([])

    const {clientTipPosition,clinetTipInfo, setClientTipPosition  ,setClinetTipInfo, resetClinetTip }=useContext(ClientTipContext)
    

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

  const Seats = ({mainSeats, sideSeats , sideText, sideStyles   }:{mainSeats:Seats, sideSeats:Seats , sideText:SeatStyles ,sideStyles:SeatStyles } ) => {

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const sideSeatsStylesObject = sideStyles &&  Object.fromEntries(
      Object.entries(sideStyles).map(([row, positions]) => [row, positions])
    );
     const sideTextStylesObject = sideText &&  Object.fromEntries(
      Object.entries(sideText).map(([row, positions]) => [row, positions])
    );
     const MainSeatS  = Object.entries(mainSeats).map(([row, rowContent]) => {
      const colValue  = rowContent.map((seatValue: number, i: number) => {
        const textset = "מושב";
        const textrow = "שורה";
    
        return (
          <TooltipButton // uses Context
            key={`${row}.${i}`}
            seatValue={seatValue}
            seatnumber={i}
            row={row} 
            hendler={undefined}             
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

          <Typography  height={0} fontWeight={800} fontSize={6} color='secondary'  >{ !xs ? row.slice(5) :  row  }</Typography>
            {colValue}
          <Typography height={0} fontSize={6}  fontWeight={800} color='secondary'    >{ !xs ? row.slice(5) :  row  }</Typography>
          
        </Flex>
      );
    });
     const SideSeats = sideSeats &&  Object.entries(sideSeats).map(([row, rowContent])=>{
      const colValue  = rowContent.map((seatValue: number, i: number) => {
       
      
          return (
            <TooltipButton
              key={`${row}.${i}`}
              seatValue={seatValue}
              seatnumber={i}
              row={row} 
              hendler={undefined}            
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

     const Text = sideStyles &&  Object.entries(sideSeats).map(([row, rowContent])=>{
      return <Typography key={row}  color='secondary' height={0} style={sideTextStylesObject[row]} >{row}</Typography>
 })
    
   

        
      return (
       <>
          <AnimatePresence>
           {clientTipPosition.x && clientTipPosition.y  && (
          <motion.h1
           style={{
              background: "#fff",
             
              borderRadius: "4px",
              height:"fin-content",
              width:"fin-content",
              position:'absolute',
              zIndex:99,
              top:`${clientTipPosition.y-40 }px`,
              left:`${clientTipPosition.x-60}px`,
              fontSize:!xs? 12 : 15,
              padding:10,
              textAlign:"end",
              fontWeight:"bold"
              
              
           }}
  
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y:-23,   transition: { duration: 0.5 } }}
           exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
           {clinetTipInfo.row}:{clinetTipInfo.seatNumber}
         </motion.h1>
          )}
         </AnimatePresence> 
  
  
          <Container   sx={{boxShadow:' 3px 3px 3px 2px #fff', marginBottom:3 }} >
            <ClientTheaterMap   key={"Clinetside"} >              
            <Flex direction={"column"}    height={!xs? 300 : 600}      sx={{direction:"ltr"}} >
             <Stage />
             {MainSeatS}
             {Text}
             {SideSeats}
          </Flex>      
            </ClientTheaterMap>         
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

  
  return (
      <>
       <Heading p={2} variant='h4'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>        
       <Seats mainSeats={{ ...EilatMain }} sideSeats={{ ...EilatSide }} sideText={{...EilatSideText}} sideStyles={{...EilatSideStyels}} />   

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
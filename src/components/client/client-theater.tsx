import {Box , Stack as Flex , Typography as Heading , Button, Container, Typography, useTheme} from '@mui/material'
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, useRef, Dispatch, } from 'react'

import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

import ClientTipContext from '@/context/client/c-tip-context'

import { IoTicketSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TooltipButton from './client-seat-btn';
import ClientTheaterMap from './client-theater-map';
import {Event} from '@/constants/models/Events'
import { TheaterType } from '@/types/Thearer/theater-types';

interface ClientTheaterType {
  theater:TheaterType
  peretSeter: Dispatch<Event[]>
}


const ClientTheater = ({theater, peretSeter}:ClientTheaterType) => {

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const [selectedSeats,setSlectedSeats ]= useState<string[]> ([])

    
 

  const hendler = (seatValue: number, seatNumber: number, row: string) => {
  
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

  // IMPORTENT DINT DEl 
  // make this shoping cart 
  // add state for
  // 1 Complite 
  // 2 levers 
  //  capture user info 
  
  const ShopingCart = ()  =>  {
  
      if( selectedSeats.length === 0  ){
        return
      }
       return (
          <Link
            href={{
                pathname: "/payment",
          
            }}
          >
            <Button color='secondary'  sx={{ color:"#fff" , height:60 ,fontSize:!xs?20:30, letterSpacing:1 ,lineHeight:1.2 , }} >
              מעבר לתשלום    <br/>
              סה״כ {selectedSeats.length * (  0) + " שח"}
            </Button>
          </Link>
        )
     
  };
   
  const ResetSelectedSeatsButton =()=>{
  
    if (selectedSeats.length) {
     return <Button 
              sx={{background:"#fff"  ,fontWeight:"bold", fontSize:20 }} 
              onClick={()=>{}}
              color='secondary'

             > 
              נקה בחירה
             </Button>
    }else
    {return <></>}
  }
;
  const TikitList = ({selectedSeats}:{selectedSeats:string[]})=>{
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
    return null
  }



  return (
      <div style={{background:"black"}}>
       <Heading p={2} variant='h4'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>        
       <TheaterMap theater={theater} peretSeter={peretSeter}/>   

        {selectedSeats.length ?  <>
           <TikitList selectedSeats={selectedSeats}  />

            <Flex 
                direction={"row"} 
                justifyContent={"space-around"} 
                position={'fixed'} 
                bottom={0}
                height={60}
                width={'100%'}
                zIndex={1000} 
                 >
             <ResetSelectedSeatsButton/>
          {/*      <ShopingCart/>*/}
           </Flex>
           </>
           :null
           } 
         
      </div>
  
    );
  };

 const Item =({value ,hendler }:{value:any,hendler:any} )=>{

  const [age, setAge] = useState('');

  const handleChange = (event:any) => {
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
    

      <ListItem alignItems='center'  sx={{ justifyContent:"space-between"  ,    marginTop:2  , boxShadow : `0 6px 2px -2px `, padding:1,  }   }  key={value}  >

                  
            <Flex  direction={"row"} width={"40%"}  justifyContent={"space-between"} alignItems={"center"}    >

              
              <FaTrashAlt   size={"1.5em"} style={{border:`solid `, padding:7 ,  } } onClick={(e)=>{  hendler( 2 ,seatnumber,row)}}  />
  
     
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

              <IoTicketSharp  size={"2em"} style={{border:`solid ` , padding:3 }}  />

           </Flex>

      </ListItem>

      )
 }

 export default ClientTheater

 const TheaterMap = ({theater, peretSeter}:ClientTheaterType) => {
 const theme = useTheme()

  const {clientTipPosition,clinetTipInfo, setClientTipPosition  ,setClinetTipInfo, resetClinetTip }=useContext(ClientTipContext)
  
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
                  <Typography variant='h6' color={theme.palette.secondary.main}>במה</Typography> 
               </div>
             </Flex >
    }   
  

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

      const sideSeatsStylesObject =  Object.fromEntries(
        Object.entries(theater.styles).map(([row, positions]) => [row, positions])
      )
       const sideTextStylesObject =  Object.fromEntries(
        Object.entries(theater.textsStyle).map(([row, positions]) => [row, positions])
      )

       const MainSeatS  =   Object.entries(theater.mainSeats).map(([row, rowContent]) => {
        const colValue  = rowContent.map((seatValue: number, i: number) => {
          const textset = "מושב";
          const textrow = "שורה";
      
          return (
            <TooltipButton // uses Context
              key={`${row}.${i}`}
              seatValue={seatValue}
              seatnumber={i}
              row={row}
               hendler={undefined}              />
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
            <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"#fff"}}  >{ !xs ? row.slice(5) :  row  }</Typography>
              {colValue}
              <Typography variant='subtitle2' height={0} fontWeight={800} fontSize={6} sx={{color:"#fff"}}  >{ !xs? row.slice(5) :  row  }</Typography>
            
          </Flex>
        );
      })
       const SideSeats =   Object.entries(theater.sideSeats).map(([row, rowContent])=>{
        const colValue  = rowContent.map((seatValue: number, i: number) => {
         
        
            return (
              <TooltipButton
                key={`${row}.${i}`}
                seatValue={seatValue}
                seatnumber={i}
                row={row} hendler={undefined}              
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
       const Text =  Object.entries(theater.sideSeats).map(([row, rowContent])=>{
           return <Typography key={row} sx={{color:theme.palette.secondary.main}}  height={0} style={ sideTextStylesObject[row]} >{row}</Typography>
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


          <ClientTheaterMap   >    

          <Flex direction={"column"}    height={!xs? 300 : 600}      sx={{direction:"ltr"}} >
           <Stage />
           {MainSeatS}
           {Text}
           {SideSeats}
        </Flex>      

          </ClientTheaterMap>         
      </>
    );
};


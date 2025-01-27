import {Box , Stack as Flex , Typography as Heading , Button, Container, Typography, useTheme} from '@mui/material'
import { useState, useEffect, useContext, CSSProperties, useRef, Dispatch, SetStateAction, } from 'react'

import { useRouter } from 'next/router'
import WidthContext from '@/context/WidthContext';
import Link from 'next/link';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';


import { IoTicketSharp } from "react-icons/io5";
import { FaTrashAlt } from "react-icons/fa";

import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { EventsType } from '@/pages/api/client/events/R/get-events';
import TheaterMap from './client-theater-mao';

export interface ClientTheaterType {
  theater:TheaterType
}


const ClientTheater = ({theater}:ClientTheaterType) => {

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const [selectedSeats,setSlectedSeats ]= useState<string[]> ([])

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
                      return (  <Item value={value} key={value}  /> );

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
       <TheaterMap theater={theater}/>   

        {
          selectedSeats.length &&
             <>
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
 
           } 
         
        </div>
  
    );
  };

 const Item =({value ,hendler }:{value:any,hendler?:any} )=>{

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




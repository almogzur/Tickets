import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, ListItemAvatar, ListItemButton, Typography, useTheme , Stack as Flex, Divider  } from '@mui/material';
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { DrawerContentType } from './drawer-content';
import { IoMdClose } from "react-icons/io";
import { grey } from '@mui/material/colors';
import WidthContext from '@/context/WidthContext';
import { useContext } from 'react';


interface ClientTicketListType extends  DrawerContentType {}

export default function ClientTikectList({
    event,
    eventSelectSeats,
    clientEventTheaterState,
    hendlerSeatOldValues,
    setEventState,
    setEventSelectedSeats,
    setClientEventTheaterState,
    setHendlerSeatOldValues,
  }:ClientTicketListType) {
  
  const theme = useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  

  const hendler = (
    seatValue: number,
     seatNumber: number,
      row: string ,
      theater?:TheaterType,
       price?:string ,
        priceInfo?:string 
      
    ) => {
      const inMain = theater?.mainSeats.hasOwnProperty(row);
      const inSide = theater?.sideSeats.hasOwnProperty(row);
      
      const allowedToChangeSeatValues = [0, 2, 4, 5];
  
      if (!allowedToChangeSeatValues.includes(seatValue)) return;
  
      const seatKey = `${row}-${seatNumber}`;
  
      // Toggle seat selection
      setEventSelectedSeats((prev) =>
          prev.some((item) => item.row === row && item.seatNumber === seatNumber  )
              ? prev.filter((item) => !(item.row === row && item.seatNumber === seatNumber))
              : [...prev, { row, seatNumber, value: seatValue ,price:""}]
      );
  
      const updateSeats = (prevState: TheaterType | undefined, seatCollection: "mainSeats" | "sideSeats") => {
  
          if (!prevState) return prevState;
  
          const newState = { ...prevState };
          const updatedSeats = { ...newState[seatCollection] };
          const updatedRow = [...updatedSeats[row]];
  
          const oldNumber = updatedRow[seatNumber];
  
          // Store the original seat value if not already stored
          setHendlerSeatOldValues((prev) => ({
              ...prev,
              [seatKey]: prev[seatKey] ?? oldNumber,
          }));
  
          // Toggle between 2 and the stored original value
          updatedRow[seatNumber] = oldNumber === 2 ? hendlerSeatOldValues[seatKey] ?? seatValue : 2;
  
          updatedSeats[row] = updatedRow;
          newState[seatCollection] = updatedSeats;
  
          return newState;
      };
  
      if (inMain) {
        setClientEventTheaterState((prevState) => updateSeats(prevState, "mainSeats"));
      } else if (inSide) {
        setClientEventTheaterState((prevState) => updateSeats(prevState, "sideSeats"));
      } else {
          throw new Error("Seat not found in main or side seats.");
      }
        }


  return (
    <List
       sx={{ 
            width:"95%",
            maxWidth:500,
            mb:15,

            
            }}
            >
           {eventSelectSeats.map(({row,seatNumber,value,price,priceInfo}) => {
               const labelId = `checkbox-list-label-${seatNumber}`;

          return  <ListItem
              key={`${row}+${seatNumber}+Client-List`}
              divider
              sx={{   
                bgcolor:grey[400],
                  mt:1,
                 borderRadius:1,
                 fontSize:"12px",
                 transition:"all 0.5s",
                 "&:hover":{scale:1.02 },
                 "& *": { fontSize:  !sm?  12 : 14 , direction:"rtl" },
                   }}
          >
              <Flex width={"100%"}   alignItems={"top"} >

               <IoMdClose
                     color='red'
                     size={"2em"}
                     onClick={()=>hendler(value,seatNumber,row,clientEventTheaterState )}
                     style={{position:"absolute", right: !md ? "92%" : "89%" , top:0  }}
                  /> 

                <Flex   width={"100%"}  alignItems={"start"}   >
                  <Typography >{row }   מושב  :  { seatNumber+1}</Typography>
                     <Divider sx={{borderWidth:1, width:"inherit"}} />
                     <Flex direction={"row"} gap={1} >
                      
                      <Typography> מחיר :  { price}</Typography>
                      {priceInfo && <Typography> תיאור : {priceInfo}</Typography>}
                  </Flex>
                </Flex>
                
     


              </Flex>

              
          </ListItem>

      })}
    </List>
  );
}

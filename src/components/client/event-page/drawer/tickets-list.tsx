import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Button, ListItemAvatar, Typography, useTheme } from '@mui/material';
import { TheaterType } from '@/components/admin/newEvent/theater/types/theater-types';
import { DrawerContentType } from './drawer-content';
import { IoMdClose } from "react-icons/io";


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
  

  const hendler = (
      seatValue: number,
      seatNumber: number,
      row: string,
      theater:TheaterType|undefined
    ) => {
      const inMain = theater?.mainSeats.hasOwnProperty(row);
      const inSide = theater?.sideSeats.hasOwnProperty(row);
      
      const allowedToChangeSeatValues = [0, 2, 4, 5];
  
      if (!allowedToChangeSeatValues.includes(seatValue)) return;
  
      const seatKey = `${row}-${seatNumber}`;
  
      // Toggle seat selection
      setEventSelectedSeats((prev) =>
          prev.some((item) => item.row === row && item.seatNumber === seatNumber)
              ? prev.filter((item) => !(item.row === row && item.seatNumber === seatNumber))
              : [...prev, { row, seatNumber, value: seatValue }]
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
            width:"100%",
            mb:15,
    
            }}
            >
           {eventSelectSeats.map(({row,seatNumber,value}) => {
               const labelId = `checkbox-list-label-${seatNumber}`;

          return  <ListItem
              key={`${row}+${seatNumber}+Client-List`}
              divider
              sx={{
                width:"100%",
                bgcolor:"#ddd"
              }}
          >
              <ListItemText 
                 sx={{direction:"ltr", textAlign:"end"}}
                 id={labelId}
                 primary={` ${seatNumber +1} - ${ row} `}
                 
                  />
         
            <Button 
              onClick={()=>hendler(value,seatNumber,row,clientEventTheaterState )}
              variant='text'
              color='secondary'
             >
              <IoMdClose color='red' size={"2em"} /> 
            </Button>
          </ListItem>

      })}
    </List>
  );
}

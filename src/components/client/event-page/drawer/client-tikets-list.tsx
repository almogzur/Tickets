import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import { SeatType } from '@/pages/details/[id]';
import { Button, ListItemAvatar, Typography, useTheme } from '@mui/material';
import { FcDeleteRow } from 'react-icons/fc';

export default function ClientTikectList({eventSelectSeats}:{eventSelectSeats:SeatType[]}) {
  
  const theme = useTheme()


  return (
    <List
       sx={{ 
            width: '100%',
            maxWidth: 'inherit',

            overflowY:'scroll',
          
          
            height:500,
            '&::-webkit-scrollbar': {
              width: '5px',
          },
           '&::-webkit-scrollbar-track': {
              boxShadow: `inset 0 0 2px rgba(0,0,0,0.00)`,
              webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.00)',
         },
           '&::-webkit-scrollbar-thumb': {
             background:theme.palette.secondary.main,
         }
            }}
            >
    {eventSelectSeats.map(({row,seatNumber}) => {
           const labelId = `checkbox-list-label-${seatNumber}`;

        return (
          <ListItem
             key={`${row}+${seatNumber}+Client-List`}
             divider

          >
              <ListItemText 
                 sx={{direction:"ltr", textAlign:"end"}}
                 id={labelId}
                 primary={` ${seatNumber +1} - ${ row} `}
                 
                  />
         
            <Button 
              onClick={()=>{}}
              variant='text'
     
              
             >

              
                    <FcDeleteRow size={"2em"} />
              
  
            </Button>

          </ListItem>
        );
      })}
    </List>
  );
}

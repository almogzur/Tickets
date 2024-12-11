import { TheaterType } from '@/pages/_app';
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel, styled, InputBase} from '@mui/material'
import { grey } from '@mui/material/colors';
import { Dispatch, SetStateAction, useState } from 'react';

const TheaterSelect =({theaters,seter}:{theaters:TheaterType[], seter:Dispatch<SetStateAction<TheaterType>> })=> { 

    const [name ,setName]= useState<string>("")

    const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value);
    };

return (
  
   <FormControl  sx={{ minWidth:240,  }}  required variant='outlined' >
   <InputLabel sx={{}}  >בחר אולם</InputLabel>

     <Select
      value={name}
      renderValue={(value)=>value}
      onChange={handleChange}
      label="בחר אולם"
      sx={{m:1 ,background:'#fff' ,
     
      }}
      >
      
      {theaters.map((theater,i)=>{
         return <MenuItem  key={theater.ThaeaterName} value={theater.ThaeaterName}
         // ... coping the theater avoid mutation of the main Theater Object 
          onClick={()=>{seter({...theater})}} 
          >{theater.ThaeaterName}
                </MenuItem>

      })}

    </Select>
   </FormControl>
  
);
}
export default TheaterSelect




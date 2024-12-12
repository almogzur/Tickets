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
  
   <FormControl  sx={{ minWidth:220, m:0.5 }}    variant='outlined' >
      <InputLabel  >בחר אולם</InputLabel>
     <Select
      value={name}
      variant='filled'
      sx={{bgcolor:"#fff"}}
      onChange={handleChange}



      >

      { theaters.map((theater,i)=>{
         return <MenuItem 
                   key={theater.ThaeaterName} 
                   value={theater.ThaeaterName}
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




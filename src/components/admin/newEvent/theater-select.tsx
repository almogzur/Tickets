import { InfoFormType, TheaterType } from '@/pages/_app';     
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel, styled, InputBase} from '@mui/material'
import { grey } from '@mui/material/colors';
import { Dispatch, SetStateAction, useState } from 'react';

interface TheaterSelectType {
  theaters?:TheaterType[],
  setInfoFileds:Dispatch<SetStateAction<InfoFormType>>
}

const TheaterSelect =({theaters,setInfoFileds}:TheaterSelectType)=> { 

    const [name ,setName]= useState<string>("")

    const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value);
    };

return (
  
   <FormControl  sx={{ width:180, minWidth:220,  m:0.5, flexGrow:4 }}    variant='outlined' >
      <InputLabel  >בחר אולם</InputLabel>
     <Select
      value={name}
      variant='standard'

      onChange={handleChange}



      >

      { theaters?.map((theater,i)=>{
         return <MenuItem 
                   key={theater.ThaeaterName} 
                   value={theater.ThaeaterName}
                  // ... coping the theater avoid mutation of the main Theater Object 
                  onClick={()=>{setInfoFileds(p=>({...p,theater:theater}))}} 
                  >{theater.ThaeaterName}
                </MenuItem>

      })}

    </Select>
   </FormControl>
  
);
}
export default TheaterSelect




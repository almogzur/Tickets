import { TheaterType } from '@/pages/_app';
import {Typography , OutlinedInput , Stack as Flex, Select , MenuItem, SelectChangeEvent, FormControl, useTheme, InputLabel} from '@mui/material'
import { Dispatch, SetStateAction, useState } from 'react';

const TheaterSelect =({theaters,seter}:{theaters:TheaterType[], seter:Dispatch<SetStateAction<TheaterType>> })=> { 

    const [name ,setName]= useState<string>("")

    const handleChange = (event: SelectChangeEvent) => {
      setName(event.target.value);
    };

return (
  <>
   <Typography variant='h3' textAlign={"center"} color='primary' >סימון מושבים</Typography> 
   <FormControl  sx={{  minWidth:200 }} >
   <InputLabel >בחר אולם</InputLabel>

  <Select
      value={name}
      renderValue={(value)=>value}
      onChange={handleChange}
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
  </>
);
}
export default TheaterSelect
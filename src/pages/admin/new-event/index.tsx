import { useSession } from 'next-auth/react'
import {useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import AdminLayout from '@/Layouts/admin-layout'
import {  Typography , OutlinedInput , Stack as Flex, TextField, Select , MenuItem, InputLabel, SelectChangeEvent, Box, FormControl, Theme} from '@mui/material'

import { mainSeats ,sideSeats ,sideSeateTextStyles ,sideSeatsStyles } from '../../../constants/theathers/eilat_1'


import WidthContext from '@/context/WidthContext'
import Editor from '@/components/text-editor/editor'
import DatesList from '@/components/admin/date-list'
import SeatsControl from '@/components/admin/SeatsControl'

import { Seats } from '@/constants/models/Events'

const NewEventPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update} = useSession()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const [newEventState , setNewEventState ]= useState()

   // send to save new event api
  const [mainSeatsState, setMainSeatsState]= useState<Seats>({...mainSeats})
  const [sideSeatsState , setSideSeatsState] = useState<Seats>({...sideSeats})

  const [formdata,setFormData]= useState({
     name:"",
     address:"",
     cat:"",
     label:"",
     text:"",
     dates:[]
  })

  useEffect(()=>{  })

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}

return (
    <AdminLayout>
      <Typography variant='h3' textAlign={"center"} > אירוע חדש</Typography>
     


         <Flex direction={ md? "row" :'column'} gap={2}   justifyContent={"center"} alignItems={'baseline'}  >

                <Flex width={md? '40%':"100%"} >

                  <OutlinedInput required inputProps={{alt:""  }} placeholder='שם' />        
                  <OutlinedInput required placeholder="כתובת"/>        
                  <OutlinedInput required placeholder="קטגוריה"/>
                  <OutlinedInput required placeholder="תויות" />
               </Flex>

                <Flex width={ md? "60%": "100%"} >
                  <Editor/>
                </Flex>


         </Flex>   

     
        <DatesList/>


        <Typography variant='h3' textAlign={"center"} >סימון מושבים</Typography> 

        <TheaterSelect theaterLIst ={[]} />
         <SeatsControl  
            mainSeats={mainSeatsState} 
            sideSeats={sideSeatsState} 
            sideSeateTextStyles={sideSeateTextStyles} 
            sideSeatsStyles={sideSeatsStyles}
            setMainSeatsState={setMainSeatsState}
            setSideSeatsState={setSideSeatsState}
             />


    </AdminLayout>
) 
}

export default NewEventPage






const TheaterSelect =({theaterLIst})=> { 

  const [age, setAge] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  return (
   
      <FormControl  sx={{  minWidth:200 }} >

<Select
          displayEmpty
          value={""}
          input={<OutlinedInput />}
     
        >
          <MenuItem disabled value="">
            <em>בחר אולם</em>
          </MenuItem>

        </Select>
      </FormControl>

  );
}



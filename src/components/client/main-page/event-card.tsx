import Card from '@mui/material/Card';

import {Typography, useTheme, Stack as Flex} from '@mui/material'

import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/router';
import WidthContext from '@/context/WidthContext';
import { useContext, useEffect } from 'react';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';


export default function EventCard(props:ClientEventType) {
  const theme = useTheme()
  const router = useRouter()
  const Actions = Flex
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


  //useEffect(()=>{console.log(props, "Event Card Props")},[props])

  
  return (
    
    <Card 
    sx={{
      minWidth:!xs? 200:  250,
      height:!xs? 300: 350,
      background:"black" ,
      border:`solid 1px ${theme.palette.secondary.dark}`,
      borderRadius:3,
      m:2,
      transition:"all 0.5s",
      "&:hover":{
        boxShadow:`0px 0px 20px  0.5em ${theme.palette.secondary.dark}`,
        scale:1.04
              }
            }}  
        >
         <CldImage
          src={props.info.preview}
          unselectable='on'
          unoptimized
          alt="Description of my image"
          width={!xs? 200:  250}
          height={!xs? 240: 280}
          draggable={false}
          style={{objectFit:'fill'}}
          
        
        />
       

           
             <Flex
                direction={"row"}
                 bgcolor={theme.palette.secondary.main}
                 justifyContent={"center"}
                 alignItems={"center"}  
                 height={'20%'}
                 sx={{ cursor:'pointer'}}
                 onClick={ (e)=> {
                    router.push(
                       `/event/${props._id}`,
                      
                    )
                  }
                }

                   >
                 <Typography 
                    textAlign={"center"}
                     variant='h6'
                      sx={{color:"#fff"}}                     
                     > {  props.info.eventName}</Typography>

               
             </Flex>
            

    </Card>
  );
}
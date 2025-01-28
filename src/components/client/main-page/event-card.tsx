import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import {Typography, useTheme, Stack as Flex} from '@mui/material'

import { EventsType } from '@/pages/api/client/events/R/get-events';
import { CldImage } from 'next-cloudinary';
import { useRouter } from 'next/router';
import WidthContext from '@/context/WidthContext';
import { useContext } from 'react';
import { optimizeImage } from 'next/dist/server/image-optimizer';

export default function EventCard({
  eventName,
  _id,
  cat,
  pre,
  preview,
  tickets,
  Theater,
  TheaterName,
  image,
  OpenDorHour,
  Date,
  availableSeatsAmount,
  isEventClosedForSeal
  
  
}:EventsType) {
  const theme = useTheme()
  const router = useRouter()
  const Actions = Flex
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


  
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
          src={preview}
          unselectable='on'
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
                 sx={{      cursor:'pointer',                 }}
                 onClick={   ()=>  router.push(`/details/${_id}`)}

                   >
                 <Typography 
                    textAlign={"center"}
                     variant='h6'
                      sx={{color:"#fff"}}                     
                     > {   eventName}</Typography>

               
             </Flex>
            

    </Card>
  );
}
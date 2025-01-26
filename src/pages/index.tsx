import {  Button, Container ,Stack as Flex ,  Typography as Heading , Box, useTheme } from '@mui/material'

import Head from 'next/head'
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Event } from '../constants/models/Events';
import ClientLayout from '../Layouts/client-layout';
import useClientEvents from '@/lib/client/Hooks/useGetEvents';
import { useEffect } from 'react';



export default function Home() {

 const theme = useTheme()

  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()
  useEffect(()=>{
        console.log(Events)
  },[Events])

   const
     PageWrapper = Flex,
     Placeholder = Box

  return (
    <  >
      <Head >
        <title>הזמנות כרטיסים  | בית</title>
      </Head>
<ClientLayout>

      <PageWrapper bgcolor={"black"} height={'100%'}>

        <Heading
            variant='h5'
            mt={3}
           mx={2}
           p={2}
            border={"none"}
            color={theme.palette.secondary.main}
            
            borderRadius={"10px"}
           
            >אירועים</Heading>

         <Flex direction={'row'} flexWrap={'wrap'}  >
           {/* <MoviesList/> */}
        </Flex>

        <Placeholder height={400} />
        
      </PageWrapper>

      

   </ClientLayout>
    </>
  )
}


const MoviesList = ({items}:{items:any[]}) => {
    

    return items.map((movie: Event) => (
   
        <Link href={`/details/${movie.id}`} key={movie.id} >
   
             <Card  sx={{ maxWidth: 345 , margin:5 }}>
              <CardMedia
                sx={{ height:400 ,width:300 ,objectFit:'fill'}}
                image={movie.cover.src}
                title="green iguana"
                    
                    
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {movie.name}
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {movie.adText }
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small">Share</Button>
                <Button size="small">Learn More</Button>
              </CardActions>
            </Card>

        </Link>

    ))


}

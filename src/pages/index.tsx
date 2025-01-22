import {  Button, Container ,Stack as Flex ,  Typography as Heading , Box } from '@mui/material'

import Head from 'next/head'
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import {useGetEvents} from '../services/events'
import { Event } from '../constants/models/Events';
import ClientLayout from '../Layouts/client-layout';
import { useSession } from 'next-auth/react';
import Placeholder from '@tiptap/extension-placeholder';


export default function Home() {

  const { events, isLoading, isError } = useGetEvents();
  
  const MoviesList = () => {
    
    if (events) {
      return events.map((movie: Event) => (
     
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
    } else if (isLoading) {
      return <>טוען...</>
    } else {
      return <>אין תוצאות </>
    }
  }
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
        <Heading variant='h3' textAlign={"center"} >ההופעות שלנו</Heading>

         <Flex direction={'row'} flexWrap={'wrap'}  >
          <MoviesList/>
        </Flex>

        <Placeholder height={400} />
        
      </PageWrapper>

      

   </ClientLayout>
    </>
  )
}

import {  Button, Container ,Stack as Flex ,  Typography as Heading  } from '@mui/material'

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



export default function Home({nonce}:{nonce:string}) {

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
  
  return (
    <  >
      <Head >
        <title>הזמנות כרטיסים  | בית</title>

      </Head>

      <ClientLayout>
        <Heading variant='h3' textAlign={"center"} >ההופעות שלנו</Heading>
         <Flex direction={'row'} flexWrap={'wrap'}  >
          <MoviesList/>
        </Flex>
      </ClientLayout>
    </>
  )
}
import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'


export const getServerSideProps = (async (context) => {

  const nonce = context.res?.getHeader("x-nonce") as string
  return { props: { nonce } }
}) satisfies GetServerSideProps<{ nonce: string }>

export const dynamic = 'force-dynamic'
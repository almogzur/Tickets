import {  Button, Container ,Stack as Flex ,  Typography as Heading  } from '@mui/material'

import Head from 'next/head'
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

import {useGetMovies} from '../services/movies'
import { Movie } from '../constants/models/Movies';

export default function Home() {

  const { movies, isLoading, isError } = useGetMovies();

  const MoviesList = () => {
    if (movies) {
      return movies.map((movie: Movie) => (
     
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
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>

        <Heading variant='h3' textAlign={"center"} >ההופעות שלנו</Heading>
        <Flex direction={'row'} flexWrap={'wrap'}  >
          <MoviesList/>
       </Flex>

    </>
  )
}

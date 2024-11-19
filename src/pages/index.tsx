import { Grid, Button, Container ,Stack } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Image from 'next/image';
import Head from 'next/head'
import Link from 'next/link';
import Typography from '@mui/material/Typography';

import {useGetMovies} from '../services/movies'
import { Movie } from '../constants/models/Movies';
import { FcShare } from "react-icons/fc";




export default function Home() {
  const { movies, isLoading, isError } = useGetMovies();

  const MoviesList = () => {
    if (movies) {
      return movies.map((movie: Movie) => (
     
          <Link href={`/details/${movie.id}`} key={movie.id} >
               <Card sx={{ width: 300 , height:400,  m:1,  direction:"rtl" }}  >
                 <CardMedia><Image height={300} width={400} alt={movie.name} src={movie.cover.src} /></CardMedia>
                 <CardContent>
                   <Typography gutterBottom variant="h5" component="div">
                   {movie.name}
                   </Typography>
                   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {movie.adText}
                   </Typography>
                 </CardContent>
                 <CardActions>
            <Button  size="small">הזמנת כרטיסים</Button>
           <Button  size="small">{<FcShare size={"2em"} />}</Button>
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
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>

        <Typography variant='h3' textAlign={"center"} >ההופעות שלנו</Typography>
     <div style={{display:'flex' ,flexWrap:"wrap",  flexDirection:'row',
  
  
     
     }}>
       <MoviesList/>
       </div>

    </>
  )
}

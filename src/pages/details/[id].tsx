import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { Button } from '@mui/material';

import { Movie } from '../../constants/models/Movies'
import styles from './Details.module.scss'
import MoviesContext from '../../context/MoviesContext';
import { useContext } from 'react';

const Details = () => {  
  const { movies } = useContext(MoviesContext);
  const router = useRouter()
  const { id }: any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));

  const RenderBookTicketsButton = () => {
      return (
        <Link href={`/seats/${movie?.id}`}>
          <div className={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" className={styles.paymentButton} >
           הזמן כרטיס
            </Button>
          </div>
        </Link>
      )
  }


    
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>Details</title>
      </Head>
      <div className={styles.seatsContainer}>
        <h1>{movie.name}</h1>
        <div >מחיר לכרטיס  {movie.ticketCost}</div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonHolder}>
            <RenderBookTicketsButton />
          </div>
        </div>
      </div>
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default Details;
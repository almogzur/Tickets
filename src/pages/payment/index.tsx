import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { FaArrowRight } from "react-icons/fa";

import Link from 'next/link';

import { Movie, Seats } from '../../constants/models/Movies'
import styles from './Payment.module.scss'
import MoviesContext from '../../context/MoviesContext';

const Tickets = () => {
  const { movies, setMovies } = useContext(MoviesContext);
  const router = useRouter();
  const [seconds, setSeconds] = useState(5);
  const [isTimerCompleted, setIsTimerCompleted] = useState(false);
  let movieSeatDetails: Seats = {};
  let bookingChargePerTicket = 20, ticketCost: number, bookingFee: number, totalCost: number;
  const {movieId, seatDetails}: any = router.query;
  const movie = movies.find(mov => mov.id === parseInt(movieId));

  if (seatDetails) {
    movieSeatDetails = JSON.parse(seatDetails);
  }



  const computeSelectedSeats = () => {
    let selectedSeats: string[] = [];
    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex+1}`)
        }
      })
    }
    return selectedSeats;
  }

  const SeatDetails = ({selectedSeats}: {selectedSeats: string[]}) => {
    ticketCost = selectedSeats.length*(movie?.ticketCost||0);
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(', ')} ({selectedSeats.length} Tickets)
        </div>
        <div className={styles.seatCost}>
          Rs.{ticketCost}
        </div>
      </div>
  )}

  const BookingCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    bookingFee = selectedSeats.length * bookingChargePerTicket;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Booking Charge
        </div>
        <div className={styles.seatCost}>
          Rs.{bookingFee}
        </div>
      </div>
  )}

  const TotalCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    totalCost = ticketCost + bookingFee;
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Total
        </div>
        <div className={styles.seatCost}>
          Rs.{totalCost}
        </div>
      </div>
  )}

  const modifiedSeatValue = () => {
    let newMovieSeatDetails = {...movieSeatDetails};
    for(let key in movieSeatDetails) {
      movieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    return newMovieSeatDetails;
  }

  const onConfirmButtonClick = async () => {
    let movieIndex = movies.findIndex(mov => mov.id === parseInt(movieId));
    if (movieIndex !== -1 && setMovies) {
      movies[movieIndex].seats = modifiedSeatValue();
      console.log(movies);
      setMovies(movies);
      router.push('/');
    }
  }

  const ConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button  disabled={isTimerCompleted} className={styles.paymentButton} onClick={onConfirmButtonClick}>
         {isTimerCompleted ? 'Confirm Booking' : `Confirm Booking (${seconds})` }
        </Button>
      </div>
    )
  }

  const Card = () => {
    let selectedSeats: string[] = computeSelectedSeats();
    
    if (!movie) return <div>loading...</div>
    return (
    <div className={styles.card}>
      <div className={styles.cardTitleContainer}>
        <Link href={{ pathname: `/seats/${movie?.id}`, query: { seats: isTimerCompleted ? null : JSON.stringify(seatDetails) }}}><FaArrowRight /></Link>
        <div className={styles.cardTitle}>
            סיכום הזמנה 
        </div>
      </div>
        <p className={styles.movieName}>{movie.name}</p>
      <SeatDetails selectedSeats={selectedSeats}/>
      <BookingCharge selectedSeats={selectedSeats}/>
      <hr className={styles.hrStyle}/>
      <TotalCharge selectedSeats={selectedSeats}/>
      <ConfirmButton />
    </div>
    )
  }
  
  return (
    <>
      <Head>
        <title>דף תשלום</title>
      </Head>
      <div className={styles.container}>
        <Card />
      </div>
    </>
  );
}
 
type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}

export default Tickets;
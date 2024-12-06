import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { FaArrowRight } from "react-icons/fa";

import Link from 'next/link';

import { Event, Seats } from '../../constants/models/Events'

import styles from './Payment.module.scss'

import MoviesContext from '../../context/Events';
import ClientLayout from '../../Layouts/client-layout';

const Tickets = () => {
  const { events, setEvents } = useContext(MoviesContext);

  const router = useRouter();

  const {movieId,selectedSeatsQuery}: any = router.query;

  const event = events.find((mov) => mov.id === parseInt(movieId));

  const [movieSeatDetails,setMovieSeatDetails]= useState(event?.mainSeats );

  const selectedSeats = selectedSeatsQuery ?  JSON.parse(selectedSeatsQuery) : null

useEffect(()=>{
   console.log(event);
},[])

  const SeatDetails = ({selectedSeats}: {selectedSeats: string[]}) => {
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          {selectedSeats.join(', ')} ({selectedSeats.length} כרטיסים)
        </div>
        <div className={styles.seatCost}>
          שח.{}
        </div>
      </div>
  )}

  const TotalCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    return (
      <div className={styles.seatDetailsContainer}>
        <div className={styles.seatDetails}>
          Total
        </div>
        <div className={styles.seatCost}>
          שח.{}
        </div>
      </div>
  )}

  const modifiedSeatValue = () => {
    
    let newMovieSeatDetails = {...movieSeatDetails};

    for(let key in newMovieSeatDetails) {
      console.log(newMovieSeatDetails[key]);
      

      newMovieSeatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          movieSeatDetails[key][seatIndex] = 1;
        }
      })
    }
    setMovieSeatDetails (newMovieSeatDetails)

  }


  const confirm = async () => {
    modifiedSeatValue()
      router.push('/');
    }
  

  const ConfirmButton = () => {
    return (
      <div className={styles.paymentButtonContainer}>
        <Button   className={styles.paymentButton} onClick={ confirm   }>
         { `Confirm Booking ()` }
        </Button>
      </div>
    )
  }

  const Card = () => {
   
    
    if (!event) return <div>loading...</div>
    return (
    <div className={styles.card}>
      <div className={styles.cardTitleContainer}>
        <Link href={{ pathname: `/details/${event?.id}`, query: { seats:  JSON.stringify(selectedSeats) }}}><FaArrowRight /></Link>
        <div className={styles.cardTitle}>
            סיכום הזמנה 
        </div>
      </div>
        <p className={styles.movieName}>{event.name}</p>
      <SeatDetails selectedSeats={selectedSeats}/>
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
      <ClientLayout>
      <div className={styles.container}>
        <Card />
      </div>
      </ClientLayout>
    </>
  );
}
 


export default Tickets;
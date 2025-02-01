import { useState, useEffect, useContext } from 'react';
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Button } from '@mui/material'
import { FaArrowRight } from "react-icons/fa";

import Link from 'next/link';
import ClientLayout from '@/Layouts/client-layout';



const Tickets = () => {

  const router = useRouter();

  const {movieId,selectedSeatsQuery}: any = router.query;



  const selectedSeats = selectedSeatsQuery ?  JSON.parse(selectedSeatsQuery) : null


  const SeatDetails = ({selectedSeats}: {selectedSeats: string[]}) => {
    return (
      <div >
        <div >
          {selectedSeats.join(', ')} ({selectedSeats.length} כרטיסים)
        </div>
        <div >
          שח.{}
        </div>
      </div>
  )}

  const TotalCharge = ({selectedSeats}: {selectedSeats: string[]}) => {
    return (
      <div >
        <div >
          Total
        </div>
        <div >
          שח.{}
        </div>
      </div>
  )}

  // const modifiedSeatValue = () => {
    
  //   let newMovieSeatDetails = {...movieSeatDetails};

  //   for(let key in newMovieSeatDetails) {
  //     console.log(newMovieSeatDetails[key]);
      

  //          newMovieSeatDetails[key].forEach((seatValue, seatIndex) => {
  //       if (seatValue === 2) {
  //         movieSeatDetails[key][seatIndex] = 1;
  //       }
  //     })
  //   }
  //   setMovieSeatDetails (newMovieSeatDetails)

  // }


  // const confirm = async () => {
  //   modifiedSeatValue()
  //     router.push('/');
  //   }
  

  const ConfirmButton = () => {
    return (
      <div >
        <Button    > {/*onClick={ confirm   }*/}
         { `Confirm Booking ()` }
        </Button>
      </div>
    )
  }

  const Card = () => {
   
    
    return (
    <div >
      <div >
        <Link href={{ pathname: `/details/`, query: { seats:  JSON.stringify(selectedSeats) }}}><FaArrowRight /></Link>
        <div >
            סיכום הזמנה 
        </div>
      </div>
        <p> </p>
      <SeatDetails selectedSeats={selectedSeats}/>
      <hr />
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
      <ClientLayout HeaderName={''}>
      <div >
        <Card />
      </div>
      </ClientLayout>
    </>
  );
}
 


export default Tickets;
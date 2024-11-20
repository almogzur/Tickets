import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties } from 'react'
import { Button, Container, Typography , Box, colors } from '@mui/material';
import WidthContext from '../../context/WidthContext';
import { Movie, Seats } from '../../constants/models/Movies'

import MoviesContext from '../../context/MoviesContext';

const styles :Record<string,CSSProperties> =  {

  seats: {
    WebkitUserSelect: "none", /* Chrome/Safari */
    MozUserSelect: "none", /* Firefox */
    msUserSelect: "none", /* IE10+ */
    userSelect: "none",
    cursor: "pointer",
    backgroundColor: "silver",
    fontSize: "12px",
    fontWeight: "700",

    borderRadius: "3px",
    height:"25px",
    width:"25px",
    display:'flex',
    flexDirection:'column',
    justifyContent:'center',
    alignItems:'center',
    

  },
  seatSelected: {
    color: "#fff",
    backgroundColor: "rgb(53, 212, 6)",
  },
  seatBlocked: {
    cursor: "default",
    color:"black",
    boxShadow: "none",
    background:"black"
  },
  seatBooked: {
    backgroundColor: "brown",
    cursor: "default",
  },
  paymentButton: {
    backgroundColor: "#f84464",
  },
  paymentButtonContainer: {
    position: "sticky",
    bottom: "10px",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: "5px", // spacing between rows
    overflow:"inherit"
  },
  col: {
    margin: "3px", // spacing between seats
  },
  rowContainer: {
    display: "flex",
    justifyContent:"center"
  },
  rowLabel: {
    fontSize: "18px",
    fontWeight: "bold",
    margin:4
    
   
  "opera1-row1":{ },
  "opera1-row2":{},


   "opera2-row1":{},
   "opera2-row2":{},
   "opera2-row3":{},
   "opera2-row4":{},
   "opera2-row5":{},
   "opera2-row6":{}

  
};

const SeatsOri = () => {
  const { movies } = useContext(MoviesContext);
  const router = useRouter();
  let selectedSeats: string[] = [];
  const { id, seats }: any = router.query;
  const movie = movies.find((mov) => mov.id === parseInt(id));
  const [seatDetails, setSeatDetails] = useState<Seats>(movie?.seats || {});

   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
   
  useEffect(() => {
    if (!seats) {
      clearSelectedSeats();
    }
  }, []);

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      });
    }
    setSeatDetails(newMovieSeatDetails);
  };

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {
    if (seatDetails) {
      if (seatValue === 1 || seatValue === 3) {
        return;
      } else if (seatValue === 0) {
        seatDetails[key][rowIndex] = 2;
      } else {
        seatDetails[key][rowIndex] = 0;
      }
    }
    setSeatDetails({ ...seatDetails });
  };

  const getSeatStyle = (seatValue: number) :any => {
    if (seatValue === 0) return styles.seats;
    if (seatValue === 1) return { ...styles.seats, ...styles.seatBooked };
    if (seatValue === 2) return { ...styles.seats, ...styles.seatSelected };
    return { ...styles.seats, ...styles.seatBlocked };
  };

 

  // const RenderSeats = () => {
  //   let seatArray = [];
  //   for (let row in seatDetails) {
  //     let colValue = seatDetails[row].map((seatValue, rowIndex) => (

  //       <div 
  //         key={`${row}.${rowIndex}`} 
  //          style={styles.col}>
  //         <div
  //           style={getSeatStyle(seatValue)}
  //           onClick={() => onSeatClick(seatValue, rowIndex, row)}
  //         >
  //           {rowIndex + 1}
  //         </div>
  
  //         {seatDetails && rowIndex === seatDetails[row].length - 1 && (
  //           <>
  //             <div style={{ height: "20px" }}></div>
  //           </>
  //         )}
  //       </div>
  //     ));
  //     seatArray.push(
  //       <div key={`row-${row}`} style={styles.row}>
  //         {colValue}
  //       </div>
  //     );
  //   }
  //   return <div style={{zoom: !xs ? "33%" : "100%"}}>{seatArray}</div>;
  // };

  const Seats = () => {
    let seatArray = [];
  
    for (let row in seatDetails) {
      let colValue = seatDetails[row].map((seatValue, rowIndex) => (
        <div 
          key={`${row}.${rowIndex}`} 
          style={styles.col}
        >
          <div
            style={getSeatStyle(seatValue)}
            onClick={() => onSeatClick(seatValue, rowIndex, row)}
          >
            {rowIndex + 1}
          </div>
  
          {seatDetails && rowIndex === seatDetails[row].length - 1 && (
            <div style={{ height: "20px" }}></div>
          )}
        </div>
      ));
  
      seatArray.push(
        <div key={`row-${row}`} style={styles.rowContainer}>
          {/* Row label */}
          <div style={styles.rowLabel}>
            {row}
          </div>

          {/* Row seats */}
          <div style={styles.row}>
            {colValue}
          </div>
          
       {/* Row label */}
          <div style={styles.rowLabel}>
            {row}
          </div>
        </div>
      );
    }
  
    return <div style={{ zoom: !xs ? "30%" : "100%" }}>{seatArray}</div>;
  };

  const PaymentButton = () => {
    selectedSeats = [];
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue, seatIndex) => {
        if (seatValue === 2) {
          selectedSeats.push(`${key}${seatIndex + 1}`);
        }
      });
    }
    if (selectedSeats.length) {
      return (
        <Link
          href={{
            pathname: "/payment",
            query: { movieId: movie?.id, seatDetails: JSON.stringify(seatDetails) },
          }}
        >
          <div style={styles.paymentButtonContainer}>
            <Button variant="contained" href="#contained-buttons" style={styles.paymentButton}>
              Pay Rs.{selectedSeats.length * (movie?.ticketCost || 0)}
            </Button>
          </div>
        </Link>
      );
    } else {
      return <></>;
    }
  };

  if (!movie) return <div>טוען...</div>;
  return (
    <>
      <Head>
        <title>מקומות ישיבה באולם</title>
      </Head>
      <div style={{overflow:"auto"}} >
        <h1 style={{textAlign:"center"}} >{movie.name}</h1>
        <h3 style={{textAlign:"center"}}  >מקומות ישיבה באולם</h3>
        {seatDetails && <Seats />}
        <PaymentButton />
      </div>
    </>
  );
};



type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default SeatsOri;
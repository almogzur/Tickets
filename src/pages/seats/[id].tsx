import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties } from 'react'
import { Button, Container,   Box ,Flex , Text, Heading} from '@chakra-ui/react'
import WidthContext from '../../context/WidthContext';
import { Movie, Seats } from '../../constants/models/Movies'

import MoviesContext from '../../context/MoviesContext';

const styles :Record<string,CSSProperties> =  {

  seats: {

    userSelect: "none",
    cursor: "pointer",
    backgroundColor: "silver",
    fontSize: "12px",
    fontWeight: "700",
    borderRadius: "3px",
    height:"25px",
    width:"25px",
    color:"black"

    

  },
  seatSelected: {
    backgroundColor: "rgb(53, 212, 6)",
  },
  seatBlocked: {
    cursor: "default",
    color:"black",
 

  },
  seatBooked: {
    backgroundColor: "brown",
    cursor: "default",
  },
  paymentButton: {
    backgroundColor: "#f84464",
  },

  "sing1-row1":{ position:"relative", top:'-663px', left:"-75px", },
  "sing1-row2":{ position:"relative", top:'-663px' ,left:"-78px"  },

  "sing2-row1":{ position:"relative", top:"-330px" ,left:"-145px", },
  "sing2-row2":{ position:"relative", top:"-330px" ,left:"-150px"  },

  "sing3-row1":{ position:"relative", top:"-100px" ,left:"-170px", },
  "sing3-row2":{ position:"relative", top:"-100px" ,left:"-235px"  },

  "comad1-row1":{ position:"relative", top:"-663px" ,left:"1020px"  },
  "comad1-row2":{ position:"relative", top:"-663px" ,left:"1015px"  },

  "comad2-row1":{ position:"relative", top:"-328px" ,left:"950px", },
  "comad2-row2":{ position:"relative", top:"-328px" ,left:"945px", },

  "comad3-row1":{ position:"relative", top:"-100px" ,left:"880px", },
  "comad3-row2":{ position:"relative", top:"-100px" ,left:"875px",  },

   
  "opera1-row1": {position:"relative", display:"flex" ,top:"50px" , left:"40px"},
  "opera1-row2": {position:"relative", display:"flex" ,top:"90px", left:"-275px"},


 
   "opera2-row1":{position:"relative", display:"flex" ,top:"130px" , left:""},
   "opera2-row2":{position:"relative", display:"flex" ,top:"170px" , left:""},
   "opera2-row3":{position:"relative", display:"flex", top:"210px" , left:"" },
   "opera2-row4":{display:"flex" ,top:"" , left:""},
   "opera2-row5":{display:"flex" ,top:"" , left:""},
   "opera2-row6":{display:"flex" ,top:"" , left:""}

  
};

const SeatsOri = () => {
  const { movies } = useContext(MoviesContext);
  const router = useRouter();
  let selectedSeats: string[] = [];
  const { id, seats }: any = router.query;
  const movie = movies.find((mov) => mov.id === parseInt(id));
  const [seatDetails, setSeatDetails] = useState<Seats>(movie?.seats || {});
  const [sidesSeats ,setSideSeats] = useState<Seats>(movie?.sidesSeats || {})

   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
   
  useEffect(() => {
    if (!seats) {
      clearSelectedSeats();
    }
  }, []);

  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...seatDetails };
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue: number, seatIndex: string | number) => {
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

  // const Seats = () => {
  //   let seatArray = [];
  
  //   for (let row in seatDetails) {
  //     let colValue = seatDetails[row].map((seatValue: number, rowIndex: number) => (
  //       <div 
  //         key={`${row}.${rowIndex}`} 
  //         style={styles.col}
  //       >
  //         <div
  //           style={getSeatStyle(seatValue)}
  //           onClick={() => onSeatClick(seatValue, rowIndex, row)}
  //         >
      
  //         </div>
  
  //         {seatDetails && rowIndex === seatDetails[row].length - 1 && (
  //           <div style={{ height: "20px" }}></div>
  //         )}
  //       </div>
  //     ));
  
  //     seatArray.push(
  //       <div key={`row-${row}`} style={styles.rowContainer}>
 
  //          <div style={styles.row}> {colValue}</div>
          
  
  //       </div>
  //     );
  //   }
  
  //   return <div style={{ zoom: !xs ? "30%" : "70%" }}>{seatArray}</div>;
  // };
 
 
  const Seats = () => {
    let seatArray = [];
    let sideSeatArray = [];

    // Render main seats
    for (let row in seatDetails) {
        const rowContent = seatDetails[row];

        const colValue = rowContent.map((seatValue: number, colIndex: number) => (
  

                <Flex 
                      justifyContent={"center"} 
                      key={`${row}.${colIndex}`}
                      alignItems={"center"} 
                    style={{...getSeatStyle(seatValue) , margin:4 , fontWeight:"bold"}}
                    onClick={() => onSeatClick(seatValue, colIndex, row)}
                    
                >
                  {colIndex + 1}
                </Flex>
                  
    
                
     
        ));

        seatArray.push(
             <Flex key={row} justifyContent={"center"} alignItems={"center"}  >
                <Text fontWeight={"bold"} color={"red"} >{row}</Text>
                {colValue}
                <Text fontWeight={"bold"} color={"red"} >{row}</Text>
            </Flex>
        );
    }

    // Render side seats
    for (let sideRow in sidesSeats) {
        const rowContent = sidesSeats[sideRow];

        const colValue = rowContent.map((seatValue: number, colIndex: number) => {
       
                   return <Flex justifyContent={"center"}
                            key={`${sideRow}.${colIndex}`} 
                            style={{...getSeatStyle(seatValue), margin:"5px" , color:"black"}}
                          >
                           {colIndex + 1}
                          </Flex> 
                
          
              })
        

        sideSeatArray.push(
            <div style={styles[`${sideRow}`]}  key={sideRow}>{colValue}{} </div>
        );
    }
  
    
    return (
      < Flex justifyContent={"center"}       >
          
          <Box borderColor={"lightblue"}   border={"solid"}  p={20} zoom={"100%"} >
            
            <Box bg={"blue"} h={"60px"} position={"relative"} top={"-50px"}   >זום</Box>
            <Box bg={"red"} h={"60px"} position={"relative"} top={"-20px"}  >במה</Box>

             {/* reg row */}
              <Flex direction={"column"}>{seatArray}</Flex> 
             {/* custom row */}
              <Flex width={1000}   >{sideSeatArray}</Flex>  
             {/* Fixed width to prevent flex prevnt overflow */}

             <PaymentButton />

          </Box>

          

       </Flex>

    );
};

// Styles




  const PaymentButton = () => {
    selectedSeats = [];
    for (let key in seatDetails) {
      seatDetails[key].forEach((seatValue: number, seatIndex: number) => {
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
              סה״כ  {selectedSeats.length * (movie?.ticketCost || 0) + " שח"}
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

        <Heading textAlign={"center"} size={"5xl"} >{movie.name}</Heading>
        <Heading p={3} as={'h3'} textAlign={"center"}  >מקומות ישיבה באולם</Heading>

        { seatDetails && 
                     <Seats /> 
        }


    </>
  );
};



type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default SeatsOri;
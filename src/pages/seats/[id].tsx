import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef } from 'react'
import { Button, Container,   Box ,Flex , Text, Heading} from '@chakra-ui/react'
import WidthContext from '../../context/WidthContext';
import { Movie, Seats } from '../../constants/models/Movies'

import Tippy from '@tippyjs/react';

import MoviesContext from '../../context/MoviesContext';

const positionAtr : CSSProperties = { 
   position:"relative",
   width:"fit-content",
   display:"flex"
 }

const styles :Record<string,CSSProperties> =  {

  seats: {

    userSelect: "none",
    cursor: "pointer",
    backgroundColor: "silver",
    fontSize: "12px",
    fontWeight: "700",

    height:"27px",
    width:"27px",
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
    ...positionAtr,
    top:-1300
  },
  clearBtn:{...positionAtr, top:"-1250px", color:"black"},
   

   "שירה-שורה1":{  top:-660, left:-40 ,  flexDirection:"column", ...positionAtr },
   "שירה-שורה2":{  top:-825 ,left:-70 , flexDirection:"column" , ...positionAtr  ,},

   "שירה2-שורה1":{  top:-600 ,left:-40, flexDirection:"column", ...positionAtr },

   "שירה2-שורה2":{  top:-732 ,left:-70 ,flexDirection:"column" ,...positionAtr},

   "שירה3-שורה1":{ ...positionAtr, flexDirection:"column" ,    top:0 , left:0,},
   "שירה3-שורה2":{ position:"relative",  top:0 , left:0,},
   "בידר1-שורה1": { position:"relative", top:0 , left:0 },
   "בידור1-שורה2":{ position:"relative", top:0 , left:0 },
   "בידור2-שורה1":{ position:"relative", top:0 , left:0,},
   "בידור2-שורה2":{ position:"relative", top:0 , left:0,},
   "בידור3-שורה1":{ position:"relative", top:0 , left:0,},
   "בידור3-שורה2":{ position:"relative", top:0 , left:0,},
   

   "אופרה-קומה1-שורה1":{position:"relative" ,top:0 , left:0 , width:"fit-content" ,height:"fit-content"},
   "אופרה-קומה1-שורה2": {position:"relative", display:"flex" ,top:0 , left:-0 , width:"fit-content" ,height:"fit-content"},


   "אופרה-קומה2-שורה1": {position:"relative", display:"flex" ,top:0 , left:0, width:"fit-content" ,height:"fit-content"},
   "אופרה-קומה2-שורה2":{position:"relative", display:"flex" ,top:0 , left:-0, width:"fit-content" ,height:"fit-content"},
   "אופרה-קומה2-שורה3": {position:"relative", display:"flex", top:0 , left:0 , width:"fit-content" ,height:"fit-content"},


  
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

      seatDetails[key].forEach((seatValue: number, seatIndex:  number) => {
        console.log(key);
        
        if (seatValue === 2) {
          seatDetails[key][seatIndex] = 0;
        }
      });
    }
    

    setSeatDetails(newMovieSeatDetails);
  };

  const getSeatStyle = (seatValue: number) :any => {
    if (seatValue === 0) return styles.seats;
    if (seatValue === 1) return { ...styles.seats, ...styles.seatBooked };
    if (seatValue === 2) return { ...styles.seats, ...styles.seatSelected };
    return { ...styles.seats, ...styles.seatBlocked };
  };

  const onSeatClick = (seatValue: number, rowIndex: number, key: string) => {

    setSeatDetails((prevSeatDetails) => {
      if (!prevSeatDetails) return prevSeatDetails;
  
      // Create a deep copy of the state to avoid direct mutation
      const updatedSeatDetails = { ...prevSeatDetails };

      const updatedRow = [...updatedSeatDetails[key]];
  
      if (seatValue === 1 || seatValue === 3) {
        return prevSeatDetails; // No changes if the seat is unavailable or already selected
      }
  
      // Toggle seat state: 0 to 2 or 2 to 0
      updatedRow[rowIndex] = seatValue === 0 ? 2 : 0;
  
      updatedSeatDetails[key] = updatedRow;
  
      return updatedSeatDetails; // Return the new state object
    });
  };
 
  const Seats = () => {

    let seatArray = [];
    // Render main seats
    for (let row in seatDetails) {
        const rowContent = seatDetails[row];


        const colValue = rowContent.map((seatValue: number, colIndex: number) => (
          
            //  <Tippy
            //        content={<p>text</p>} 
            //        key={`${row}.${colIndex}`}
            //        hideOnClick="toggle"
    
            //        touch={["hold",1]}
             
            //       >
            //        <button 
            //             key={`${row}.${colIndex}`}
            //             id={`${row}.${colIndex}`}
            //             style={{...getSeatStyle(seatValue) , margin:4 , fontWeight:"bold"}}
            //             onClick={() => onSeatClick(seatValue, colIndex, row)}
            //       >
            //         {/* {colIndex + 1} */}

            //       </button>
            //  </Tippy>
      
            //  Wraper for state to keep the seate tooltip opn 

           <SeatWithTooltip
              key={`${row}.${colIndex}`}
              seatValue={seatValue}
              colIndex={1}
              row={row}
              getSeatStyle={() => getSeatStyle(seatValue)}
              hndler={()=>onSeatClick(seatValue, colIndex, row)}
           />   


         


                 
        )
      );
        seatArray.push(
     
             <Flex 
                key={row} 
                style={styles[`${row}`]} // target by key in css 
                justifyContent={"center"} 
                >
                {colValue}
            </Flex>
         
        );
    }


  
    return (
      <Flex justifyContent={"center"}   
        >
        <Box borderColor={"lightblue"} overflow={"clip"}  h={"1100px"}  border={"solid"}  p={20} zoom={"100%"} >


            <Box bg={"blue"} h={"60px"} position={"relative"} top={"-50px"}   >זום</Box>
            <Box bg={"red"} h={"60px"} position={"relative"} top={"-20px"}  >במה</Box>
         
             {/* reg row */}
              <Flex direction={"column"}>{seatArray}</Flex> 
             {/* custom row */}
             <PaymentButton />
            <ResetSelectedSeats/>

     

        </Box>
      </Flex>

    );
};

const PaymentButton = () => {
  selectedSeats = [];

  // Loop through seatDetails
  for (let key in seatDetails) {
    seatDetails[key].forEach((seatValue: number, seatIndex: number) => {
      if (seatValue === 2) {
        selectedSeats.push(`${key}${seatIndex + 1}`);
      }
    });
  }



  if (selectedSeats.length ) {
    return (
      <Link
        href={{
          pathname: "/payment",
          query: {
            movieId: movie?.id,
            seatDetails: JSON.stringify(seatDetails),
 
          },
        }}
     
      >
  
          <Button variant="solid" style={styles.paymentButton}>
            סה״כ {selectedSeats.length * (movie?.ticketCost || 0) + " שח"}
          </Button>

      </Link>
    );
  } else {
    return <></>;
  }
};

const ResetSelectedSeats =()=>{
  selectedSeats = [];

  for (let key in seatDetails) {
    seatDetails[key].forEach((seatValue: number, seatIndex: number) => {
      if (seatValue === 2) {
        selectedSeats.push(`${key}${seatIndex + 1}`);
      }
    });
  }

  if (selectedSeats.length) {
   return <Button 
        style={styles.clearBtn} 
        bg={"#fff"} 
        size={"2xl"}

     
         variant={"solid"}
         colorPalette={""} 
        onClick={clearSelectedSeats} >
        נקה בחירה
       </Button>
  }else{return <></>}
}


  if (!movie) return <div>טוען...</div>;
  return (
    <>
      <Head>
        <title>מקומות ישיבה באולם</title>
      </Head>

        <Heading textAlign={"center"} size={"4xl"} >{movie.name}</Heading>
        <Heading p={0} as={'h3'} textAlign={"center"}  >מקומות ישיבה באולם</Heading>

        { seatDetails && <Seats /> }


    </>
  );
};


 
export default SeatsOri

const SeatWithTooltip = ({
  seatValue,
  colIndex,
  row,
  getSeatStyle,
  hndler
}:
{
    seatValue:number ,
    colIndex:number ,
    row:string,
    getSeatStyle:Function,
    hndler:any
  }) => {
  
  const [tooltipVisible, setTooltipVisible] = useState(false);

  const openTooltip = () => setTooltipVisible(true);
  const closeTooltip = () => setTooltipVisible(false);

  
  return (
    
    <Tippy
      content={<p>text</p>}
      visible={tooltipVisible}
      interactive

    >
      <button
        key={`${row}.${colIndex}`}
        style={{ ...getSeatStyle(seatValue), margin: 4, fontWeight: "bold" }}
        onMouseEnter={()=>{openTooltip()}}
        onMouseLeave={()=>{closeTooltip()}}

        onTouchStart={()=>openTooltip()}
 
        
        onClick={(e)=>{
   
          hndler()

        }
        
         
        
        
        }
      >
        {/* {colIndex + 1} */}
      </button>
    </Tippy>
  );
};
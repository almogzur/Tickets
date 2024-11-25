import Head from 'next/head'
import Link from 'next/link';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import { Button, Box ,Flex , Heading, Container} from '@chakra-ui/react'
import { Movie } from '../../constants/models/Movies'
import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import MoviesContext from '../../context/MoviesContext';
import DisableZoom from '../../lib/hooks/useDisablePinchZoomEffect'
import TooltopButton from '../../components/tooltip-btn'
import WidthContext from '../../context/WidthContext';
import positionContext from '../../context/position-context';

const positionAtr : CSSProperties = { 
   position:"relative",
   width:"fit-content",
   height:"fit-content",
   display:"flex",
   flexDirection:"column"
 }



const MovePage = () => {
  const { movies } = useContext(MoviesContext);
  const router = useRouter();
  const { id, seats }: any = router.query;
  const movie = movies.find((mov) => mov.id === parseInt(id));
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const  [selectedSeats,setSlectedSeats ]= useState ([])
  const [seatDetails,setSeatDetails]= useState(movie?.seats || []);
  
  const styles :Record<string,CSSProperties> =  {
    seats: {
      backgroundColor: "silver",
      height:"4px",
      width:"4px",
      color:"black",
      margin:2 ,
      fontWeight:"bold",
      borderRadius:"45%",
      
    },
  
    seatSelected: {backgroundColor: "rgb(53, 212, 6)",},
    seatBlocked: {color:"black"},
    seatBooked: {backgroundColor: "brown",cursor: "not-allowed"},
   
    stage:{          
     height:40 ,
      margin:20,
       background:"silver",
        color:"red",
        width:"50%",
        borderBottomLeftRadius: "45%",
         borderBottomRightRadius:"45%" ,
         display:'flex',
         flexDirection:'row',
         justifyContent:'center',
         alignItems:'center',
         alignContent:'center',
         },
  
    paymentButton: {},
    clearBtn:{   ...positionAtr,    color:"black"},
    "שירה-שורה1": {top:-0, left:100 ,   ...positionAtr },  
    "שירה-שורה2": {top:-0 ,left:30 ,   ...positionAtr  ,},
  
    "שירה2-שורה1": {top:-0 ,left:100, ...positionAtr},
    "שירה2-שורה2": {top:-1838 ,left:30 ,...positionAtr},
  
    "שירה3-שורה1":{top:-1540 , left:100, ...positionAtr},
    "שירה3-שורה2":{  top:-1850 , left:30, ...positionAtr},
  
     
    "בידר1-שורה1": {  top:-3543 , left:3060 , ...positionAtr },
    "בידור1-שורה2":{  top:-3925 , left:3155, ...positionAtr },
  
    "בידור2-שורה1":{  top:-1560 , left:1265 ,...positionAtr},
    "בידור2-שורה2":{  top:-1699 , left:1295 ,...positionAtr},
  
    "בידור3-שורה1":{ top:-1570 , left:1265, ...positionAtr},
    "בידור3-שורה2":{  top:-1710 , left:1295, ... positionAtr},
  
    "אופרה-קומה1-שורה1":{top:-1800 , left:475 , ...positionAtr,flexDirection:"row"},
    "אופרה-קומה1-שורה2": {top:-1800 , left:475 ,...positionAtr,flexDirection:"row"},
  
    "אופרה-קומה2-שורה1":{ top:-1775 , left:485, ...positionAtr,flexDirection:"row"},
    "אופרה-קומה2-שורה2":{ top:-1775 , left:455, ...positionAtr,flexDirection:"row"},
    "אופרה-קומה2-שורה3":{ top:-1775 , left:485, ...positionAtr,flexDirection:"row"},
      
   };  
   const getSeatStyle = (seatValue: number) :any => {
  
  // console.log("geting style" , seatValue);
  
  
  if (seatValue === 0) return styles.seats;
  if (seatValue === 1) return { ...styles.seats, ...styles.seatBooked };
  if (seatValue === 2) return { ...styles.seats, ...styles.seatSelected };
  return { ...styles.seats, ...styles.seatBlocked };
   }
  const hendler = (seatValue: number, seatNumber: number, row: string) => {
  setSeatDetails((prevSeatDetails) => {
    if (!prevSeatDetails) return prevSeatDetails;

    // Create a deep copy of the current seat details
    const updatedSeatDetails = { ...prevSeatDetails };
    const updatedRow = [...updatedSeatDetails[row]];

    // No changes for unavailable or already selected seats
    if (seatValue === 1 || seatValue === 3) {
      return prevSeatDetails; // No update
    }

    // Toggle seat state: 0 to 2 or 2 to 0
    const newSeatValue = seatValue === 0 ? 2 : 0;
    if (updatedRow[seatNumber] === newSeatValue) {
      return prevSeatDetails; // Avoid unnecessary state updates
    }

    updatedRow[seatNumber] = newSeatValue;
    updatedSeatDetails[row] = updatedRow;

    // Update the selected seats array
    setSlectedSeats((prevSelectedSeats) => {
      const seatKey = `${row}-${seatNumber}`;
      const isAlreadySelected = prevSelectedSeats.includes(seatKey);

      if (isAlreadySelected) {
        // Remove the seat if already selected
        return prevSelectedSeats.filter((seat) => seat !== seatKey);
      }

      // Add the seat if not already selected
      return [...prevSelectedSeats, seatKey];
    });

    return updatedSeatDetails; // Return updated state
  });
};
  const Seats = () => {

    let seatArray = [];

    for (let row in seatDetails) {
      
       const rowContent = seatDetails[row];   

       const colValue = rowContent.map((seatValue:number,i:number) => {
       const textset = "מושב"
       const textrow= "שורה"
           

     return <TooltopButton
              key={`${row}.${i}`}
              row={row}
              seatnumber={i}
              initValue={seatValue}
              hendler={hendler}
              title={` ${row.includes(textrow) ? "" : textrow} ${row} ${textset}:${[i]}`}
              Style={getSeatStyle(seatValue)}          
              i={i}           
               />  
       }
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

        
            <Container      direction={"column"} border={"solid"}>
                 <TranspormComponenr>
                   <Flex  direction={"column"} border={"solid"} p={10}  height={!xs? 400 : 600} w={"inherit"} overflow={"clip"} >
      
                      <Flex justifyContent={"center"}> 
                        <Stage style={styles.stage} />
                     </Flex > 
                      {seatArray}           
                  </Flex> 
                </TranspormComponenr>
            </Container>




    );
};

  const ResetSelectedSeats =()=>{



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
  const clearSelectedSeats = () => {
    let newMovieSeatDetails = { ...refedSeatDetails };

    for (let key in refedSeatDetails.current) {

      refedSeatDetails.current[key].forEach((seatValue: number, seatIndex:  number) => {
        
        if (seatValue === 2) {
          refedSeatDetails.current[key][seatIndex] = 0;
        }
      });
    }
    

    refedSeatDetails.current = newMovieSeatDetails;
};

if (!movie) return <div>טוען...</div>;
   return (
    <>
      <Head>
        <title>מקומות ישיבה באולם</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>

      </Head>

        <Heading textAlign={"center"} size={"2xl"} >{movie.name}</Heading>
        <Heading p={0} as={'h3'} textAlign={"center"}  >מקומות ישיבה באולם</Heading>
        
         <Seats /> 
        
        { selectedSeats && 
        <PaymentButton Selected={selectedSeats}  style={styles.paymentButton} movie={movie} />}
        <ResetSelectedSeats/>
        <Box w={"inherit"} h={"300px"} bg={"green"} ></Box>
 
    </>
  );
};







const TranspormComponenr = ({children}) => {
  
  const {x,y,S, setS , setY , setX } =useContext(positionContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  return (
    <TransformWrapper
      initialScale={S||1}
      initialPositionX={x||0}
      initialPositionY={y||0}
      smooth
     p
    
      

      onPanningStop={(e)=>{
        setY(e.state.positionY)
        setX(e.state.positionX)
        setS(e.state.scale)
      }}
   
       onTransformed={(e)=>{
        //console.log(e.state)

        ;
       }}
 
       
    
      
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
                 
              
              
        return   (
          <div>
          <Controls/>
          
           
             <TransformComponent 
                  wrapperStyle={{border:"red solid" , width:"inherit"}}  
                  
                >
               {children }
             </TransformComponent>
             </div>
          
   
      )
}

      }
    </TransformWrapper>
  );
};


const Controls = () => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <Flex justifyContent={"center"} >
      <Button  height={70} onClick={(e) => {zoomIn()}}>+</Button>
      <Button    height={70} onClick={(e) =>{zoomOut() }}>-</Button>
      <Button   height={70} onClick={(e) =>{resetTransform() }}>x</Button>
    </Flex>
  );
};


const PaymentButton = ({Selected , movie,style})  =>  {
   return (  
      <Link
        href={{
          pathname: "/payment",
          query: {
            movieId: movie?.id,
            seatDetails: JSON.stringify(Selected),
          },
        }}
      >
        <Button variant="solid" style={style}>
          סה״כ {Selected.length * (movie?.ticketCost || 0) + " שח"}
        </Button>
      </Link>
    )
 
};


const Stage = ({ style })=>{

  return   <div style={style} > 
             <Heading fontSize={"21l"}>במה</Heading> 
           </div>
} 









 



export default MovePage

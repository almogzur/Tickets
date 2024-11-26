import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import { Movie } from '../../constants/models/Movies'
import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import MoviesContext from '../../context/MoviesContext';
import DisableZoom from '../../lib/hooks/useDisablePinchZoomEffect'
import TooltopButton from '../../components/tooltip-btn'
import WidthContext from '../../context/WidthContext';
import positionContext from '../../context/map-position-context';
import { motion ,AnimatePresence } from "framer-motion"
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FcRefresh } from "react-icons/fc";

import { Container , Typography as Heading , Stack as Flex ,Box , Button } from '@mui/material';

const positionAtr : CSSProperties = { 
  position:"relative",
  width:"fit-content",
  height:"fit-content",
  display:"flex",
  flexDirection:"column"
}

const styles :Record<string,CSSProperties> = {
paymentButton: {
  background: '#f84464',
},
paymentButtonContainer: {
  position: 'sticky',
  bottom: '10px',
},
buttonContainer: {
  display: 'flex',
  justifyContent: 'space-around',
},
buttonHolder: {
  width: '40%',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '40px',
},
}


const DetailsPage = () => {  

  const router = useRouter()
  const { movies } = useContext(MoviesContext);
  const { id } : any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));

  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>פרטים</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>

      <Flex direction={"column"}>
        <ShowCover imageSrc={movie.cover} name = {movie.name} />
      </Flex>

      <SeatComponent/>
  
    </>
  );
}


const ShowCover =({imageSrc,name}:{imageSrc:any, name:string})=>{
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  return (
    <Flex direction={'row'} justifyContent={"center"}>
        <Image src={imageSrc} height={!xs? 400 : 500} width={!xs? 300 : 400} alt={name}></Image>

    </Flex>
  )
}

const SeatComponent = () => {
  const { movies } = useContext(MoviesContext);
  const router = useRouter();
  const { id, seats }: any = router.query;
  const movie = movies.find((mov) => mov.id === parseInt(id));
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const [selectedSeats,setSlectedSeats ]= useState ([])
  const [seatDetails,setSeatDetails]= useState(movie?.seats || []);
  const [ tipX, setTipX]=useState(null)
  const [ tipY, setTipY]= useState(null)
  const [tipTitel,setTipTitel] = useState<string>("")
  const styles :Record<string,CSSProperties> =  { 
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
    "שירה-שורה1": {top:-160, left:-20 ,   ...positionAtr },  
    "שירה-שורה2": {top:-200 ,left:-30 ,   ...positionAtr  },
  
    "שירה2-שורה1": {top:-160 ,left:-20, ...positionAtr},
    "שירה2-שורה2": {top:-192 ,left:-30 ,...positionAtr},
  
    "שירה3-שורה1":{top:-160 , left:-20, ...positionAtr},
    "שירה3-שורה2":{  top:-192 , left:-30, ...positionAtr},
  
     
    "בידר1-שורה1": {  top:-368 , left:300 , ...positionAtr },
    "בידור1-שורה2":{  top:-408 , left:310, ...positionAtr },
  
    "בידור2-שורה1":{  top:-368 , left:300 ,...positionAtr},
    "בידור2-שורה2":{  top:-400 , left:310 ,...positionAtr},
  
    "בידור3-שורה1":{ top:-368 , left:300, ...positionAtr},
    "בידור3-שורה2":{  top:-400 , left:310, ... positionAtr},
  
    "אופרה-קומה1-שורה1":{top:-400 , left:109 , ...positionAtr,flexDirection:"row"},
    "אופרה-קומה1-שורה2": {top:-400 , left:109 ,...positionAtr,flexDirection:"row"},
  
    "אופרה-קומה2-שורה1":{ top:-385 , left:112, ...positionAtr,flexDirection:"row",},
    "אופרה-קומה2-שורה2":{ top:-385 , left:105, ...positionAtr,flexDirection:"row"},
    "אופרה-קומה2-שורה3":{ top:-385 , left:112, ...positionAtr,flexDirection:"row"},
      
   };  


  const hendler = (seatValue: number, seatNumber: number, row: string) => {

    
       setSeatDetails((prevSeatDetails: any) => {
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
 
    const seatArray  = Object.entries(seatDetails).map(([row, rowContent]) => {
      const colValue  = rowContent.map((seatValue: number, i: number) => {
        const textset = "מושב";
        const textrow = "שורה";
    
        return (
          <TooltopButton
            key={`${row}.${i}`}
            row={row}
            seatnumber={i}
            initValue={seatValue}
            hendler={hendler}
            setTipX={setTipX}
            setTipY={setTipY}
            setTipTitel={setTipTitel}
          />
        );
      });
    
      return (
        <Flex

          key={row}
          style={styles[`${row}`]} // target by key in CSS
          justifyContent="center"
          direction={'row'}
        >
          {colValue}
        </Flex>
      );
    });
      
    return (
     <>
        <AnimatePresence>
     {tipX && tipY  && (
      <motion.h1
        style={{
            background: "#fff",
            color: "black",
            borderRadius: "4px",
            height:"fin-content",
            width:"fin-content",
            position:'absolute',
            zIndex:99,
            top:`${tipY-40 }px`,
            left:`${tipX-60}px`,
            fontSize:15,
            padding:10,
            textAlign:"end"
            
         }}

        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y:-23,   transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
  >
    {tipTitel}
       </motion.h1>
        )}
       </AnimatePresence> 


       <Box  bgcolor={'black'}  p={0} m={0} sx={{boxShadow:' 3px 3px 3px 2px #fff'}} >
                 <TranspormComponenr>

                   <Flex  direction={"column"}  height={ !xs? 400  : 600}   >
      
                      <Flex direction={'row'}  justifyContent={'center'}> 
                        <Stage style={styles.stage} />
                     </Flex > 
                 
                          {seatArray}          
             
                     </Flex> 
              
                </TranspormComponenr>
       </Box>

      </>
    );
};

  const ResetSelectedSeats =()=>{

  if (selectedSeats.length) {
   return <Button 
        style={styles.clearBtn} 
        sx={{background:"#fff"}}    
         onClick={clearSelectedSeats} >
        נקה בחירה
       </Button>
  }else{return <></>}
}
const clearSelectedSeats = () => {
  setSeatDetails((prevSeatDetails) => {
    // Create a deep copy of the state to avoid mutating the original object
    const newMovieSeatDetails = { ...prevSeatDetails };

    for (let key in newMovieSeatDetails) {
      newMovieSeatDetails[key] = newMovieSeatDetails[key].map((seatValue) =>
        seatValue === 2 ? 0 : seatValue
      );
    }

    return newMovieSeatDetails;
  });
};

   return (
    <>
        <Heading p={2} variant='h3'  textAlign={"center"}  >מקומות ישיבה באולם</Heading>
        
         <Seats /> 
        
        { selectedSeats && 
        <PaymentButton Selected={selectedSeats}  style={styles.paymentButton} movie={movie} />}
        <ResetSelectedSeats/>
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
      maxScale={30}
      
     
    
      

      onPanningStop={(e)=>{
  
        setY(e.state.positionY)
        setX(e.state.positionX)
        setS(e.state.scale)
      }}
   
       onTransformed={(e)=>{
          

        
       }}
 
       
    
      
    >
      {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
                 
              
              
        return   (
          <>
             <Controls/>
             <TransformComponent wrapperStyle={{ width:"inherit"}} >
               {children }               
             </TransformComponent>
          </>
          
   
      )
}

      }
    </TransformWrapper>
  );
};
const Controls = () => {
  const {x,y,S, setS , setY , setX } =useContext(positionContext)
  const resetContext =()=>{
     console.log("reset");
     setS(1)
     setX(27)
     setY(0)
     
  }
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <Flex direction={'row'} justifyContent={"space-between"} p={2}  >

      <Button sx={{height:'60px' , background:'#fff'}}  onClick={(e) => {zoomIn()}}>
        <FaPlus  color='green' size={"2em"} />
      </Button>

      <Button    sx={{height:'60px' , background:'#fff'}}  onClick={(e) =>{zoomOut() }}><FaMinus color='red' size={"2em"}/></Button>
      <Button sx={{height:'60px' , background:'#fff'}}  onClick={(e) =>{resetTransform() ; resetContext()   }}><FcRefresh size={"2em"}/></Button>
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
        <Button style={style}>
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




 
export default DetailsPage;
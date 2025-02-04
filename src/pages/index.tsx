import {  Button, Container ,Stack as Flex ,  Typography as Heading , Box, useTheme, Paper, Drawer, CircularProgress } from '@mui/material'

import Head from 'next/head'
import Link from 'next/link';

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import ClientLayout from '../Layouts/client-layout';
import useClientEvents from '@/lib/client/Hooks/useGetEvents';
import {  useContext, useEffect, useRef, useState } from 'react';
import EventCard from '@/components/client/main-page/event-card';
import Carousel from 'react-material-ui-carousel'
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import zIndex from '@mui/material/styles/zIndex';
import WidthContext from '@/context/WidthContext';
import { grey } from '@mui/material/colors';



var items = [
  {
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!"
  },
  {
      name: "Random Name #2",
      description: "Hello World!"
  }
]

type ItemTye ={name:string,description:string}

interface ItemComponentProps   {
  item:ItemTye
}


  function Item({name,description}:ItemTye ){
    return (
        <Paper 
          sx={{background:"#ddd" , mt:3 ,height:250}}
        >
            <Typography>{name}</Typography>
            <p>{description}</p>

            

        </Paper>
    )
}


export default function Home() {

 const theme = useTheme()
 const scrollContainerRef = useRef<HTMLDivElement>(null);
 const [isDragging, setIsDragging] = useState(false);
 const [startX, setStartX] = useState(0);
 const [scrollToLeft, setScrollToLeft] = useState(0);
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)




  const {Events,isEventsError,isEventsValidating,updateEvents} = useClientEvents()






  useEffect(()=>{
        console.log(Events)
  },[Events])


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({behavior:"smooth",left:-310})
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({behavior:"smooth",left:+310})
    }
  };


  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollContainerRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft); // Mouse position relative to container
    setScrollToLeft(scrollContainerRef.current.scrollLeft); // Save the initial scroll position
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return;
    const x = e.pageX - scrollContainerRef.current.offsetLeft; // Current mouse position
    const walk = (x - startX) * 1; // Distance moved (adjust multiplier for sensitivity)
    scrollContainerRef.current.scrollLeft = scrollToLeft - walk; // Update scroll position
  };

  const handleMouseUpOrLeave = () => {
    setIsDragging(false); // Stop dragging
  };

  // const handleWheel = (e: React.WheelEvent) => {
  //   if (!scrollContainerRef.current) return;
  //   e.preventDefault(); // Prevent vertical scrolling
  //   scrollContainerRef.current.scrollBy({
  //     left: e.deltaY, // Map vertical scroll to horizontal scroll
  //     behavior: "smooth", // Smooth scrolling
  //   });
  // };

  
   const
     PageWrapper = Container,
     Placeholder = Box,
     Scrooler = Box,
     ScroolerConetnt=Box,
     RightArrow=Box,
     LeftArrow =Box,
     ArowsWrapper = Flex


     if(!Events){
      return  (
        <ClientLayout noScrool HeaderName='' >
           <Flex
         direction={"row"}
         sx={{ display: 'flex',    width:"100%" , height:"100%" ,   }}
         justifyContent={"center"}
         alignItems={"center"}
      >
          <CircularProgress />
          
         </Flex>
    </ClientLayout>
      )
     }
     else{
      return (
        <>
         <ClientLayout  HeaderName='' >
            <PageWrapper maxWidth='xl'>
    
                 <Carousel
                sx={{background:"black"}}
                
                >
                    {
                    items.map( (item, i) => <Item key={i} {...item} /> )
                  }
                </Carousel>

                <Scrooler>
                  <ArowsWrapper direction={"row"}  justifyContent={"space-between"}  >
                     <RightArrow
                           position={"relative"}
                           left={!xs?-15 : !md?  -25 :"auto"}
                           zIndex={5}
                           width={0}
                 
                    >
                        <Button
                         variant='text'
                        color='secondary'
                        sx={{borderRadius:45,opacity:0.7}}
                  >
                    <FaCircleArrowRight 
                        size={!md  ? 40: 50}
                        onClick={scrollRight}
                        cursor={'pointer'}
                      />
                       </Button>
                     </RightArrow>
    
    
    
                      <LeftArrow>
                    <Button
                        variant='text'
                        color='secondary'
                        sx={{borderRadius:45,opacity:0.7}}
                  >
                  <FaCircleArrowLeft
                    size={!md ? 40 : 50}
                    onClick={scrollLeft}
                    cursor={'pointer'}
                  />
                   </Button>    
                      </LeftArrow>
    
                  </ArowsWrapper>
    
                   <ScroolerConetnt
                        ref={scrollContainerRef}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUpOrLeave}
                        onMouseLeave={handleMouseUpOrLeave}
                        // onWheel={handleWheel} // Attach wheel event handler
                        display={"flex"}
                        flexDirection={ "row"}
                        gap={3}
                       
                        sx={{
                          overflowX: 'auto',
                          '&::-webkit-scrollbar': {
                            width: '0.2em'
                          },
                          '&::-webkit-scrollbar-track': {
                            boxShadow: `inset 0 0 6px rgba(0,0,0,0.00)`,
                            webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.00)'
                          },
                          '&::-webkit-scrollbar-thumb': {
                         
                            outline: `0.5px solid ${theme.palette.secondary.main}`
                          }
                
                          
    
                        }}
                      >
    
    
                        {Events?.map((event) => (
                            <EventCard key={event._id} {...event} />
                        ))}
    
    
    
    
    
                  </ScroolerConetnt>
                </Scrooler>
                          
            <Placeholder height={400} />

    
          </PageWrapper>
       </ClientLayout>
        </>
      )

     }
}





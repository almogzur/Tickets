import { Button, Container, Stack as Flex, Typography, Box, useTheme, Paper, CircularProgress } from '@mui/material'
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import { FaCircleArrowLeft, FaCircleArrowRight } from 'react-icons/fa6';
import WidthContext from '@/context/WidthContext';
import type { GetServerSideProps, GetServerSidePropsResult } from 'next'
import axios from 'axios';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';
import ClientWrapper from '@/layouts/client';
import { useEvents } from '@/context/client/client-events-context';
import LoadingScreen from '@/mui-components/loading';
import { useClientEvents } from '@/hooks/client/use-events';
import EventCard from '@/components/client/main-page/event-card';




interface HomePageProps { Events: ClientEventType[] }

export default function Home(props: HomePageProps) {


  const theme = useTheme()
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollToLeft, setScrollToLeft] = useState(0);
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)

  const {Events , isEventsError,isEventsValidating,updateEvents} = useClientEvents()


  
  const [pageLoad, setPageLoad] = useState(false)



  useEffect(() => {
    setPageLoad(true)

  }, []);


  
  const generateImageCarousel =( events:[] ) : [] =>{
 
    return [] 
  }


  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: "smooth", left: -310 })
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ behavior: "smooth", left: +310 })
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
    Scroller = Box,
    ScrollerContent = Box,
    RightArrow = Box,
    LeftArrow = Box,
    ArrowsWrapper = Flex

  if (!Events || !pageLoad) {
    return <LoadingScreen />
  }


  return (
    <PageWrapper maxWidth='xl'>

      <Carousel
        sx={{ background: "black" }}
      >
        {
          items.map((item, i) => <Item key={i} {...item} />)
        }
      </Carousel>

      <Scroller>
        <ArrowsWrapper direction={"row"} justifyContent={"space-between"}  >
          <RightArrow
            position={"relative"}
            left={!xs ? -15 : !md ? -25 : "auto"}
            zIndex={5}
            width={0}

          >
            <Button
              variant='text'
              color='secondary'
              sx={{ borderRadius: 45, opacity: 0.7 }}
            >
              <FaCircleArrowRight

                size={!md ? 40 : 50}
                onClick={scrollRight}
                cursor={'pointer'}
              />
            </Button>
          </RightArrow>



          <LeftArrow>
            <Button
              variant='text'
              color='secondary'
              sx={{ borderRadius: 45, opacity: 0.7 }}
            >
              <FaCircleArrowLeft
                size={!md ? 40 : 50}
                onClick={scrollLeft}
                cursor={'pointer'}
              />
            </Button>
          </LeftArrow>

        </ArrowsWrapper>

        <ScrollerContent
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUpOrLeave}
          onMouseLeave={handleMouseUpOrLeave}
          // onWheel={handleWheel} // Attach wheel event handler
          display={"flex"}
          flexDirection={"row"}
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




        </ScrollerContent>

      </Scroller>

      <Placeholder height={400} />


    </PageWrapper>
  )


}


const  items = [
  {
    name: "Random Name #1",
    description: "Probably the most random thing you have ever seen!",
    image: 'abc'
  },
  {
    name: "Random Name #2",
    description: "Hello World!"
  }
]

type ItemTye = { name: string, description: string,image?:string }

interface ItemComponentProps {
  item: ItemTye
}
function Item({ name, description,image }: ItemTye) {
  return (
    <Paper
      sx={{ background: "#ddd", mt: 3, height: 250 }}
    >
      <Typography>{name}</Typography>
      <p>{description}</p>
      <p>{image}</p>



    </Paper>
  )
}




import * as React from 'react';



import WidthContext from '@/context/WidthContext';
import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip, Drawer } from '@mui/material';
import { SetStateAction, } from 'react'
import { SeatType } from '@/pages/details/[id]';
import { grey } from '@mui/material/colors';
import { EventsType } from '@/pages/api/client/events/R/get-events';
import { GiTakeMyMoney } from 'react-icons/gi';


interface ClientInfoDrawerType {
    children?:React.ReactNode
    wighetIsExp:boolean
    setWighetIsExp:React.Dispatch<SetStateAction<boolean>>
    eventSelectSeats:SeatType[]
    event:EventsType|undefined

}


export default function DrawerWighet({
    children,
    wighetIsExp,
    setWighetIsExp,
    eventSelectSeats,
    event
    
    
    }:ClientInfoDrawerType) {
  const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
  const theme = useTheme()

      const
      FooterFlex = Flex,
      FooterContent=Flex,
      ContentBox = Box,
      MdContentBox = Box
      



      if(!md && !wighetIsExp ){
        return (
               <FooterFlex
                        width={"100%"}
                        height={0}
                        position={'sticky'}
                        top='calc(100% - 70px)'
                        zIndex={2}
                          >
                            {
                           <FooterContent
                               bgcolor={theme.palette.secondary.main} 
                               width={"100%"}
                               direction={"row"}
                               justifyContent={'space-around'}

                              >
                         {      eventSelectSeats.length ? 
                             <Box >
                                  <Typography fontWeight={'bold'} variant='h6'  >סה״כ</Typography>
                                  <Typography fontWeight={'bold'} variant='h6' >{eventSelectSeats.length} : כרטיסים </Typography>
                            </Box>
                            :
                            <Flex height={"100%"}  justifyContent={"center"}  >
                                <Typography fontWeight={'bold'}  >{event?.eventName} </Typography>
                                <Typography fontWeight={'bold'}  >  מחיר : {10000} </Typography>
                                <Typography  fontWeight={'bold'}  >{event?.Date} </Typography>
                            </Flex>
                            }
                           <Button 
                              sx={{
                                    m:2,
                                    borderRadius:45,
                                    bgcolor:'black',
                                    zIndex:10,
                                    "&:hover":{
                                      color:theme.palette.secondary.main
                                    }
                                }}
                                onClick={()=>{setWighetIsExp(!wighetIsExp)}
        
                                }
                                >
                                {eventSelectSeats.length ? "לרכישה ": "פרטים" }
                          </Button>

                          </FooterContent>
                         }
               </FooterFlex>
        )
      }
      else if( !md && wighetIsExp){
 
           return    <MdContentBox 
                     width={"100%"}
                     height={'100%'}
                     zIndex={5}
                     bgcolor={grey[500]}
                     sx={{
                      overflowY:'scroll',
                      overflowX:'clip',
                      scrollbarWidth: 'none', // "auto", "thin", or "none"
                      scrollbarColor: `${theme.palette.secondary.main} transparent`, // thumb and track colors
                     }}
                      >
                  {children}
                  <Button // toggler 
                        onClick={()=>{setWighetIsExp(!wighetIsExp)}}
                        sx={{position:"absolute" , top:80 , left:"5%" ,borderRadius:45 ,   }}
                        color='secondary'
                      
                      > סגור 
                </Button>
                </MdContentBox>

      }
      else{
        return (
          <ContentBox  // flex colunm  make the div  none scroll
             bgcolor={grey[500]}
              width={"400px"}
               height={"100%"}
             sx={{
              overflowY:"scroll",
              overflowX:'clip',
              // Firefox Support
              scrollbarWidth: 'none', // "auto", "thin", or "none"
              scrollbarColor: `${theme.palette.secondary.main} transparent`, // thumb and track colors
             }}
             >
           {children}
           
         </ContentBox>
       
)

      }



}

       
          
 


import * as React from 'react';



import WidthContext from '@/context/WidthContext';
import {      Stack as Flex  , Button, Typography, useTheme, Box,} from '@mui/material';
import { SetStateAction, useContext, } from 'react'
import { grey } from '@mui/material/colors';
import { ClientEventType } from '@/types/pages-types/admin/admin-event-types';
import { ClientSelectedSeatType } from '@/types/pages-types/client/client-event-type';



interface SideBarWraperPropsTypes {
    children?:React.ReactNode
    ClientSelectedEvent:ClientEventType
    wighetIsExp:boolean
    setWighetIsExp:React.Dispatch<SetStateAction<boolean>>
    eventSelectSeats:ClientSelectedSeatType[]
}


export default function SideBarWraper({
    children,
    wighetIsExp,
    setWighetIsExp,
    eventSelectSeats,
    ClientSelectedEvent
    
    
    
    }:SideBarWraperPropsTypes) {
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
                                <Typography fontWeight={'bold'}  >{ClientSelectedEvent?.info.eventName} </Typography>
                                <Typography fontWeight={'bold'}  >  מחיר : {10000} </Typography>
                                <Typography  fontWeight={'bold'}  >{ClientSelectedEvent?.info.Date} </Typography>
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

       
          
 


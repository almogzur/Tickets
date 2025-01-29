import * as React from 'react';



import WidthContext from '@/context/WidthContext';




import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip, Drawer } from '@mui/material';
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'
import { SeatType } from '@/pages/details/[id]';
import { grey } from '@mui/material/colors';


interface ClientInfoDrawerType {
    children?:React.ReactNode
 
}


export default function ClientInfoDrawer({children}:ClientInfoDrawerType) {
  const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
  const [isExp , setIsExp  ]= useState<boolean>(false)
  const theme = useTheme()

      const InfoDrawer = Flex,
      FooterFlex = Flex,
      ContentBox = Box,
      MdContentBox = Box


      if(!md && !isExp ){
        return (
               <FooterFlex
                        direction={"row"}
                        alignItems={"center"}
                        bgcolor={theme.palette.secondary.main} 
                        width={"inherit"}
                        height={70}
                        justifyContent={"end"}
                        position={'absolute'}
                        bottom={0}
                          >
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
                        onClick={()=>{setIsExp(!isExp)}

                        }
                        >לרכישה 
                  </Button>
               </FooterFlex>
        )
      }
      else if( !md && isExp){
 
           return    <MdContentBox 

                    width={"100%"}

                     zIndex={10}
                     bgcolor={grey[300]}
                     sx={{
          
                      height:"100%",
                      '&::-webkit-scrollbar': {
                        width: '3px',

                      },
                      '&::-webkit-scrollbar-track': {
                        boxShadow: `inset 0 0 2px rgba(0,0,0,0.00)`,
                        webkitBoxShadow: 'inset 0 0 3px rgba(0,0,0,0.00)'
                      },
                      '&::-webkit-scrollbar-thumb': {
                        background:theme.palette.secondary.main,
          
                      }
                     }}
                     

              >
                <Button // toggler 
                      onClick={()=>{setIsExp(!isExp)}}
                    
                      > סגור 
                </Button>
             
                  {children}
                </MdContentBox>

      }
      else{
        return (

          <ContentBox 

             bgcolor={grey[500]}
             width={450}
   
      
             
             >
           {children}
           
         </ContentBox>
       
)

      }



}

       
          
 


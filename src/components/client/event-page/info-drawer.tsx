import * as React from 'react';



import WidthContext from '@/context/WidthContext';




import { Container , Typography as Heading , Stack as Flex  , Button, Typography, useTheme, Box, Chip, Drawer } from '@mui/material';
import { useState, useEffect, useContext, CSSProperties, useRef, SetStateAction, } from 'react'


interface ClientInfoDrawerType {
    children?:React.ReactNode
}


export default function ClientInfoDrawer({children}:ClientInfoDrawerType) {
  const {xxl,xl,lg,md,sm,xs,xxs} = React.useContext(WidthContext)
  const [isExp , setIsExp  ]= useState<boolean>(false)
  const theme = useTheme()

      const DrawerBox = Flex,
      Pre=Typography,
      Datas = Flex,
      Placeholder = Box

  return (
  < DrawerBox 
          width={md? 400 :"inherit"}
          height={ isExp? "90%" :  md? 'inherit' : "100px"}
          
          alignItems={"center"} 
          position={md?'inherit':"fixed"}
          bottom={0}
          zIndex={2}
   
           >
           {  
            !md  && !isExp  // under  600 px  100 px footer 
              ? <Flex direction={"row"}
                       bgcolor={theme.palette.secondary.main} width={"100%"} height={100}  >
                  <Button 
                        onClick={()=>{setIsExp(!isExp)}
                        }
                        >לרכישה 
                  </Button>
               </Flex>
             : 
             ! md && isExp // under 600 footer   Opens to 90 % with children
              ?  <Box 
              overflow={"scroll"}
              width={"100%"}
              zIndex={10}
              >
                 <Button // toggler 
                      onClick={()=>{setIsExp(!isExp)}}
                      > סגור 
                </Button>
                  {children}
                </Box>
               : // over 600 return children side bar  (inherit css from children)
                 children
            
           }



       
          
  </DrawerBox>
  );
}


import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, SetStateAction, } from 'react'
import ClientPositionContext from '@/context/client/client-map-positions-context'
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme, Divider, Box} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";



import { LuRefreshCcw } from "react-icons/lu";

import WidthContext from "@/context/WidthContext";
import ColorIndexDial from '@/components/theater-gen/colors-dial'
import { grey } from "@mui/material/colors";
import React from "react";


interface ClientTheaterMapPropsTypes {
   children? : ReactNode,

}

const ClientTheaterRTransform = ({children }:ClientTheaterMapPropsTypes) => {
  
    const {ClientMapPositions,setClientMapPositions} =useContext(ClientPositionContext)
    const theme = useTheme()
    
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  // new Transform Context for client 
  // see if need a new component or just add condition

    return (
       <TransformWrapper 
        
        initialScale={ClientMapPositions.Scale|| !sm? 0.50 : 1} //only reser on full app reset 
        limitToBounds={!sm ? false: true }
        initialPositionX={!sm? 80 : 0 }

        
      

        minScale={!sm? 0.45 : !md? 0.8 : 1 }
        smooth
       
        maxScale={3}
        onPanningStop={(e)=>{
          

          //setClientMapPositions(prev=>({x:e.state.positionX,y:e.state.positionY,Scale:e.state.scale}))
          console.log(ClientMapPositions,e);
          
        }}
        onPanningStart={()=>{

        }}
        onTransformed={(e)=>{}}  
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
          return   (
            <Flex width={"inherit"} alignItems={"center"}  height={'inherit'}  >
                  <Controls   />

                   <TransformComponent 
                    wrapperStyle={{  width:"inherit" ,  }}
                    contentStyle={{ width:"inherit" , display:"flex", justifyContent:"center",height:'inherit'}}
                   >{children} 
                </TransformComponent>

            </Flex>
        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const Controls = () => {
    const {ClientMapPositions,setClientMapPositions} =useContext(ClientPositionContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


    const theme = useTheme()


    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
        <>
      <Flex   
          position={'absolute'}
           left={"1%"}
           top={100}
           zIndex={1}
           gap={1} 
           justifyContent={"space-around"}
          
          sx={{scale:!md ? 0.7  : 1}}
            >
  
        <Button  color='secondary' sx={{p:2.5}} variant='contained'  onClick={(e) => {zoomIn()}}>
          <FaPlus />
        </Button>
  
        <Button    color='secondary'variant='contained'  onClick={(e) =>{zoomOut() }}>
          <FaMinus size={"2em"}/>
        </Button>

        <Button  color='secondary' variant='contained'  onClick={(e) =>{resetTransform()    }}>
          <LuRefreshCcw  size={"2em"}/>
       </Button>

      </Flex>
      </>
    );
  };
  
  export default ClientTheaterRTransform
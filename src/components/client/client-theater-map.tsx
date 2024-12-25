import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, SetStateAction, } from 'react'
import ClientPositionContext from '../../context/client/client-map-positions-context'
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme, Divider} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";


import { LuRefreshCcw } from "react-icons/lu";

import WidthContext from "@/context/WidthContext";
import { ClinetSeatColorsIndex } from "../seats-color-index";


interface ClientTheaterMapPropsTypes {
   children? : ReactNode,

}

const ClientTheaterMap = ({children }:ClientTheaterMapPropsTypes) => {
  
    const {ClientMapPositions,setClientMapPositions} =useContext(ClientPositionContext)
    
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  // new Transform Context for client 
  // see if need a new component or just add condition

    return (
       <TransformWrapper 
        
        initialScale={ClientMapPositions.Scale|| !sm? 0.45 : !md? 1.3 :  2 } //only reser on full app reset 
        initialPositionX={ ClientMapPositions.x|| !sm? 60:  !md? -200:  -550 }
        initialPositionY={  ClientMapPositions.y|| !sm? 50: 0 }
        limitToBounds={false}
        minScale={!sm? 0.45 : !md? 0.8 : 1 }
        smooth
        maxScale={100}
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
            <>
                <Controls   />

                <TransformComponent
                  wrapperStyle={{ width:"100%" }}
               
                 >
                 {children}     
                 
                </TransformComponent>

           
              <ClinetSeatColorsIndex />
             
              

            </>
        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const Controls = () => {
    const {ClientMapPositions,setClientMapPositions} =useContext(ClientPositionContext)


    const theme = useTheme()


    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
        <>
      <Flex direction={'row'} justifyContent={"space-between"} p={2} sx={{  color:theme.palette.primary.main}} >
  
        <Button sx={{height:'60px' }} color='primary' variant='contained'  onClick={(e) => {zoomIn()}}>
          <FaPlus  color={theme.palette.secondary.main} size={"2em"} />
        </Button>
  
        <Button    sx={{height:'60px'}} color='primary' variant='contained'  onClick={(e) =>{zoomOut() }}>
          <FaMinus color={theme.palette.secondary.main} size={"2em"}/>
        </Button>
        <Button sx={{height:'60px'  }} color='primary'  variant='contained'  onClick={(e) =>{resetTransform()    }}>
          <LuRefreshCcw color={theme.palette.secondary.main} size={"2em"}/>
          </Button>
      </Flex>
      <Divider sx={{borderWidth:3 , background:theme.palette.primary.dark}} />
      </>
    );
  };
  
  export default ClientTheaterMap
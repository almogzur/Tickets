import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, SetStateAction, } from 'react'
import ClientPositionContext from '@/context/client/event-page/client-tranform-contenx'
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
        limitToBounds={false }
        initialPositionX={!sm? 80 : 0 }
        minScale={!sm? 0.45 : !md? 0.8 : 1 }
        smooth
        centerZoomedOut={ !lg? false :true}

       
        maxScale={10}
        onPanningStop={(e)=>{
          

          //setClientMapPositions(prev=>({x:e.state.positionX,y:e.state.positionY,Scale:e.state.scale}))
          //console.log(ClientMapPositions,e);
          
        }}
        onPanningStart={()=>{

        }}
        onTransformed={(e)=>{}}  
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
          return   (
            <Flex 
                 direction={"row"}
                  width={"inherit"}
   
        
                  >
                <Controls   />
                 <TransformComponent 
                    wrapperStyle={{  width:"100%" , height:"100% " }}
                    contentStyle={{
                         width:"inherit" ,
                        display:"flex",
                        justifyContent:"center",
     
          
                            }}
                   >
                    {children} 
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
            direction={"row"}
            position={'absolute'}
            top= {! xs ?60 : 100}
            width={0}
           height={0}
           zIndex={1}
           
          
          sx={{scale:!md ? 0.7  : 1}}
            >
  
        <Button   
             color='secondary'
              sx={{borderRadius:45 , m:1, p:3 }}
               variant='contained'
                 onClick={(e) => {zoomIn()}}
                 
                 >
          <FaPlus  size={"2em"}  />
          
        </Button>
  
        <Button    
            color='secondary'
            variant='contained'
            onClick={(e) =>{zoomOut() }}
            sx={{borderRadius:45 , m:1, p:3 }}

              >
          <FaMinus size={"2em"}/>
        </Button>

        <Button  
          color='secondary'
           variant='contained'
             onClick={(e) =>{resetTransform()    }}
             sx={{borderRadius:45 , m:1, p:3 }}

             >
          <LuRefreshCcw  size={"2em"}/>
       </Button>

      </Flex>
      </>
    );
  };
  
  export default ClientTheaterRTransform
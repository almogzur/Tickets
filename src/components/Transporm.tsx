import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, } from 'react'
import positionContext from '../context/map-position-context';
import { Stack as Flex , Typography as Heading , Button} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FcRefresh } from "react-icons/fc";

const Transporm = ({children }) => {
  
    const {x,y,S, setS , setY , setX } =useContext(positionContext)
  
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
                 {children}               
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
  
  export default Transporm
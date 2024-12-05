import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, } from 'react'
import positionContext from '../context/map-position-context';
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import { FcRefresh } from "react-icons/fc";
import { blue, deepOrange, deepPurple, grey, red } from "@mui/material/colors";
import TipContext from '@/context/Tip-context';
import { Colors } from "@/lib/colors";
import { LuRefreshCcw } from "react-icons/lu";
import SeatColorsIndex from "./seats-color-index";


interface TranspormProps {
   children? : ReactNode,
  isMultiSelect? : boolean,
  setIsMultiSelect?:React.Dispatch<React.SetStateAction<Boolean>>
}

const Transporm = ({children, isMultiSelect,setIsMultiSelect }:TranspormProps) => {
  
    const {x,y,S, setS , setY , setX } =useContext(positionContext)
    const { tipX, tipY, seatTipInfo, setTipY ,setTipX, setSeatTipInfo ,resetTip }=useContext(TipContext)



    return (
       <TransformWrapper 
        
        initialScale={S||0.5}
        initialPositionX={x||0}
        initialPositionY={y||0}
        limitToBounds={false}
        minScale={0.7}
   
        smooth
        maxScale={100}
        onPanningStop={(e)=>{
          setY(e.state.positionY)
          setX(e.state.positionX)
          setS(e.state.scale)
        }}
        onPanningStart={()=>{ if(tipX||tipY){resetTip()}}}
        
     
         onTransformed={(e)=>{}}  
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
          return   (
            <>
               <Controls   />
                <TransformComponent
                  wrapperStyle={{ width:"100%",}}
               
                 >
                 {children}     
                 
               </TransformComponent>



               <SeatColorsIndex isMuiltiSelct={isMultiSelect} setIsMultiSelect={setIsMultiSelect}  />


            </>
        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const Controls = () => {
    const {x,y,S, setS , setY , setX } =useContext(positionContext)
    const { tipX, setTipX , tipY, setTipY}=useContext(TipContext)

    const theme = useTheme()

    const resetContext =()=>{

       console.log("reset");
       setS(0.7)
       setX(50)
       setY(0)
       setTipY(0)
       setTipX(0)
     
       
       
    }
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      <Flex direction={'row'} justifyContent={"space-between"} p={2} sx={{borderBottom:'solid 0.5px' , color:theme.palette.primary.main}} >
  
        <Button sx={{height:'60px' }} color='primary' variant='contained'  onClick={(e) => {zoomIn()}}>
          <FaPlus  color={theme.palette.secondary.main} size={"2em"} />
        </Button>
  
        <Button    sx={{height:'60px'}} color='primary' variant='contained'  onClick={(e) =>{zoomOut() }}><FaMinus color={theme.palette.secondary.main} size={"2em"}/></Button>
        <Button sx={{height:'60px'  }} color='primary'  variant='contained'  onClick={(e) =>{resetTransform() ; resetContext()   }}><LuRefreshCcw color={theme.palette.secondary.main} size={"2em"}/></Button>
      </Flex>
    );
  };
  
  export default Transporm
import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, } from 'react'
import AdminMapPositionsContext from '../../context/admin-map-positions-context';
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme, Divider} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import TipContext from '@/context/single-tip-context';
import { LuRefreshCcw } from "react-icons/lu";
import SeatColorsIndex from "../seats-color-index";
import WidthContext from "@/context/WidthContext";


interface AdminTheaterMapPropsTypes {
   children? : ReactNode,
   isMultiSelect? : boolean,
   setIsMultiSelect?:React.Dispatch<React.SetStateAction<Boolean>>
   multiSelectBadgeInfo?:number
   admin?:boolean
}

const AdminNewEventTheatherMap = ({children, isMultiSelect,setIsMultiSelect ,multiSelectBadgeInfo ,admin }:AdminTheaterMapPropsTypes) => {
  
    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  // new Transform Context for client 
  // see if need a new component or just add condition

    return (
       <TransformWrapper 
        
        initialScale={AdminMapPositions.Scale|| !sm? 0.45 : !md? 1.3 :  2  }
        initialPositionX={ AdminMapPositions.x|| !sm? 95:  !md? -200:  -550}
        initialPositionY={  AdminMapPositions.y|| !sm? 50: 0 }
        limitToBounds={false}
        minScale={ !md? 0.45 :!md? 1.3 :  2}
        smooth
        maxScale={100}
        onPanningStop={(e)=>{
          
          setAdminMapPositions(prev=>({x:e.state.positionX,y:e.state.positionY,Scale:e.state.scale}))
        }}
        onPanningStart={()=>{}}
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

               <SeatColorsIndex isMuiltiSelct={isMultiSelect} setIsMultiSelect={setIsMultiSelect} multiSelectBadgeInfo={multiSelectBadgeInfo}   />
           
             
              

            </>
        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const Controls = () => {
    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const { resetSingleTip}=useContext(TipContext)

    const theme = useTheme()

    const resetContext =()=>{

       console.log("reset");
       
       setAdminMapPositions({Scale:0.7,x:50 , y:0})

     

       
    }
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
        <Button sx={{height:'60px'  }} color='primary'  variant='contained'  onClick={(e) =>{resetTransform() ; resetSingleTip() ; resetContext()   }}>
          <LuRefreshCcw color={theme.palette.secondary.main} size={"2em"}/>
          </Button>
      </Flex>
      <Divider sx={{borderWidth:3 , background:theme.palette.primary.dark}} />
      </>
    );
  };
  
  export default AdminNewEventTheatherMap
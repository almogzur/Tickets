import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, } from 'react'
import AdminMapPositionsContext from '../../../../context/admin/new-event/map/admin-map-positions-context';
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme, Divider} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MutiTipContext from '@/context/admin/new-event/map/multi-select-context'
import { LuRefreshCcw } from "react-icons/lu";
import SeatColorsIndex from "../../../seats-color-index";
import WidthContext from "@/context/WidthContext";
import { grey } from "@mui/material/colors";


interface AdminTheaterMapPropsTypes {
   children? : ReactNode,
   isMultiSelect? : boolean,
   setIsMultiSelect?:React.Dispatch<React.SetStateAction<Boolean>>
   multiSelectBadgeInfo?:number


}

const AdminNewEventTheatherMap = ({children, isMultiSelect,setIsMultiSelect ,multiSelectBadgeInfo  }:AdminTheaterMapPropsTypes) => {
  
    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const theme = useTheme()

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  // add is disabled state 
  // add reset function 
  
  
    return (
       <TransformWrapper 
        
        initialScale={AdminMapPositions.Scale|| !sm? 0.45 : !md? 1.3 :  1.7  }
        initialPositionX={ AdminMapPositions.x|| !sm? 95:  !md? -200:  -550}
        initialPositionY={  AdminMapPositions.y|| !sm? 50: 0 }
        limitToBounds={false}
        minScale={ !md? 0.35 :!md? 1 :  1.1}
        smooth
        maxScale={100}
        disabled={AdminMapPositions.disabled}
         
        onPanningStop={(e)=>{
          
          setAdminMapPositions(prev=>({x:e.state.positionX,y:e.state.positionY,Scale:e.state.scale}))
        }}
        onPanningStart={()=>{}}
        onTransformed={(e)=>{}}  
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
          return   (
            <Flex    p={1} boxShadow={theme.shadows[10]} mt={3} > 
              <Controls/>   
              <Divider sx={{borderWidth:3 , background:theme.palette.primary.dark}} />
            

                 <TransformComponent
                  wrapperStyle={{ width:"100%" ,background:"#fff"  }}
               
                 >
                   

                 {children}      
                 
                </TransformComponent>
   
               <SeatColorsIndex isMuiltiSelct={isMultiSelect} setIsMultiSelect={setIsMultiSelect} multiSelectBadgeInfo={multiSelectBadgeInfo}   />
           
             
              

            </Flex>
        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const Controls = () => {
    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const { resetSingleTip}=useContext(SingleTipContext)
    const {resetMultiTip} = useContext(MutiTipContext)
    const theme = useTheme()

  



    const resetContext =()=>{

       console.log("reset");
       
       setAdminMapPositions({Scale:0.7,x:50 , y:0})

     

       
    }
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
        <>
      <Flex direction={'row'} justifyContent={"space-between"} p={2} sx={{  color:theme.palette.primary.main}} >
  
        <Button sx={{height:'60px',   }} disabled={AdminMapPositions.disabled}  variant='contained'  onClick={   (e) => { zoomIn()}}>
          <FaPlus  size={"2em"} />
        </Button>
  
        <Button    sx={{height:'60px'  }} disabled={AdminMapPositions.disabled}  variant='contained'  onClick={    (e) =>{ zoomOut() } }>
          <FaMinus size={"2em"}/>
        </Button>
        <Button sx={{height:'60px',  }} disabled={AdminMapPositions.disabled}    variant='contained'  onClick={     (e) => { resetTransform() ; resetSingleTip() ; resetContext() ;resetMultiTip() } }>
          <LuRefreshCcw size={"2em"}/>
          </Button>
      </Flex>
      </>
    );
  };
  
  export default AdminNewEventTheatherMap

import { TransformWrapper, TransformComponent, useControls, getTransformStyles } from "react-zoom-pan-pinch";
import { useState, useEffect, useContext, ReactNode, Dispatch, SetStateAction, MouseEventHandler, } from 'react'
import AdminMapPositionsContext from '../../../../context/admin/new-event/map/admin-map-positions-context';
import { Stack as Flex , Typography as Heading , Button, Avatar , useTheme, Divider, Box, SpeedDial, SpeedDialAction, SpeedDialIcon, Backdrop} from '@mui/material'
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa";
import SingleTipContext from '@/context/admin/new-event/map/single-tip-context';
import MutiTipContext from '@/context/admin/new-event/map/multi-select-context'
import { LuRefreshCcw } from "react-icons/lu";
import SeatControls from "../../../theater-gen/seats-controls";
import WidthContext from "@/context/WidthContext";
import { blue, green, grey, orange, pink } from "@mui/material/colors";
import { FcAddImage, FcRemoveImage } from "react-icons/fc";
import tabsInfoContext from "@/context/admin/new-event/tabs/tabs-info-context";
import ColorIndexDial from "@/components/theater-gen/colors-dial";


interface AdminTheaterMapPropsTypes {
   children? : ReactNode,
   isMultiSelect : boolean,
   setIsMultiSelect:Dispatch<SetStateAction<boolean>>
   multiSelectBadgeInfo:number


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
        onPanningStart={(e)=>{console.log(e)}}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) =>  {
          return   (
            <Flex mb={10}  > 
              <MovmentControls/>   
            
                  <Flex direction={"row"} justifyContent={"center"} mb={2}  >
              
                 <TransformComponent
                  wrapperStyle={{ width:!xs?"85%":"90%", background:grey[200] , border:"solid" ,borderRadius:15 }}
               
                 >
                  

                  {children}   
      
                 
                </TransformComponent>

                 </Flex>
    
              < SeatControls isMuiltiSelct={isMultiSelect} setIsMultiSelect={setIsMultiSelect} multiSelectBadgeInfo={multiSelectBadgeInfo}   />
             
            </Flex>

        )
  }
  
        }
      </TransformWrapper>
    );
  };


  const MovmentControls = () => {
    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const { resetSingleTip}=useContext(SingleTipContext)
    const {resetMultiTip} = useContext(MutiTipContext)
    const theme = useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  



    const resetContext =()=>{

       console.log("reset");
       
       setAdminMapPositions({Scale:0.7,x:50 , y:0})

     

       
    }
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      
      <Flex direction={'row'} justifyContent={"space-around"} p={2} sx={{  color:theme.palette.primary.main}} >
  
        <Button 
          disabled={AdminMapPositions.disabled}
          variant='contained' 
          onClick={   (e) => { zoomIn()}}>
          <FaPlus  size={"2em"} />
        </Button>
  
        <Button 
          disabled={AdminMapPositions.disabled}
          variant='contained' 
          onClick={    (e) =>{ zoomOut() } }>
          <FaMinus  size={"2em"} />
        </Button>
        <Button
          disabled={AdminMapPositions.disabled}
          variant='contained'  
          onClick={     (e) => { resetTransform() ; resetSingleTip() ; resetContext() ;resetMultiTip() } }>
          <LuRefreshCcw   size={"2em"}/>
          </Button>
      </Flex>
    );
  };
  
  export default AdminNewEventTheatherMap



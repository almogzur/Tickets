import SingleTipContext from "@/context/admin/new-event/map/single-tip-context";
import MultiSelectContext from "@/context/admin/new-event/map/multi-select-context";

import { Avatar , AvatarGroup, Badge, Button, Divider, Stack as Flex, Tooltip, useTheme  } from "@mui/material";
import { blue, green, grey, orange, pink, red } from "@mui/material/colors";
import { Dispatch, SetStateAction, useContext } from "react";
import WidthContext from "@/context/WidthContext";
import AdminMapPositionsContext from '@/context/admin/new-event/map/admin-map-positions-context';
import { IoMdMove } from "react-icons/io";
import { BsFillSignStopFill } from "react-icons/bs";
import { MdOutlineDeselect } from "react-icons/md";



/*
INDEX !!!!!
0:init : blue[700] primary
1:taaken : red
2:selected :porpole
3:block : black
4:Discount : green[800]
5:accsesble:
6:Dicount_Accsesble
*/

interface SeatColorsIndexProps  { 
    isMuiltiSelct? :boolean ,
    setIsMultiSelect:Dispatch<SetStateAction<boolean>>
    multiSelectBadgeInfo:number
 }

const SeatControls =({isMuiltiSelct,setIsMultiSelect,multiSelectBadgeInfo}:SeatColorsIndexProps)=> {
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const { resetSingleTip }=useContext(SingleTipContext)
    const {resetMultiTip, multiTipInfo} =useContext(MultiSelectContext)

    return (  
        


          <Flex direction={'row'}    justifyContent={'space-around'} gap={!xs? 0:7}    >
            
           <Badge
             badgeContent={multiTipInfo.totalselected} 
             color='primary'
             invisible={!isMuiltiSelct}
             showZero={true}
             anchorOrigin={{
             vertical: 'top',
             horizontal: 'left',
            }}
         
         >
           <Button onClick={(e)=>{
                        setIsMultiSelect(!isMuiltiSelct);
                        resetSingleTip();
                        resetMultiTip()
                    } }
                 sx={{ background:isMuiltiSelct? green['700']: "", }} 
                >
                    סמן רצף   
           </Button>
           </Badge>

           <Button  sx={{background:AdminMapPositions.disabled?"red":"green"}} 
           onClick={()=>{setAdminMapPositions(p=>({...p,disabled:!p.disabled}))}}
           >
            {AdminMapPositions.disabled?
              <BsFillSignStopFill size={"2em"} />:
             <IoMdMove size={"2em"}/>
             }
           </Button>

             <Tooltip  title={"נקה בחירה "} placement="top" >
              <Button 
               
                color="error"
                onClick={()=>{}}
       
                > 
                {"נקה"}
                <MdOutlineDeselect size={"2em"}/>
          </Button>
          </Tooltip>

          </Flex>


                 
    );
}

export default SeatControls;

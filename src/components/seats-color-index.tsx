import SingleTipContext from "@/context/admin/new-event/map/single-tip-context";
import MultiSelectContext from "@/context/admin/new-event/map/multi-select-context";
import { Colors } from "@/lib/colors";
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

const AdminSeatColorsIndex =({isMuiltiSelct,setIsMultiSelect,multiSelectBadgeInfo}:SeatColorsIndexProps)=> {
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const {AdminMapPositions,setAdminMapPositions} =useContext(AdminMapPositionsContext)
    const { resetSingleTip }=useContext(SingleTipContext)
    const {resetMultiTip, multiTipInfo} =useContext(MultiSelectContext)
    const theme = useTheme()

    return (  
        <>
        <Divider sx={{borderWidth:3 , background:theme.palette.primary.dark}} />

         <Flex     justifyContent={"center"} alignItems={"center"}  >

          <Flex direction={'row'}      m={0.5}  justifyContent={'center'} gap={!xs? 0: 7}    >
            
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
                 sx={{ background:isMuiltiSelct? green['700']: "", m:0.5  }} 
                >
                    סמן רצף   
           </Button>
           </Badge>

           <Button  sx={{background:AdminMapPositions.disabled?"red":"green" , m:0.5}} 
           onClick={()=>{setAdminMapPositions(p=>({...p,disabled:!p.disabled}))}}
           >
            {AdminMapPositions.disabled?
              <BsFillSignStopFill size={"2em"} />:
             <IoMdMove size={"2em"}/>
             }
           </Button>

             <Tooltip  title={"נקה בחירה "} placement="top" >
           <Button 
                sx={{m:0.5,p:0.5}}
                color="error"
                onClick={()=>{}}
       
                > 
                {"נקה"}
                <MdOutlineDeselect size={"2em"}/>
          </Button>
          </Tooltip>

          </Flex>
         <Flex direction={'row'}  >
         
          <Avatar  sx={{ bgcolor: blue[800 ] ,p:.3}}>רגיל</Avatar>
          <Avatar sx={{ bgcolor: "black" ,p:.3 }}  > חסום</Avatar>
          <Avatar sx={{ bgcolor: green[800] ,p:.3 }}> הנחה</Avatar>
          <Avatar sx={{ bgcolor: orange[600] ,p:.3 }}  > נגיש</Avatar>
          <Avatar sx={{ bgcolor: pink[600] ,p:.3 ,textAlign:"center"}}  > הנחה נגיש</Avatar>
        
         </Flex>
        
        </Flex>
        </>     
    );
}

export default AdminSeatColorsIndex;

export const ClinetSeatColorsIndex = ()=>{
  return  <Flex direction={'row'} height={80}  justifyContent={"center"} borderTop={'solid'} >
      <Avatar  sx={{ bgcolor: grey[300], margin:1 , padding:.5 }} variant={'square'} >זמין</Avatar>        
      <Avatar sx={{ bgcolor: Colors.b , margin:1,padding:.5 }} variant={'square'} >נבחר</Avatar>
      <Avatar sx={{ bgcolor: red[800] , margin:1 , padding:.5 }} variant={'square'} >תפוס</Avatar>
      <Avatar sx={{ bgcolor: blue[800] , margin:1 , padding:.5 }} variant={'square'} > מוזל</Avatar>
      <Avatar sx={{ bgcolor: orange[600] , margin:1 , padding:.5 }} variant={'square'} > נגיש</Avatar>
      <Avatar sx={{ bgcolor: pink[600] , margin:1 , padding:.5 }} variant={'square'} > מוזל נגיש</Avatar>

      <Avatar variant='square' sx={{bgcolor:"black"}} >חסום</Avatar>
    </Flex>     
}
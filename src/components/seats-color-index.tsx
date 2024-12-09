import SingleTipContext from "@/context/single-tip-context";
import MultiSelectContext from "@/context/multi-select-context";
import { Colors } from "@/lib/colors";
import { Avatar , Badge, Button, Divider, Stack as Flex, useTheme  } from "@mui/material";
import { blue, green, grey, red } from "@mui/material/colors";
import { useContext } from "react";


/*
INDEX !!!!!
0:init : blue[700] primary
1:taaken : red
2:selected :porpole
3:block : black
4:Discount : green[800]

*/

interface SeatColorsIndexProps  { 
    isMuiltiSelct? :boolean ,
    setIsMultiSelect:React.Dispatch<React.SetStateAction<Boolean>>
    multiSelectBadgeInfo:number
    

 }

const AdminSeatColorsIndex =({isMuiltiSelct,setIsMultiSelect,multiSelectBadgeInfo}:SeatColorsIndexProps)=> {

    const {resetSingleTip }=useContext(SingleTipContext)
    const {resetMultiTip,resetErr , multiTipInfo} =useContext(MultiSelectContext)
    const theme = useTheme()

    return (  
        <>
        <Divider sx={{borderWidth:3 , background:theme.palette.primary.dark}} />
        <Flex direction={'row'} flexWrap={'wrap'}  sx={{borderWidth:3}}  color={theme.palette.primary.dark}   justifyContent={"center"}  >

        <Flex direction={'row'} justifyContent={'space-around'}  width={'100%'} p={1}  >
            
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
                 sx={{alignSelf:"center" , background:isMuiltiSelct? green['700']: "" }} 
                 variant='contained' >
                    סמן רצף מושבים  
                    </Button>

        </Badge>


            <Button 
               sx={{alignSelf:"center"  }} 
                variant='contained' 
                onClick={()=>{}}
                >נקה הכול
          </Button>

        </Flex>

         <Flex direction={'row'}  >
          <Avatar  sx={{ bgcolor: blue[800] , margin:1 , padding:.5 }} variant={'square'} >רגיל</Avatar>
          <Avatar sx={{ bgcolor: "black" , margin:1 , padding:.5 , color:"#ddd" }} variant={'square'} > חסום</Avatar>
          <Avatar sx={{ bgcolor: green[800] , margin:1 , padding:.5 }} variant={'square'} > מוזל</Avatar>
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
      <Avatar variant='square' sx={{bgcolor:"black"}} >חסום</Avatar>
    </Flex>     
}
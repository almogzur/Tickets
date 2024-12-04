import { Colors } from "@/lib/colors";
import { Avatar , Button, Stack as Flex  } from "@mui/material";
import { blue, grey, red } from "@mui/material/colors";

interface SeatColorsIndexProps  { 
    isMuiltiSelct? :boolean ,
    setIsMultiSelect:React.Dispatch<React.SetStateAction<Boolean>>

 }

const AdminSeatColorsIndex =({isMuiltiSelct,setIsMultiSelect}:SeatColorsIndexProps)=> {

    return (  
        <>
     
        <Flex direction={'row'} flexWrap={'wrap'}    justifyContent={"center"} borderTop={'solid'} >

        <Flex direction={'row'} justifyContent={'center'}  width={'100%'} p={1} >
            <Button onClick={()=>{setIsMultiSelect(!isMuiltiSelct)}} sx={{alignSelf:"center" , background:isMuiltiSelct? "red": "" }} variant='contained' >בחר רצף מושבים  </Button>
        </Flex>

        <Flex direction={'row'} >
          <Avatar  sx={{ bgcolor: grey[300], margin:1 , padding:.5 }} variant={'square'} >רגיל</Avatar>
          <Avatar sx={{ bgcolor: blue[800] , margin:1 , padding:.5 }} variant={'square'} > מוזל</Avatar>
          <Avatar sx={{ bgcolor: "black" , margin:1 , padding:.5 , color:"#ddd" }} variant={'square'} > חסום</Avatar>
         </Flex>
        
        </Flex>
        </>     
    );
}

export default AdminSeatColorsIndex;

export const ClinetSeatColorsIndex = ({}:SeatColorsIndexProps)=>{
    <Flex direction={'row'} height={80}  justifyContent={"center"} borderTop={'solid'} >

    <Avatar  sx={{ bgcolor: grey[300], margin:1 , padding:.5 }} variant={'square'} >זמין</Avatar>
         
    <Avatar sx={{ bgcolor: Colors.b , margin:1,padding:.5 }} variant={'square'} >נבחר</Avatar>
    <Avatar sx={{ bgcolor: red[800] , margin:1 , padding:.5 }} variant={'square'} >תפוס</Avatar>
    <Avatar sx={{ bgcolor: blue[800] , margin:1 , padding:.5 }} variant={'square'} > מוזל</Avatar>
    </Flex>     
}
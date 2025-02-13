import { Backdrop, Typography, Stack as Flex } from "@mui/material";
import { grey } from "@mui/material/colors";
import  Logo from '@/public/logo.png'
import Image from "next/image";
import LinearBufferLoading from "./lineare-buffer-loading";

export function LoadingScreen ({text}:{text?:string}) {

    return (
        <Backdrop
            sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 , padding:10 , background:grey[200]})}
            open={true}
         >
          <Flex width={"100%"} alignItems={'center'}>
            <Image alt="" width={150} height={150} src={Logo.src} />
            <LinearBufferLoading/>
             {text ? 
             <Typography variant='h4' p={2} >{text}</Typography>
             :
             <Typography variant='h4' p={2} >טוען</Typography>  
            }
         </Flex>
       </Backdrop>
      );
}


 export default LoadingScreen ;
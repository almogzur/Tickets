import { useSession } from 'next-auth/react'
import {Dispatch, MouseEventHandler, Ref, SetStateAction, useContext, useEffect,useRef,useState} from 'react'
import { useRouter } from 'next/router'
import {Typography , Stack as Flex ,useTheme , Box } from '@mui/material'

import Image from 'next/image'
import WidthContext from '@/context/WidthContext'
import { FcAddImage } from "react-icons/fc";
import { FcRemoveImage } from "react-icons/fc";

interface CoverUploadPropsType { 
    file:File | undefined
    preview:string
    setPreview:Dispatch<SetStateAction<string>>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) =>void
    setFile:Dispatch<SetStateAction<File | undefined>>
}

const CoverUploadTab=({file , preview,onFileChange,setFile,setPreview}:CoverUploadPropsType)=>{

    const router = useRouter()
    const theme =useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const Inputref = useRef<HTMLInputElement>(null);
    

 
return (
    <>
         
      <Flex   height={'calc(100% - 80px)'}  overflow={"auto"}  >

                <input type='file' id='cover'    onChange={onFileChange}  accept=".jpg, .jpeg, .png "  ref={Inputref}   hidden />

            { preview &&  file &&
             <Box  
                alignSelf={"center"}  
          sx={{ padding:!sm?0.5:!md?2:3, }}  
       
              >
            <>
            <Image 
              src={preview} 
              alt={file.name} 
              width={!sm?260:!md? 500 :600}
              height={!sm?300:400}
              style={{ objectFit:'contain'}} 
              translate='yes'
              
              />
            <Typography sx={{color:"black" , m:.5}} fontWeight={700}  textAlign={'center'}  variant='body2' > שם הקובץ :  {file.name.toLocaleUpperCase()}</Typography>
            </>
            </Box>
    
            }
     
 
      </Flex>
      <BasicSpeedDial 
            file={file} 
            preview={preview} 
            setFile={setFile}
            setPreview={setPreview}
             onFileChange={ onFileChange}
             perentRef={Inputref}
            />

    </>
) 
}

export default CoverUploadTab



import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';



interface  BasicSpeedDialPropsType extends CoverUploadPropsType {
   perentRef : React.RefObject<HTMLInputElement>
}



function BasicSpeedDial({file,preview,setFile,setPreview,onFileChange,perentRef}:BasicSpeedDialPropsType) {

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const  closeDialog : MouseEventHandler<HTMLDivElement> = (e): void => {
    const inputFile  = perentRef.current;
    
    if (inputFile) {

      inputFile.value=""
      setPreview(""); 
      setFile(undefined)
      
  }
  return
  

  }

  const openDialog: MouseEventHandler<HTMLDivElement> = (e) => {
    const inputFile  = perentRef.current;

    if (inputFile) {
        inputFile.click()
        
    }
    return
    
  };




  return (
    
    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1 ,}}>
      <SpeedDial
   
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
        icon={<SpeedDialIcon />} ariaLabel={''}      >
    
          <SpeedDialAction
            
            icon={<FcAddImage size={"2em"} />}
            onClick={openDialog}
            tooltipTitle={"הוסף תמונה "}
            
          />
            <SpeedDialAction
      
            icon={<FcRemoveImage size={"2em"}/>}
            onClick={closeDialog} 
            tooltipTitle={"הסר תמונה "}
          />

      </SpeedDial>
    </Box>

    
  );
}

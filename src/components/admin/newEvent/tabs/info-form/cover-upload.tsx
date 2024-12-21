import { useSession } from 'next-auth/react'
import {Dispatch, MouseEventHandler , useContext, useRef} from 'react'
import { useRouter } from 'next/router'
import {Typography , Stack as Flex ,useTheme , Box } from '@mui/material'

import Image from 'next/image'
import WidthContext from '@/context/WidthContext'
import { FcAddImage } from "react-icons/fc";
import { FcRemoveImage } from "react-icons/fc";
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'


import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';



interface CoverUploadPropsType { }

const CoverUploadTab=({}:CoverUploadPropsType)=>{

    const router = useRouter()
    const theme =useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)

    const Inputref = useRef<HTMLInputElement>(null);
    
        const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
          const selectedFile  = e.target.files !== null  ?  e.target.files[0] :null
    
    
            if (selectedFile) {
              
              setInfoFileds (p=>({...p, image:selectedFile}))
              setInfoFileds( p=>({...p, preview:URL.createObjectURL(selectedFile)}) );

            
          
            }
    
    };

 
return (
    <>
         
      <Flex   height={'calc(100% - 80px)'}  overflow={"auto"}  >

                <input type='file' id='cover'    onChange={handleFileChange}  accept=".jpg, .jpeg, .png "  ref={Inputref}   hidden />

            { infoFileds.preview && infoFileds.image &&
             <Box  
                alignSelf={"center"}  
                  sx={{ padding:!sm?0.5:!md?2:3, }}  
       
              >
            <>
            <Image 
              src={infoFileds.preview} 
              alt={infoFileds.image.name} 
              width={!sm?260:!md? 500 :600}
              height={!sm?300:400}
              style={{ objectFit:'contain'}} 
              translate='yes'
              
              />
            <Typography sx={{color:"black" , m:.5}} fontWeight={700}  textAlign={'center'}  variant='body2' > שם הקובץ :  {infoFileds.image.name.toLocaleUpperCase()}</Typography>
            </>
            </Box>  
            }
     
 
      </Flex>
      <BasicSpeedDial 
             perentRef={Inputref}
            />

    </>
) 
}






interface  BasicSpeedDialPropsType extends CoverUploadPropsType {
   perentRef : React.RefObject<HTMLInputElement>
}



function BasicSpeedDial({perentRef}:BasicSpeedDialPropsType) {

  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)


  const  closeDialog : MouseEventHandler<HTMLDivElement> = (e): void => {
    const inputFile  = perentRef.current;
    
    if (inputFile) {

      inputFile.value=""
      setInfoFileds(p=>({...p,preview:""})); 
      setInfoFileds(p=>({...p,image:undefined}))
      
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



export default CoverUploadTab
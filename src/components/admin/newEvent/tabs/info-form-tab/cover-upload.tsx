import { useSession } from 'next-auth/react'
import { MouseEventHandler , useContext, useRef} from 'react'
import { useRouter } from 'next/router'
import {Typography , Stack as Flex ,useTheme , Box, Button, Chip, Tooltip } from '@mui/material'

import WidthContext from '@/context/WidthContext'

import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'



import { grey } from '@mui/material/colors'
import { RiImageAddFill } from 'react-icons/ri'
import { LuImageMinus } from 'react-icons/lu'



interface CoverUploadPropsType { }

const CoverUploadTab=({}:CoverUploadPropsType)=>{

    const router = useRouter()
    const theme =useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)
    const Inputref = useRef<HTMLInputElement>(null);

    const openDialog: MouseEventHandler<HTMLButtonElement> = (e) => {
    const inputFile  = Inputref.current;

    if (inputFile) {
        inputFile.click()
        
    }
    return
    
  };
    const closeDialog : MouseEventHandler<HTMLButtonElement> = (e): void => {
    const inputFile  = Inputref.current;
    
    if (inputFile) {

      inputFile.value=""
      setInfoFileds(p=>({...p,preview:""})); 
      setInfoFileds(p=>({...p,image:undefined}))
      
    }
  return
  }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      
          const selectedFile  = e.target.files !== null  ?  e.target.files[0] :null
    
            if (selectedFile) {
              setInfoFileds (p=>({...p, image:selectedFile}))
              setInfoFileds( p=>({...p, preview:URL.createObjectURL(selectedFile)}) );
            }
    
    };
    
return (
    <Flex mt={3.5}  direction={"row"} gap={1}  >
        <Tooltip  title={"הוסף תמונה "} placement='top' >
         <Button  sx={{p:0.5 , boxShadow:0, background:grey[200]}} onClick={openDialog}  variant='text'  ><RiImageAddFill size={"1.5em"}  /></Button>
        </Tooltip>
        <Tooltip  title={"הסר תמונה "} placement='top' >
      <Button sx={{ p: 0.5, boxShadow: 0, background: grey[200] }} onClick={closeDialog}  variant='text'  ><LuImageMinus size={"1.5em"}  /></Button>
        </Tooltip>
 
           <input type='file' id='cover'    onChange={handleFileChange}  accept=".jpg, .jpeg, .png "  ref={Inputref}   hidden />

    </Flex>
) 
}









export default CoverUploadTab
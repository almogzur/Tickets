import { useSession } from 'next-auth/react'
import { MouseEventHandler , useContext, useRef} from 'react'
import { useRouter } from 'next/router'
import {Typography , Stack as Flex ,useTheme , Box, Button, Chip, Tooltip } from '@mui/material'

import WidthContext from '@/context/WidthContext'

import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context'



import { grey } from '@mui/material/colors'
import { RiImageAddFill } from 'react-icons/ri'
import { LuImageMinus } from 'react-icons/lu'
import { CldUploadWidget } from 'next-cloudinary'



interface CoverUploadPropsType { }

const CoverUploadTab=({}:CoverUploadPropsType)=>{

    const router = useRouter()
    const theme =useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)
    const Inputref = useRef<HTMLInputElement>(null);
    const { data: session ,status ,update} = useSession()

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
     <CldUploadWidget
      
      uploadPreset="fx9hpz2j"
   //   onUploadAdded={(resulte)=>{console.log(resulte)}}
     onQueuesEnd={(result,)=>{
       if(result.info && typeof result.info !=='string'){
          const files = result.info.files as unknown
            if(Array.isArray(files)){
                 files.map((file,i)=>{
                  const id = file.uploadInfo.public_id 
                  setInfoFileds(p=>({...p,preview:id}))        
                }
            
          )
        }
       } 
       
       
        

      
     }}
      options={{
        sources:["local","google_drive","dropbox"], 
        defaultSource:'local',       
        maxFiles:1,
        multiple:false,
        showPoweredBy:false,
        showUploadMoreButton:false,
        showAdvancedOptions:false,
        folder: `${session?.user?.name?.toString()}`|| "אורח",
        singleUploadAutoClose:false,
        
        
        
      }}
     >
     {
     ({ open, results }) => {

       return (
        <Button 
           sx={{p:0.5 , boxShadow:0, background:grey[200]}} 
           onClick={() => {open()}}
            
           variant='text'
             >
            <RiImageAddFill size={"1.5em"}  />
        </Button>
    );
     }}
     </CldUploadWidget>
    </Flex>
) 
}









export default CoverUploadTab
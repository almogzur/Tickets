import { useSession } from 'next-auth/react'
import {Dispatch, MouseEventHandler, SetStateAction, useContext, useEffect,useRef,useState} from 'react'
import { useRouter } from 'next/router'
import {Typography , Stack as Flex, Select ,useTheme , Box, FormControl, FormLabel, InputLabel, OutlinedInput, Button, Divider } from '@mui/material'
import OutLineInputWrap from '../input'
import { grey } from '@mui/material/colors'
import Image from 'next/image'
import WidthContext from '@/context/WidthContext'

interface CoverUploadPropsType { 
    file:File
    preview:string
    setPreview:Dispatch<SetStateAction<string>>
    onFileChange: (e: React.ChangeEvent<HTMLInputElement>) =>void
    setFile:Dispatch<SetStateAction<File>>
}

const CoverUpload=({file , preview,onFileChange,setFile,setPreview}:CoverUploadPropsType)=>{

  const router = useRouter()
    const theme =useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const Inputref =useRef(null)
    
    const openDialog: MouseEventHandler<HTMLButtonElement> = () => {
        const inputFile  = Inputref.current;

        if (inputFile) {
            inputFile.click()
            
        }
        return
        
      };


return (
    <>
         
      <Flex mt={3}    >

              <FormControl sx={{
                    m:0,
                    p:2,
                    bgcolor:grey[400],
                    display:"flex",
                    flexWrap:"wrap",
                    flexDirection:  "column",
                    alignItems:"center",
                     justifyContent:"space-evenly",
                     gap:2,
                     boxShadow:theme.shadows[15],
                       }}
                      >
                <Typography variant='h6'  textAlign="start" sx={{color:"black"}}  >תמונת  נושא </Typography>

                 <Flex direction={"row"} gap={10} >
                   <Button sx={{ height:60}}  onClick={openDialog} > {  "בחר תמונה "} </Button> 
                  { preview && <Button onClick={()=>{setPreview(null); setFile(null)}} sx={{ width:100 , height:60 }} >הסר</Button>}
                </Flex>       
                <input type='file' id='cover'    onChange={onFileChange}  accept=".jpg, .jpeg, .png"  ref={Inputref}   hidden />
              </FormControl>

            { preview &&  
             <Typography sx={{color:"black"}} textAlign={"center"} variant='h5' >תצוגה מקדימה  
            </Typography>
            }
            { preview && 
             <Box 
                
                bgcolor={grey[300]}     
                alignSelf={"center"}  
                sx={{
                   padding:2 ,
                   background:grey[400],
                   boxShadow:theme.shadows[10],
                   
             
                   }}  
              >
            <>
            <Image 
              src={preview} 
              alt={file.name} 
              width={!sm?250:!md? 400 :600}
              height={!sm?300:400}
              style={{ objectFit:'contain'}} 
              translate='yes'
              
              />
            <Typography sx={{color:"black" , m:.5}} variant='body2' > שם הקובץ :  {file.name.toLocaleUpperCase()}</Typography>
            </>
            </Box>
            }
    </Flex>
    </>
) 
}

export default CoverUpload
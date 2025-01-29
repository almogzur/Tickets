import { signIn, useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, FormEvent, useContext, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Stack as Flex , Box, Typography, FormControl, InputLabel , TextField, Paper, Button, Container, Alert, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { useTheme } from '@mui/material/styles';
import { MdOutlineCancelPresentation } from "react-icons/md";
import InputWrap from '@/components/gen/TeextFiledWrpa/input-wrap'
import bcrypt from 'bcryptjs';

import SingInButton from '@/components/admin/sing-in-button'
import { NewUserType } from '../../lib/supervisor_types'
import WidthContext from '@/context/WidthContext'


interface errorMessagesType{

  [key: string]: string;
}

export default function SingInPage(){

  const router = useRouter()
  const { data: session ,status ,update } = useSession()
  const theme = useTheme()
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const { error }  =  router.query

  const errorMessages :errorMessagesType  = {
     error:"שגיאה כללית ",
     Callback: "Error in the OAuth callback handler route.",
     CredentialsSignin: "שם משתמש או סמסמה לא קיימים במערכת ",
     Default: "שגיאה במערכת נסה שנית ",
  };


  // password is hasheds when user created 
  const [ formData ,setFormData ] = useState<NewUserType>({
    name:"",
    password:"",
  })

  const submit = (e: FormEvent<HTMLFormElement> )=>{
   // console.log(e);
    

    signIn(
      'credentials' ,{
         name: formData.name,
         password:formData.password,
         callbackUrl:"/admin"
        },
      )

    }


//     if (status === 'loading') {
//      return <h1 style={{textAlign:'center'}}>Loading...</h1>
// }



return (

  <Flex  height={'100vh'}  alignItems={"center"} justifyContent={"center"}  >

    <Paper elevation={16}   sx={{boxShadow:"" , width:"90%" , maxWidth:1000,p:1  }} >
      
      <Box sx={{ height:!xs? 450:  600  }} >
        
         <MdOutlineCancelPresentation
          size={!xs? "2em": "3em"} 
          color={theme.palette.primary.main} 
          style={{marginTop:15 , marginRight:15}}
          onClick={()=>router.back()}
          
          />
       
         <Typography 
              
              color={theme.palette.primary.main} 
              textAlign={"center"} 
              variant= {!xs? "h5": 'h3'} >
                התחברות למערכת 
         </Typography>

         <Flex direction={'row'} justifyContent={"center"} >
             <Image src={Logo} height={0} width={0}  alt=""></Image>
         </Flex>

         <form onSubmit={e=>{e.preventDefault();  submit(e)}}  >
     

               <Flex direction={"row"} justifyContent={"center"} >
            <Flex   justifyContent={"center"}  width={300}  >

               <InputWrap 
                  placeholder='שם משתמש'
                  variant='outlined'
                  value={formData.name}
                  label={'שם משתמש'}
                  onChangeHndler={(e) => { setFormData(p => ({ ...p, name: e.target.value })) } }
                  helpText={''}
                  isLabelBold
                  isValueBold
                  placeholderStyle={ {color: theme.palette.primary.main, fontWeight: "bold", opacity: 1 }} 
                  labelPositioin={'top'} 
                  
                  />

                 <InputWrap  
                  value={formData.password}
                  onChangeHndler={(e) => { setFormData(p => ({ ...p, password: e.target.value })) } }
                  inputType='password'
                  variant='outlined'
                  label={'סיסמה'}
                  helpText={''}
                  isLabelBold
                  labelPositioin={'top'}        
                                        



                  placeholder={'סיסמה'}
                  placeholderStyle={{ color: theme.palette.primary.main, fontWeight: "bold", opacity: 1 }}
                     />


            </Flex>
            </Flex>

 


            <Flex direction={'row'} justifyContent={"center"} m={2}   >
               <Button
                type='submit'  
               sx={{
                  width:170,
                  bgcolor:theme.palette.primary.main, color:"#fff" ,
                  p:1,              
                  fontSize:20,
                  fontWeight:"bold",
                 }}  >התחבר
              </Button>
           </Flex>

         </form>
     </Box>
                {/*  change the quary system to context  */}
     { typeof error ==='string'&& errorMessages.hasOwnProperty( error) &&  <Alert sx={{direction:"rtl"}} severity="error">{ errorMessages[error] }</Alert>}

    </Paper>

   </Flex>

) 
}




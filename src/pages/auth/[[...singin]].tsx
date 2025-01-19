import { signIn, useSession } from 'next-auth/react'
import {ChangeEvent, ChangeEventHandler, FormEvent, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Stack as Flex , Box, Typography, FormControl, InputLabel , TextField, Paper, Button, Container, Alert, SelectChangeEvent } from '@mui/material'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { useTheme } from '@mui/material/styles';
import { MdOutlineCancelPresentation } from "react-icons/md";
import InputWrap from '@/components/gen/TeextFiledWrpa/input-wrap'
import SelectWrap from '@/components/gen/select-wrap'
import TextAreaWrap from '@/components/gen/TeextFiledWrpa/text-area-wrap'
import { singInUserType } from '../api/auth/[...nextauth]'


interface errorMessagesType{

  [key: string]: string;
}

export default function SingInPage(){

  const router = useRouter()
  const { data: session ,status ,update } = useSession()
  const theme = useTheme()

  const {error }  =  router.query

  const errorMessages :errorMessagesType  = {
     error:"שגיאה כללית ",
     Callback: "Error in the OAuth callback handler route.",
     CredentialsSignin: "שם משתמש או סמסמה לא קיימים במערכת ",
     Default: "שגיאה במערכת נסה שנית ",
  };

 
  const [ formData ,setFormData ] = useState<singInUserType>({
    name:"",
    password:"",
    role:""
  })


  const submit = (e: FormEvent<HTMLFormElement> )=>{
   // console.log(e);
    

    signIn(
      'credentials' ,
       {
       name: formData.name,
       password: formData.password ,
       role:formData.role,
       callbackUrl:"/admin"
        }
    
      )}



//     if (status === 'loading') {
//      return <h1 style={{textAlign:'center'}}>Loading...</h1>
// }



return (
   <Container sx={{direction:"rtl"}}>
  <Flex  height={'100vh'}  alignItems={"center"} justifyContent={"center"}   >
    <Paper elevation={16}   sx={{boxShadow:"" , width:"90%"}} >
      
      <Box sx={{ height:600  }} >
        
         <MdOutlineCancelPresentation
          size={"3em"} 
          color={theme.palette.secondary.main} 
          onClick={()=>router.back()}
          style={{margin:5}}
          />
       

          <Typography 
              p={2}  
              color={theme.palette.secondary.main} 
              textAlign={"center"} 
              variant='h3' >
                התחברות למערכת 
           </Typography>

           <Flex direction={'row'} justifyContent={"center"} >
             <Image src={Logo} height={0} width={0}  alt=""></Image>
           </Flex>

         <form onSubmit={e=>{e.preventDefault();  submit(e)}}  >
     

         <Flex direction={"row"} justifyContent={"center"}   >

             <Flex>
               <InputWrap 
      
                  placeholder='שם משתמש'
                  variant='outlined'
                  value={formData.name}
                  label={'שם משתמש '}
                  onChangeHndler={(e) => { setFormData(p => ({ ...p, name: e.target.value })) } }
                  helpText={''}
                  isLabelBold


                  isValueBold


                  placeholderStyle={{ color: theme.palette.primary.main, fontWeight: "bold", opacity: 1 }} labelPositioin={'top'}               />

                 <InputWrap  
                  value={formData.password}
                  onChangeHndler={(e) => { setFormData(p => ({ ...p, password: e.target.value })) } }
                  inputType='password'
                  variant='outlined'
                  label={'סיסמה'}
                  helpText={''}
                  isLabelBold

                  placeholder={'סיסמה'}
                  placeholderStyle={{ color: theme.palette.primary.main, fontWeight: "bold", opacity: 1 }} labelPositioin={'end'}                   
                     />

              <SelectWrap 
                  label={'אפשריות התחברות'}  
                  items={[{value:"admin",label:"מנהל מערכת"},{value:"user",label:"משתמש"}]}
                  value={formData.role}
                  changeHndler={(e)=>{setFormData(p=>({...p,role:e.target.value}))} } 
                  labelPositioin={'top'}
                  helpText={''}
                  isValueBold
                  isLabelBold

                  
    
                  
                 />
          
               </Flex>

          </Flex>


            <Flex direction={'row'} justifyContent={"center"}  >
               <Button type='submit'  
               sx={{
                  bgcolor:theme.palette.secondary.main, color:"#fff" ,
                  width:"40%" ,
                  height:60 ,
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
   </Container>
) 
}




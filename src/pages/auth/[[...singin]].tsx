import { signIn, useSession } from 'next-auth/react'
import {FormEvent, useEffect,useState} from 'react'
import { useRouter } from 'next/router'
import { Stack as Flex , Box, Typography, FormControl, InputLabel , TextField, Paper, Button, Container, Alert } from '@mui/material'
import Image from 'next/image'
import Logo from '../../../public/logo.png'
import { Colors } from '@/lib/colors'
import { useTheme } from '@mui/material/styles';
import { MdOutlineCancelPresentation } from "react-icons/md";

const SingInPage=()=>{

  const router = useRouter()
  const { data: session ,status ,update } = useSession()
  const theme = useTheme()
  const {error} =  router.query;

  const errorMessages = {
    Callback: "Error in the OAuth callback handler route.",
    CredentialsSignin: "שם משתמש או סמסמה לא קיימים במערכת ",
    Default: "שגיאה במערכת נסה שנית ",
  };

  useEffect(()=>{
  if(status === 'authenticated'){
    router.push("/admin")
  }    
  },[error])

  const [ formData ,setFormData ] = useState({
    name:"",
    password:""
  })


  const submit = (e: FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    console.log(e);
    

    signIn('credentials' ,{ name: formData.name, password: formData.password ,callbackUrl:"/admin" }  )}

  const handleChange = (e) => {
    
    const {name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

    if (status === 'loading') {
     return <h1 style={{textAlign:'center'}}>Loading...</h1>
}



return (
<Container sx={{direction:"rtl"}}>
  <Flex  height={'100vh'}  alignItems={"center"} justifyContent={"center"}   >
    <Paper elevation={16}   sx={{boxShadow:"" , width:"90%"}} >
      
      <Box sx={{ height:600  }} >
        
         <MdOutlineCancelPresentation
          size={"3em"} 
          color={Colors.b} 
          onClick={()=>router.back()}
          style={{margin:5}}
          />
       

          <Typography p={2} color={Colors.b} textAlign={"center"}  variant='h3' > התחברות למערכת </Typography>

           <Flex direction={'row'} justifyContent={"center"} >
             <Image src={Logo} height={0} width={0}  alt=""></Image>
           </Flex>

         <form onSubmit={e=>{e.preventDefault();  submit(e)}}  >
     

         <Flex direction={"row"} justifyContent={"center"}   >

             <Flex>
               <TextField 
               name='name'
                placeholder='שם משתמש'
                 variant='outlined' 
                 value={formData.name}
                 onChange={handleChange}
                  required={true}
                 sx={{
                  direction:"rtl",
                   m:1,
                   
                
                 '& .MuiInputBase-input':{ fontWeight:900 , width:"210px" , },
                 '& .MuiInputBase-input::placeholder': {color: Colors.b , opacity:0.8},
                }}
               />

               <TextField 
               name='password'
               placeholder='סיסמה'
               variant='outlined' 
               color='info' 
               type='password'
               value={formData.password}
               onChange={handleChange}
               required
               sx={{ direction:"rtl" , m:1,
                '& .MuiInputBase-input':{ fontWeight:900 ,},
                '& .MuiInputBase-input::placeholder': {color: Colors.b , opacity:0.8},
               }}
                 />
             </Flex>

          </Flex>




            <Flex direction={'row'} justifyContent={"center"}  >
               <Button type='submit'  sx={{bgcolor:Colors.b, color:"#fff" , width:"40%" , height:60 ,fontSize:20, fontWeight:"bold" }}  >התחבר</Button>
           </Flex>

         </form>
     </Box>

     { error && <Alert sx={{direction:"rtl"}} severity="error">{errorMessages[`${error}`]  }</Alert>}

    </Paper>

   </Flex>
   </Container>
) 
}

export default SingInPage 


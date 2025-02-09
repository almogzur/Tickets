import InputWrap from '@/components/gen/TeextFiledWrpa/input-wrap';
import { FormEvent, useState } from 'react';
import bcrypt from 'bcryptjs';
import { Button, Typography , Stack as Flex, Container } from '@mui/material';

import axios from 'axios';
import { grey } from '@mui/material/colors';
import AdminLayout from '@/components/Layouts/admin-layout';
import { NewUserType } from '@/types/pages-types/supervisor-types';


const UserForm = () => {
  const [error, setError] = useState(null);
  const [newUser,setNewUeer]=useState<NewUserType>({
      name:'',
      password:"",
      displayName:''

  })


  const hashPassword = async (password:string) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  };

  const SaveNewUser = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();


    const hashedPassword = await hashPassword(newUser.password);

    const HashedPasswordUser : NewUserType = {
        name:  newUser.name,
        password: hashedPassword,
        displayName:newUser.displayName
        
    }
    try {
         const response = await axios.post('/api/admin/user/C/new-user',HashedPasswordUser,{} )
         return response
    } 
    catch (err) {
      alert("Not Saved ")
        return null
    } 
  };

  return (
<>
     <AdminLayout>
        <Container>
      <Typography textAlign={'end'}   variant='h5' >צור משתמש</Typography>
        <Flex bgcolor={grey[200]}  p={2} m={3}  borderRadius={5}>
      <form onSubmit={SaveNewUser}>
 
          <Flex direction={"row"}>
        <InputWrap label={'שם'} 
            value={newUser.name} 
            onChangeHndler={(e)=>{setNewUeer(p=>({...p,name:e.target.value}))} } 
            helpText={''} 
            labelPositioin={'top'}
            variant='outlined'
            styles={{margin:3}}
            Fgrow={1}
            />

        <InputWrap
         label={'סיסמה ' } 
        variant='outlined'
         value={newUser.password}
          onChangeHndler={(e)=>{setNewUeer(p=>({...p,password:e.target.value}))} }
           helpText={''} 
           labelPositioin={'top'}
           styles={{margin:3}}
           Fgrow={1}
           />

<InputWrap 
                  label={"שם תצוגה "} 
                  variant='outlined'
                  value={newUser.displayName} 
                  onChangeHndler={(e)=>{
                    setNewUeer(p=>({...p,displayName:e.target.value}))
                  } } 
                  helpText={''} 
                  labelPositioin={'top'}
                  Fgrow={1}

                  />
          </Flex>

          
           <Flex direction={"row"} justifyContent={"center"} >
              <Button type='submit' sx={{width:"7em",mt:3}} > שמור </Button>
          </Flex>
      </form>
      </Flex>
      </Container>
    </AdminLayout>
    </>
  );
};

export default UserForm;

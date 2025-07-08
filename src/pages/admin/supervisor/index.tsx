import { FormEvent, useState } from 'react';
import { Button, Typography, Stack as Flex, Container } from '@mui/material';

import axios from 'axios';
import { grey } from '@mui/material/colors';
import { NewUserType } from '@/types/pages-types/admin/supervisor-types';
import { hashString } from '@/util/fn/hash';
import InputWrap from '@/mui-components/text_filed_wrap/input-wrap';


const UserForm = () => {
  const [error, setError] = useState(null);
  const [newUser, setNewUser] = useState<NewUserType>({
    name: '',
    password: "",
    displayName: ''

  })

  const SaveNewUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const hashedPassword = await hashString(newUser.password);
    const HashedPasswordUser: NewUserType = {
      name: newUser.name,
      password: hashedPassword,
      displayName: newUser.displayName

    }
    try {
      const response = await axios.post('/api/super/new-user', HashedPasswordUser, {})
      return response
    }
    catch (err) {
      alert("Not Saved ")
      return null
    }
  };

  return (
            <Container>
          <Typography textAlign={'end'} variant='h5' >צור משתמש</Typography>
          <Flex bgcolor={grey[200]} p={2} m={3} borderRadius={5}>
            <form onSubmit={SaveNewUser}>

              <Flex direction={"row"}>
                <InputWrap label={'שם'}
                  value={newUser.name}
                  onChangeHandler={(e) => { setNewUser(p => ({ ...p, name: e.target.value })) }}
                  helpText={''}
                  labelPosition={'top'}
                  variant='outlined'
                  styles={{ margin: 3 }}
                  Fgrow={1}
                />

                <InputWrap
                  label={'סיסמה '}
                  variant='outlined'
                  value={newUser.password}
                  onChangeHandler={(e) => { setNewUser(p => ({ ...p, password: e.target.value })) }}
                  helpText={''}
                  labelPosition={'top'}
                  styles={{ margin: 3 }}
                  Fgrow={1}
                />

                <InputWrap
                  label={"שם תצוגה "}
                  variant='outlined'
                  value={newUser.displayName}
                  onChangeHandler={(e) => {
                    setNewUser(p => ({ ...p, displayName: e.target.value }))
                  }}
                  helpText={''}
                  labelPosition={'top'}
                  Fgrow={1}
                />
              </Flex>


              <Flex direction={"row"} justifyContent={"center"} >
                <Button type='submit' sx={{ width: "7em", mt: 3 }} > שמור </Button>
              </Flex>
            </form>
          </Flex>
        </Container>
  );
};

export default UserForm;

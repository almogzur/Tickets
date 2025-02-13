import InputWrap from '@/HOCs/TeextFiledWrpa/input-wrap';
import { Container, Stack as Flex } from '@mui/material'

export function SettingTabWebsiteTab() {
    return ( 
        <Container sx={{p:2,m:1}} >
          <Flex width={"100%"} direction={"row"}>
           <InputWrap variant='outlined' label={"שם באתר "}  helpText={""} value={""} onChangeHndler={() =>{}} labelPositioin={"top"} />
          </Flex>
        </Container>
     );
}

export default SettingTabWebsiteTab;
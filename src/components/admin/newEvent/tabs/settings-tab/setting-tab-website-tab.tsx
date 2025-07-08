import InputWrap from '@/mui-components/text_filed_wrap/input-wrap';
import { Container, Stack as Flex } from '@mui/material'

export function SettingTabWebsiteTab() {
    return ( 
        <Container sx={{p:2,m:1}} >
          <Flex width={"100%"} direction={"row"}>
           <InputWrap variant='outlined' label={"שם באתר "}  helpText={""} value={""} onChangeHandler={() =>{}} labelPosition={"top"} />
          </Flex>
        </Container>
     );
}

export default SettingTabWebsiteTab;
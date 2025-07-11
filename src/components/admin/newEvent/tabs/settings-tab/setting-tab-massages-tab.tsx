
import WidthContext from "@/context/WidthContext";
import TextAreaWrap from "@/mui-components/text_filed_wrap/text-area-wrap";
import { Container, Stack as Flex } from '@mui/material'
import { useContext, useState } from "react";

const ColumnA = Flex
const  Wrapper = Flex
const ColumnB= Flex


export default function SettingTabMassageTab() {

   const [x,setX] = useState<string>("")  
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

return (
     <Container sx={{p:2,m:1}} >
   
    <Wrapper   >

      <ColumnA direction={!xs?"column":"row"}   >

      <TextAreaWrap
           variant='outlined'
           label={"הודעה 1 "}
           value={x}
           onChangeHandler={(e) => { setX(e.target.value) } }
           labelPosition={"top"} 
           helpText={""} 
           multiline
           rows={6}
           Fgrow={1}
 
          />
         <TextAreaWrap
           variant='outlined'
           label={"הודעה 2 "}
           value={x}
           onChangeHandler={(e) => { setX(e.target.value) } }
           labelPosition={"top"} 
           helpText={"abc"} 
           multiline
           rows={6}
           Fgrow={1}
      
          />
         <TextAreaWrap
           variant='outlined'
           label={"הודעה 2 "}
           value={x}
           onChangeHandler={(e) => { setX(e.target.value) } }
           labelPosition={"top"} 
           helpText={"abc"} 
           multiline
           rows={6}
           Fgrow={1}

          />
      </ColumnA>
      
      <ColumnB direction={!xs?"column":"row"}   >
     
        <TextAreaWrap
           variant='outlined'
           label={"הודעה 3 "}
           value={x}
           onChangeHandler={(e) => { setX(e.target.value) } }
           labelPosition={"top"} 
           helpText={""} 
           multiline
           rows={6}
           Fgrow={1}
          />
        <TextAreaWrap
           variant='outlined'
           label={"הודעה 4 "}
           value={x}
           onChangeHandler={(e) => { setX(e.target.value) } }
           labelPosition={"top"} 
           helpText={""} 
           multiline
           rows={6}
           Fgrow={1}
          />
      </ColumnB>
    </Wrapper>
              
      

    </Container>
     );
}


import InputWrap from "@/components/gen/TeextFiledWrpa/input-wrap";
import WidthContext from "@/context/WidthContext";
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

      <InputWrap
           variant='outlined'
           label={"הודעה 1 "}
           value={x}
           onChangeHndler={(e) => { setX(e.target.value) } }
           labelPositioin={"top"} 
           helpText={""} 
           isMultiline
           rows={6}
           Fgrow={1}
 
          />
         <InputWrap
           variant='outlined'
           label={"הודעה 2 "}
           value={x}
           onChangeHndler={(e) => { setX(e.target.value) } }
           labelPositioin={"top"} 
           helpText={"kjhgkj"} 
           isMultiline
           rows={6}
           Fgrow={1}
      
          />
         <InputWrap
           variant='outlined'
           label={"הודעה 2 "}
           value={x}
           onChangeHndler={(e) => { setX(e.target.value) } }
           labelPositioin={"top"} 
           helpText={"kjhgkj"} 
           isMultiline
           rows={6}
           Fgrow={1}

          />
      </ColumnA>
      
      <ColumnB direction={!xs?"column":"row"}   >
     
        <InputWrap
           variant='outlined'
           label={"הודעה 3 "}
           value={x}
           onChangeHndler={(e) => { setX(e.target.value) } }
           labelPositioin={"top"} 
           helpText={""} 
           isMultiline
           rows={6}
           Fgrow={1}
          />
        <InputWrap
           variant='outlined'
           label={"הודעה 4 "}
           value={x}
           onChangeHndler={(e) => { setX(e.target.value) } }
           labelPositioin={"top"} 
           helpText={""} 
           isMultiline
           rows={6}
           Fgrow={1}
          />
      </ColumnB>
    </Wrapper>
              
      

    </Container>
     );
}


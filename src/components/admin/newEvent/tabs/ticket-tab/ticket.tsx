import InputWrap from "@/components/admin/input";
import WidthContext from "@/context/WidthContext";
import { Ticket } from "@/pages/_app";
import { useContext} from "react";

import { Paper, useTheme , Stack as Flex ,Box ,Typography, Chip, Container, Avatar, TextFieldVariants, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { FcCurrencyExchange, FcLeave, FcSearch } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete, MdDiscount } from "react-icons/md";
import { FcFilm, } from "react-icons/fc";
import  MyChip from '@/components/admin/newEvent/chip'
import { FcServices } from "react-icons/fc";

const TicketComponent = ({price,evenName,eventDate,type,location,discoundInfo,TickerclosingSealesDate}:Ticket) => {

   
    const theme = useTheme()
           const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    
    return (
      <Flex justifyContent={"center"} direction={"row"} >
        
      <Container
      maxWidth="lg"
      disableGutters={true}
        sx={{
         boxShadow:3,
          m:1,

        }}
      >
        {/* Header */}
          <Flex display={"row"}   p={0}   >

              
                
                <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} gap={1} m={0}  >
                     <Flex>
                         <MyChip 
                              text={type==="normal" ? "  רגיל " : type==="discount"? "  הנחה"   :null } 
                               icon={<FcFilm size={"2em"} />} 
                                m={1}
                                 w={140}
                                  p={3}  
                                 styleProps={{background:"#fff"}} 
                                 Scale={1.7}
                                 
                                 
                                  />
                      </Flex>

                     <Flex direction={"row" } gap={1} mx={!sm?1:2} >
                        <FcServices  size={"2em"} color="red"   />
                        <FcSearch size={"2em"}  />
                        <MdDelete  size={"2em"} color="red"  />
                    </Flex>
  
                  </Flex>


                  <Divider sx={{borderWidth:1.5}}/>
                      
              
            <Flex m={0}  p={2}   >

                <Flex direction={ !xs? "column": "row"} alignContent={"center"} flexWrap={"wrap"} >

                  <MyChip text={ `${price}`} icon={<FcCurrencyExchange />} m={0.5} grow={1} />

                  <MyChip text={ eventDate&& eventDate} icon={<FcPlanner/>} m={0.5} grow={4}/>

              </Flex>

              <Flex direction={ !xs? "column": "row"} flexWrap={"wrap"} alignContent={"center"}    >

                <MyChip text={location } icon={<IoLocationSharp color="#1a8cdc"/>} m={0.5}  />

                <MyChip text={ evenName}  icon={<FcViewDetails/>}  m={0.5} />

               
              </Flex>

              <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
              <MyChip text={TickerclosingSealesDate}  icon={<FcLeave color="red"/>} m={0.5} grow={0}  /> 

               { type === 'discount' && 
                  <MyChip text={discoundInfo}  icon={<MdDiscount color="red"/>} m={0.5} grow={0}  /> 
                }
              </Flex>
                
            </Flex>
              
                
  
           
          </Flex>
   
  
  
    
      </Container>
      </Flex>
    );
  };
  
  
  export default TicketComponent


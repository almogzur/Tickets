
// React 
import { useContext} from "react";

//Context 
import WidthContext from "@/context/WidthContext";


// Types 
import { BaceTicket, TicketType } from "@/pages/admin/new-event";

//Components 
import { useTheme , Stack as Flex , Container, Divider } from "@mui/material";
import  MyChip from '@/components/chip'

// Icons 
import {FcServices,FcFilm, FcBusinessman, FcCurrencyExchange, FcLeave, FcSearch,FcPlanner,FcViewDetails } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { MdDelete, MdDiscount } from "react-icons/md";

//Colors
import { grey } from "@mui/material/colors";


const TicketComponent = ({...props    }:BaceTicket) => {

    const theme = useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    
    return (
    <Flex justifyContent={"center"} direction={"row"} >
        
      <Container
      maxWidth="lg"
      disableGutters={true}
      
        sx={{
          m:1,
          boxShadow:theme.shadows[10]
        }}
      >
        {/* Header */}
          <Flex display={"row"}   p={0} >

              
        

                <Flex 
                      direction={"row"}
                       alignItems={"center"}
                        justifyContent={"space-between"}
                         gap={1}
                          m={0}
                           bgcolor={grey[200]}
                           boxShadow={theme.shadows[4]}
                            >
              
                         <MyChip 
                              text={ 
                                  props.selectedType==="normal" ? "  רגיל "
                                   :
                                    props.selectedType==="discount"?
                                     "הנחה" :
                                     props.selectedType==="citizen"? "תושב "
                                     :""
                                     } 
                               icon={  <FcFilm size={"2em"} color={"black"}  style={{border:`solid 1.5px ${theme.palette.secondary.main} ` ,  padding:1 }} />} 
                                m={1}

                                  p={2}  
                                 styleProps={{background:grey[200]}} 
                                 Scale={1.3}
                                  />
          

                     <Flex direction={"row" } gap={1} mx={!sm?1:2} >
                        <FcServices  size={"2em"} color="red"   />
                        <FcSearch size={"2em"}  />
                        <MdDelete  size={"2em"} color="red"  />
                    </Flex>
  
                  </Flex>


                  <Divider sx={{borderWidth:1.5}}/>
                      
              
            <Flex m={0}  p={2}   >

                <Flex direction={ !xs? "column": "row"} alignContent={"center"} flexWrap={"wrap"} >

                  <MyChip text={ props.selectedType?? ""  } icon={<FcCurrencyExchange />} m={0.5} grow={1} />
                  <MyChip text={ props.eventDate?? ""} icon={<FcPlanner/>} m={0.5} grow={4}/>

              </Flex>

              <Flex direction={ !xs? "column": "row"} flexWrap={"wrap"} alignContent={"center"}    >

                <MyChip text={props.location ?? ""} icon={<IoLocationSharp color="#1a8cdc"/>} m={0.5}  />

                <MyChip text={ props.evenName??""}  icon={<FcViewDetails/>}  m={0.5} />

               
              </Flex>

              <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
              <MyChip text={props.TicketClosingSealesDate?? ""}  icon={<FcLeave color="red"/>} m={0.5} grow={0}  /> 

               { props.selectedType === 'discount' && 
                  <MyChip text={props.priceInfo??""}  icon={<MdDiscount color="red"/>} m={0.5} grow={0}  /> 
                }
                {
                  props.selectedType === "citizen" && 
                  <MyChip text={props.priceInfo??""}  icon={<FcBusinessman color="red"/>} m={0.5} grow={0}  /> 
                }
              </Flex>
                
            </Flex>
              
                
  
           
          </Flex>
   
  
  
    
      </Container>
      </Flex>
    );
  };
  
  
  export default TicketComponent



// React 
import { useContext} from "react";

//Context 
import WidthContext from "@/context/WidthContext";


// Types 
import { BaceTicket, TicketType } from "@/pages/admin/new-event";

//Components 
import { useTheme , Stack as Flex , Container, Divider } from "@mui/material";
import  MyChip from '@/components/chip-wrap'

// Icons 
import { FaEye } from "react-icons/fa6";

import {FcServices,FcFilm, FcBusinessman, FcCurrencyExchange, FcLeave, FcSearch,FcPlanner,FcViewDetails } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { MdDelete, MdDiscount } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { FaFilePdf } from "react-icons/fa6";

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
          boxShadow:theme.shadows[1]
        }}
      >

          <Flex display={"row"}   p={0} >
                    {/* Header */}
                <Flex 
                      direction={"row"}
                       alignItems={"center"}
                        justifyContent={'space-between'}
                      
                     
                          p={1}
                           bgcolor={grey[200]}
                           boxShadow={theme.shadows[1]}
                            >
              
                

                 <Flex>
                        <FaFilePdf size={"2em"} color={theme.palette.secondary.main} style={{marginRight:20}} />
                 </Flex >

                    <Flex direction={'row'}  justifyContent={"end"} gap={2} >
                      <MdEdit size={"2em"}  color={theme.palette.secondary.main} />
                      <MdDelete  size={"2em"} color={theme.palette.secondary.main} />
                </Flex>
             
  
                  </Flex>


                  <Divider sx={{borderWidth:1.5}}/>
                      
              {/* Body */}
            <Flex m={0}  p={2}   >


            <Flex direction={ !xs? "column": "row"} alignContent={"center"}>

          

               </Flex>
               
          
                <Flex direction={ !xs? "column": "row"} alignContent={"center"} flexWrap={"wrap"} >
                <MyChip m={0.5} 
                              text={ 
                                  props.selectedType==="normal" ? "   סוג : רגיל "
                                   :
                                    props.selectedType==="discount"?  " סוג : הנחה"  :
                                     props.selectedType==="citizen"? "סוג : תושב "
                                     :""
                                     } 
                 />
                   <MyChip text={   "מחיר : "+    props.finelPrice    }  m={0.5} grow={1} />

                   { props.selectedType === 'discount' && 
                  <MyChip text={props.priceInfo}   m={0.5} grow={0}  /> 
                    }
                  {
                  props.selectedType === "citizen" && 
                  <MyChip text={ "סוג ההנחה : "+ props.priceInfo}   m={0.5} grow={0}  /> 
                }
             

              </Flex>

              <Flex direction={ !xs? "column": "row"} flexWrap={"wrap"} alignContent={"center"}    >

                <MyChip text={ "מיקום : " +  props.location}m={0.5}  />

                <MyChip text={ "שם : " +props.evenName}   m={0.5} />

               
              </Flex>

              <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
              <MyChip text={ "  תאריך האירוע :  " + props.eventDate}  m={0.5} grow={4}/>
              <MyChip text={ "  סגירת קופות : " +  props.TicketClosingSealesDate}  m={0.5} grow={0}  /> 
         
          
              </Flex>


            </Flex>
              
                
  
           
          </Flex>
   
  
  
    
      </Container>
      </Flex>
    );
  };
  
  
  export default TicketComponent



// React 
import { useContext} from "react";

//Context 
import WidthContext from "@/context/WidthContext";


// Types 
import { BaceTIcketType } from "@/pages/admin/new-event";

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
import { FullDateOptions } from "@/pages/_app";



const TicketComponent = ({ eventName,EndSealesDate,price,priceInfo,selectedType,cat,location ,Date  }:BaceTIcketType) => {
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
                        <FaFilePdf size={"2em"} color={theme.palette.primary.main} style={{marginRight:5}} />
                 </Flex >

                    <Flex direction={'row'}  justifyContent={"end"} gap={2} >
                      <MdDelete  size={"2.5em"} color={theme.palette.primary.main} />
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
                                   selectedType==="normal" ?
                                    " סוג : רגיל "
                                   :
                                    selectedType==="discount"? 
                                     " סוג : הנחה"
                                       :
                                    "סוג : תושב "
                                     } 
                 />
                   <MyChip text={   "מחיר : "+    price    }  m={0.5} grow={1} />

                   { selectedType === 'discount' && 
                  <MyChip text={priceInfo}   m={0.5} grow={0}  /> 
                    }
                  {
                  selectedType === "citizen" && 
                  <MyChip text={  priceInfo}   m={0.5} grow={0}  /> 
                }
             

              </Flex>

              <Flex direction={ !xs? "column": "row"} flexWrap={"wrap"} alignContent={"center"}    >

                <MyChip text={ "מיקום : " +  location}m={0.5}  />

                <MyChip text={ "שם : " +eventName}   m={0.5} />

               
              </Flex>

              <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
              <MyChip text={ "  תאריך האירוע :  " +Date.toLocaleDateString("he-IL",FullDateOptions) }  m={0.5} grow={4}/>
              <MyChip text={ "  סגירת קופות : " +  EndSealesDate.toLocaleDateString("he-Il",FullDateOptions)}  m={0.5} grow={0}  /> 
         
          
              </Flex>


            </Flex>
              
                
  
           
          </Flex>
   
  
  
    
      </Container>
      </Flex>
    );
  };
  
  
  export default TicketComponent



// React 
import { ReactEventHandler, useContext} from "react";

//Context 
import WidthContext from "@/context/WidthContext";

// Types 
import { BaceTicketType } from "@/pages/admin/new-event";

//Components 
import { useTheme , Stack as Flex , Container, Divider, Button } from "@mui/material";
import  MyChip from '@/components/gen/chip-wrap'

// Icons 
import { MdDelete, MdDiscount } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";

//Colors
import { grey } from "@mui/material/colors";
import { FullDateOptions } from "@/pages/_app";
import tabsTicketContext from "@/context/admin/new-event/tabs/tabs-ticket-context";


interface TicketComponentPropsType extends BaceTicketType {
  index:number 
    }



const TicketComponent = ({ eventName,EndSealesDate,price,priceInfo,selectedType,cat,location ,Date ,index }:TicketComponentPropsType) => {
    const theme = useTheme()
   const {tickets,setTickets}= useContext(tabsTicketContext)
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const removeTicket= (e:React.MouseEvent<HTMLButtonElement>, ):void=>{ 
         
      }

    return (
    <Flex justifyContent={"center"} direction={"row"} >
        
      <Container
        maxWidth="lg"
        disableGutters={true}
        sx={{   m:1, boxShadow:theme.shadows[1]}}
      >

          <Flex display={"row"}   p={0} >
                    {/* Header */}
                <Flex 
                   direction={"row"}
                   alignItems={"center"}
                   justifyContent={'space-between'}                     
                   p={1}
                   bgcolor={grey[200]}
                >
                 <Button sx={{p:0,m:0,}} variant='text' >
                   <FaFilePdf size={"1.5em"} color={theme.palette.primary.main}  />
                 </Button >

                 <Button sx={{p:0,m:0}} variant='text'  onClick={removeTicket}   >
                   <MdDelete  size={"1.7em"} color={theme.palette.primary.main} />
                </Button>
             
  
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


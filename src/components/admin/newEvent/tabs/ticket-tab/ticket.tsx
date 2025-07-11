
// React 
import { ReactEventHandler, useContext, useEffect} from "react";

//Context 
import WidthContext from "@/context/WidthContext";

// Types 

//Components 
import { useTheme , Stack as Flex , Container, Divider, Button, Box } from "@mui/material";

// Icons 
import { MdDelete, MdDiscount } from "react-icons/md";
import { FaFilePdf } from "react-icons/fa6";

//Colors
import { grey } from "@mui/material/colors";
import { FullDateOptions } from "@/pages/_app";
import tabsTicketContext from "@/context/admin/new-event/tabs/tabs-ticket-context";
import { TicketType } from "@/types/pages-types/admin/admin-event-types";
import MyChip from "@/mui-components/chip-wrap";


interface TicketComponentPropsType extends TicketType {
  index:number 
    }



const TicketComponent = ({ EndSalesDate,price,priceInfo,selectedType ,index }:TicketComponentPropsType) => {

    const theme = useTheme()
   const {tickets,setTickets}= useContext(tabsTicketContext)
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const translateCardType = (selectedType:string) : string =>{
        switch(selectedType){
          case "discount": return  "הנחה"
          break;
          case  "normal": return  "רגיל"  
          break;
          case "": return "" 
          default : return  ""
        }

    }

    const removeTicket = (e: React.MouseEvent<HTMLButtonElement>): void => {

      setTickets((prevTickets) => prevTickets.filter((_ticket, i) => i !== index));
    };

    return (
        
      <Flex 
        sx={{
             m:1, 
             borderBottomLeftRadius:15,
             boxShadow:theme.shadows[1],
             transform: "scale(1)", // Default state
             transition: "transform 1s ease", // Smooth transition
             "&:hover": {
               transform: "scale(1.02)", // Slight zoom on hover
             },
         }}
       >
        {/* Header */}
          <Flex 
           direction={"row"}
           alignItems={"center"}
           justifyContent={'space-between'}                     
           p={1}
           bgcolor={'black'}
          >
          <Button sx={{p:0,m:0,}} variant='text' >
            <FaFilePdf size={"1.5em"} color={theme.palette.primary.main}  />
          </Button >
          <Button sx={{p:0,m:0}} variant='text'  onClick={removeTicket}   >
            <MdDelete  size={"1.7em"} color={theme.palette.primary.main} />
         </Button>
            
          </Flex>         
                {/* Body */}    
          <Box p={2}  >

             <Flex direction={ !xs? "column": "row"} alignContent={"center"} flexWrap={"wrap"} >
                   <MyChip m={0.5} 
                       text={ "סוג : "  + translateCardType(selectedType) } 
                   />
                     
                     <MyChip text={   "מחיר : "+    price    }  m={0.5} grow={1} />
                      
                      { selectedType === 'discount' &&    <MyChip text={ "תיאור: " + priceInfo}  m={0.5} grow={0}  />  }
                     
                      { EndSalesDate&&
                        <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
                          <MyChip text={ "  סגירת קופות : " +  EndSalesDate}  m={0.5} grow={0}  /> 
                     </Flex>
                      } 
                    
             </Flex>

          
          </Box>
            
      </Flex>
    );
  };
  
  
  export default TicketComponent


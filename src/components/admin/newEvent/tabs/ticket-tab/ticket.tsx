import InputWrap from "@/components/admin/input";
import WidthContext from "@/context/WidthContext";
import { Ticket } from "@/pages/_app";
import { Paper, useTheme , Stack as Flex ,Box ,Typography, Chip, Container, Avatar, TextFieldVariants, Divider } from "@mui/material";
import { grey } from "@mui/material/colors";
import { CSSProperties, JSXElementConstructor, ReactElement, ReactNode, useContext } from "react";
import { FcCurrencyExchange, FcSearch } from "react-icons/fc";
import { FcPlanner } from "react-icons/fc";
import { IoLocationSharp } from "react-icons/io5";
import { FcViewDetails } from "react-icons/fc";
import { MdDelete, MdDiscount } from "react-icons/md";
import { FcFilm, } from "react-icons/fc";

const TicketComponent = ({price,discription,eventDate,type,location,discoundInfo}:Ticket) => {

   
    const theme = useTheme()
           const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    
    return (
      <Flex justifyContent={"center"} direction={"row"} >
        
      <Container
      maxWidth="lg"
      disableGutters={true}
        sx={{
      
          boxShadow: 3,
          m:2,

    
 
          
        }}
      >
        {/* Header */}
          <Flex display={"row"}   p={0}   >

              
                
                <Flex direction={"row"} alignItems={"center"} justifyContent={"space-between"} gap={1} m={0}  >
                     <Flex>
                         <MyChip  text={type==="normal" ? "  רגיל " : type==="discount"? "  הנחה"   :null }  icon={<FcFilm/>}  m={1} w={150} p={3}   styleProps={{background:"#fff"}}  />
                      </Flex>

                     <Flex direction={"row"}>
                        <FcSearch size={"2em"} />
                        <MdDelete  size={"2em"} color="red"  />
                    </Flex>
  
                  </Flex>


                  <Divider sx={{borderWidth:1.5}}/>
                      
              
       



            <Flex m={0}  p={2}   >

                <Flex direction={ !xs? "column": "row"} alignContent={"center"} flexWrap={"wrap"} >

                  <MyChip text={ `${price}`} icon={<FcCurrencyExchange />} m={0.5} grow={1} />

                  <MyChip text={ eventDate} icon={<FcPlanner/>} m={0.5} grow={4}/>

              </Flex>

              <Flex direction={ !xs? "column": "row"} flexWrap={"wrap"} alignContent={"center"}    >

                <MyChip text={location } icon={<IoLocationSharp color="#1a8cdc"/>} m={0.5}  />

                <MyChip text={ discription}  icon={<FcViewDetails/>}  m={0.5} />

               
              </Flex>

              <Flex direction={ !xs? "column": "row"}  flexWrap={"wrap"}  alignContent={"center"} >
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

  interface MyChipType {
    text:string,
    icon?:ReactElement<unknown, string | JSXElementConstructor<any>>,
    p?:CSSProperties['padding'] ,
    m?:CSSProperties['margin'],
    br?:CSSProperties['borderRadius'],
    styleProps?:CSSProperties,
    grow?:CSSProperties['flexGrow']
    w?:CSSProperties['width']
    v?:"filled"|"outlined"
    


    
  }

  const MyChip = ({text, icon , p, m,br,styleProps , grow , w ,v}:MyChipType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        return  <Chip 
                    avatar={icon}
                    label={text} 
                    sx={{
                        m:m?? 2, 
                        p:p?? 2.5, 
                        justifyContent:"start", 
                        borderRadius:br?? 0,
                        fontSize:!xs? 14: 16 ,
                        flexGrow:grow?? 1,
                        '& .MuiChip-label': {},
                        '& .MuiChip-avatar':{ scale:1.5 } ,
                        bgcolor:grey[100],
                        width: w? w:  !sm? "100%":null



                      }}
                      variant= {v? v: 'filled'   }
                      style={{...styleProps}}
                        />
  }
import { useTheme ,Stack as Flex, Typography, Divider, Button, Chip} from "@mui/material"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, SetStateAction, useContext } from "react"
import MultiSelectContext from "@/context/admin/new-event/map/multi-select-context"
import { grey, orange, pink } from "@mui/material/colors"
import {TheaterType } from "@/pages/admin/new-event"
import { InfoFormType } from "@/pages/admin/new-event"

    interface MultiSelectTipType {
        isMultiSelect: boolean
        theaterDate:TheaterType
        setTheater:Dispatch<SetStateAction<InfoFormType>>
    }

  const MuliSelectTip =({theaterDate,setTheater}:MultiSelectTipType)=>{

    const {multiTipPositions  ,resetMultiTip , multiTipInfo,setMultiTipInfo ,resetErr}= useContext(MultiSelectContext)

    const upateSeateValue  = (newSeatValueArg: number  ) : void =>  {

      console.log(multiTipInfo,theaterDate);
      

        const dirArg = multiTipInfo.selectdir
        const row = multiTipInfo.row 
        const first = multiTipInfo.first
        const second = multiTipInfo.second

      const inMain =  theaterDate.mainSeats.hasOwnProperty(row)  
      const inSide =  theaterDate.sideSeats.hasOwnProperty(row)  


       if(inMain ){
        setTheater(prevState => {
          if(prevState.Theater && first !==undefined &&second !==undefined){

                   // Clone the previous state immutably
                   const newState = {
                     ...prevState,
                     Theater: { ...prevState.Theater },
                   };

                   // Clone the sideSeats object
                   const newSideSeats = { ...newState.Theater.mainSeats };
                 
                   // Clone the specific row to ensure immutability
                   const updatedRow = [...newSideSeats[row]];
                 
                   // Perform updates based on the direction
                   let newRow : number[] =[];
                   if (dirArg === "R") {
                     newRow = updatedRow.map((seat, index) =>
                       index >= second && index <= first ? newSeatValueArg : seat
                     );
                   } else if (dirArg === "L") {
                     newRow = updatedRow.map((seat, index) =>
                       index >= first && index <= second ? newSeatValueArg : seat
                     );
                   }
                 
                   // Update the specific row in sideSeats
                   newSideSeats[row] = newRow;
        
                     // Reassign updated sideSeats back to the state
                     newState.Theater.mainSeats = newSideSeats;
        
                    return newState;
        }
           else{
                    return {...prevState}
        }
      }
       );
         }
      else if(inSide){


        setTheater((prevState) => {
          if(prevState.Theater && first !==undefined &&second !==undefined){
            // Clone the previous state immutably
              const newState = {
                ...prevState,
                Theater: { ...prevState.Theater },
              };
            
              // Clone the sideSeats object
              const newSideSeats = { ...newState.Theater.sideSeats };
            
              // Clone the specific row to ensure immutability
              const updatedRow = [...newSideSeats[row]];
            
              // Perform updates based on the direction
              let newRow : number[] = [];
            
              if (dirArg === "R") {
                newRow = updatedRow.map((seat, index) =>
                  index >= second && index <= first ? newSeatValueArg : seat
                );
              } 
              else if (dirArg === "L") {
                newRow = updatedRow.map((seat, index) =>
                  index >= first && index <= second ? newSeatValueArg : seat
                );
                }

                // Update the specific row in sideSeats
                newSideSeats[row] = newRow;

                // Reassign updated sideSeats back to the state
                newState.Theater.sideSeats = newSideSeats;

              return newState;
  
          }
          else{
            return prevState
          }
        }
);
   
         }
       resetMultiTip()
        


        
 };

    const theme = useTheme()
    const comonAtt : CSSProperties = {  padding:0.3, margin:0.2 ,  }


    return (
     
       <AnimatePresence>    
         {  multiTipPositions.x && multiTipPositions.y &&
         <motion.div 
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{
            width:150,
            position:'absolute',   
            top:`${multiTipPositions.y-135 }px`,
            left:`${multiTipPositions.x-150}px`,
            textAlign:"end",
            zIndex:4,
            background:grey['A400'],
            borderRadius:10,
            padding:5,
            boxShadow:theme.shadows[19],
        }}
           >
             <Flex alignItems={"center"} >
            {multiTipInfo.first !==undefined &&   <Typography color='primary' variant='inherit' textAlign={"center"} p={0.5} >{   multiTipInfo.row } מושב : {multiTipInfo.first+1}</Typography>    }                
               
               <Divider  sx={{ color:theme.palette.warning.main , p:0.5,  width:"100%"}}   > {multiTipInfo.second? "עד":null}</Divider>

                {!multiTipInfo.err && multiTipInfo.second !==undefined &&
                 <Flex alignItems={"center"}> 

                 { multiTipInfo.second != undefined  &&  <Typography variant='inherit' textAlign={'center'}  color='warning'  >  מושב {  multiTipInfo.second+1}</Typography>}

                 { multiTipInfo.totalselected && 
                      <>
                       <Divider variant='fullWidth'   sx={{color:theme.palette.error.dark, width:"100%"}} > סה״כ</Divider>
                       <Typography color="error">{multiTipInfo.totalselected}</Typography> 
                      </>
                }
        

                <Flex  direction={'row'} flexWrap={'wrap'} justifyContent={'center'}  >
                  <Button 
                     variant='contained' 
                      color='success' 
                      sx={comonAtt} 
                      onClick={(e)=>{ upateSeateValue( 4) }}
                    
                      >
                     מוזל
                  </Button>
                  {/* Bloacked */}
                  <Button
                         variant='contained' 
                         sx={{ background:theme.palette.common.black, ...comonAtt}}  
                         onClick={(e)=>{ upateSeateValue( 3,) }}

                         >
                         חסום
                  </Button>
                 {/* normal */}
                 <Button    
                  variant='contained' 
                  sx={comonAtt}    
                  onClick={(e)=>{ upateSeateValue( 0) }}

                >רגיל 
                </Button>

                 <Button 
                  sx={{bgcolor: orange[600] ,  ...comonAtt}} 
                  onClick={(e)=>{ upateSeateValue( 5) }}

                  >
                   נגיש 
               
                </Button>
                 <Button 
                  sx={{...comonAtt , bgcolor:pink[600]}}
                  onClick={(e)=>{ upateSeateValue( 6) }}
                >
                  נגיש מוזל
                </Button>
              
                </Flex>
      
                 </Flex>
                }

               {multiTipInfo.err && 
                 <Typography color='error' textAlign={"center"} variant='h6'  >{multiTipInfo.err}</Typography>
               }
             <Button variant='contained' color='error'   sx={{width:"50%" , p:0.5,mt:1}} onClick={()=>resetMultiTip()} >סגור </Button>
            </Flex>
        </motion.div>
        }
      </AnimatePresence> 
    )
      
  }
  export default MuliSelectTip
import { useTheme ,Stack as Flex, Typography, Divider, Button, Chip} from "@mui/material"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, SetStateAction, useContext } from "react"
import MultiSelectContext from "@/context/admin/new-event/map/multi-select-context"
import { grey, orange, pink } from "@mui/material/colors"
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types"
import { infoFieldsType } from "@/types/pages-types/admin/admin-event-types"


    interface MultiSelectTipType {
        isMultiSelect: boolean
        theaterDate:TheaterType
        setTheater:Dispatch<SetStateAction<infoFieldsType>>
    }

  const MuliSelectTip =({theaterDate,setTheater}:MultiSelectTipType)=>{

    const {multiTipPositions  ,resetMultiTip , multiTipInfo,setMultiTipInfo ,resetErr}= useContext(MultiSelectContext)

    const updateSeatValue  = (newSeatValueArg: number  ) : void =>  {

      console.log(multiTipInfo,theaterDate);
      

        const dirArg = multiTipInfo.selectDir
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
    const commonAtt : CSSProperties = {  padding:0.3, margin:0.2 ,  }


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
            top:`${multiTipPositions.y-95 }px`,
            left:`${multiTipPositions.x-50}px`,
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

                 { multiTipInfo.totalSelected && 
                      <>
                       <Divider variant='fullWidth'   sx={{color:theme.palette.error.dark, width:"100%"}} > סה״כ</Divider>
                       <Typography color="error">{multiTipInfo.totalSelected}</Typography> 
                      </>
                }
        

                <Flex  direction={'row'} flexWrap={'wrap'} justifyContent={'center'}  >

                  {/* blacked */}
                  <Button
                         variant='contained' 
                         sx={{ background:theme.palette.common.black, ...commonAtt}}  
                         onClick={(e)=>{ updateSeatValue( 3,) }}

                         >
                         חסום
                  </Button>
                 {/* normal */}
                 <Button    
                  variant='contained' 
                  sx={commonAtt}    
                  onClick={(e)=>{ updateSeatValue( 0) }}

                >רגיל 
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
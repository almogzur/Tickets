import { useTheme ,Stack as Flex, Typography, Divider, Button, Chip} from "@mui/material"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, Dispatch, SetStateAction, useContext } from "react"
import MultiSelectContext from "@/context/admin/new-event/map/multi-select-context"
import { grey, orange, pink } from "@mui/material/colors"
import { TheaterType } from "@/pages/_app"

    interface MultiSelectTipType {
        isMultiSelect: boolean
        theraer:TheaterType
        setTheater:Dispatch<SetStateAction<TheaterType>>
    }

  const MuliSelectTip =({theraer,setTheater}:MultiSelectTipType)=>{

    const {multiTipPositions , setMutiTipPositions ,resetMultiTip , multiTipInfo,setMultiTipInfo ,resetErr}= useContext(MultiSelectContext)

    const upateSeateValue  = (newSeatValueArg: number  ) : void =>  {

        const dirArg = multiTipInfo.selectdir
        const row = multiTipInfo.row 
        const first = multiTipInfo.first
        const second = multiTipInfo.second

      
      const inMain = theraer.mainSeats.hasOwnProperty(row)
      const inSide = theraer.sideSeats.hasOwnProperty(row)

      
      
      let newRow : number[]
      
       if(inMain){
        setTheater( p => {
                    // Find the movie object reference
             const newEventState = {...p};

            const newEventMainSeats = {...newEventState.mainSeats};
            const updatedRow = [...newEventMainSeats[row]]; // Clone the specific row

             if (dirArg==="R"){
                newRow = updatedRow.fill(newSeatValueArg , second , first +1 )
             }
             else if (dirArg==="L"){
                newRow=  updatedRow.fill(newSeatValueArg ,first , second+1 )
             }
                // Assign the updated row back to the seat details
                newEventMainSeats[row] = updatedRow;

                newEventState.mainSeats = newEventMainSeats;

                // Assign the updated seat details back to the movie
                return newEventState; // Return the updated state
           });
         }
         else if(inSide){
          setTheater( p => {
            // Find the movie object reference
           const newEventState = {...p};
           const newEventMainSeats = {...newEventState.sideSeats};
           const updatedRow = [...newEventMainSeats[row]]; // Clone the specific row

            if (dirArg==="R"){
             newRow = updatedRow.fill(newSeatValueArg , second , first +1 )
           }
            else if (dirArg==="L"){
            newRow=  updatedRow.fill(newSeatValueArg ,first , second+1 )

           }
        // Assign the updated row back to the seat details
        newEventMainSeats[row] = updatedRow;

        newEventState.sideSeats = newEventMainSeats;

        // Assign the updated seat details back to the movie
        return newEventState; // Return the updated state
   });
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
               <Typography color='primary' variant='inherit' textAlign={"center"} p={0.5} >{   multiTipInfo.row } מושב : {multiTipInfo.first+1}</Typography>                    
               <Divider  sx={{ color:theme.palette.warning.main , p:0.5,  width:"100%"}}   > {multiTipInfo.second? "עד":null}</Divider>
                {!multiTipInfo.err && multiTipInfo.second !==null &&
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
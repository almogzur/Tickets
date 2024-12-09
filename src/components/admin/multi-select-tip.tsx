import { useTheme ,Stack as Flex, Typography, Divider, Button, Chip} from "@mui/material"
import { motion ,AnimatePresence } from "framer-motion"
import { CSSProperties, useContext } from "react"
import MultiSelectContext from "@/context/multi-select-context"
import { grey } from "@mui/material/colors"

    interface MultiSelectTipType {
        isMultiSelect: boolean

    }

  const MuliSelectTip =({isMultiSelect}:MultiSelectTipType)=>{

    const {multiTipPositions , setMutiTipPositions ,resetMultiTip , multiTipInfo,setMultiTipInfo ,resetErr}= useContext(MultiSelectContext)

  

    const upateSeateValue = (newSeatValueArg: number , numberOfSeats :number , ) => {
    }

    const theme = useTheme()
    const comonAtt : CSSProperties = { width:"100%", padding:1, margin:0.5 }


    return (
     
       <AnimatePresence>
        
         {  multiTipPositions.x && multiTipPositions.y &&
         <motion.div 
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
        exit={{ opacity: 0, transition: { duration: 0.5 } }}
          style={{
            width:130,
            position:'absolute',   
            top:`${multiTipPositions.y-135 }px`,
            left:`${multiTipPositions.x-60}px`,
            textAlign:"end",
            zIndex:4,
            background:grey['A400'],
            borderRadius:10,
            padding:10,
            boxShadow:theme.shadows[19],
        }}
           >
            <Flex>
               <Typography color='primary' variant='inherit' textAlign={"center"} p={1} >{   multiTipInfo.rowSelect } מושב : {multiTipInfo.first}</Typography>                    

               <Divider  sx={{ color:"red" }}   > {multiTipInfo.second? "עד":null}</Divider>

             { !multiTipInfo.err && 
             <Flex alignItems={"center"} > 
                <Typography variant='inherit' textAlign={'center'} p={1} color='warning'  >  מושב { multiTipInfo.second && !multiTipInfo.err && multiTipInfo.second}</Typography>

       

                  <Button 
                     variant='contained' 
                     color='success' 
                     sx={comonAtt} 
                    
                      >
                     מוזל
                  </Button>
                {/* Bloacked */}
                 <Button
                         variant='contained' 
                         sx={{ background:theme.palette.common.black, ...comonAtt}}  
                         
                         >
                         חסום
                </Button>
                {/* normal */}
                <Button    
                  variant='contained' 
                  sx={comonAtt}    
                >רגיל 
                </Button>
             </Flex>
            }
            { multiTipInfo.err && 
                <Typography color='error' textAlign={"center"} variant='h6'  >{multiTipInfo.err}</Typography>
             }
             <Divider sx={{borderWidth:3}} />
             <Button variant='contained' color='error'  sx={{m:1}} onClick={()=>resetMultiTip()} >סגור </Button>
            </Flex>
        </motion.div>
        }
      </AnimatePresence> 
    )
      
  }
  export default MuliSelectTip
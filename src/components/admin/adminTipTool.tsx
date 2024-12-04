
import TipContext from "@/context/Tip-context"
import WidthContext from "@/context/WidthContext"
import { motion ,AnimatePresence } from "framer-motion"
import { useContext } from "react"
import { Stack as Flex } from "@mui/material"
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import ListItemButton from '@mui/joy/ListItemButton';
import { ListItemContent } from "@mui/joy"
import { Home, KeyboardArrowRight } from "@mui/icons-material"

const AdminMapTipTool= ({})=>{

    const { tipX, setTipX , tipY, setTipY}=useContext(TipContext)
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

 return   <AnimatePresence>
           {tipX && tipY  && (
               <motion.div
           style={{
              background: "#fff",
              color: "black",
              borderRadius: "4px",
              height:"fin-content",
              width:"fin-content",
              position:'absolute',
              zIndex:99,
              top:`${tipY-40 }px`,
              left:`${tipX-60}px`,
              fontSize:!xs? 12 : 15,
              padding:10,
              textAlign:"end",
              fontWeight:"bold"
              
              
           }}
  
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y:-33,   transition: { duration: 0.5 } }}
           exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {
               <List>
               <ListItem>
                <ListItemButton variant="solid">
                  <ListItemDecorator><Home /></ListItemDecorator>
                  <ListItemContent>Home</ListItemContent>
                  <KeyboardArrowRight />
                </ListItemButton>
               </ListItem>
             </List>
        
            }

              </motion.div>
          )}
          </AnimatePresence> 
}

export default AdminMapTipTool
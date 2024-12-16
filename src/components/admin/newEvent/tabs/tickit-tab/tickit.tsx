import { Ticket } from "@/pages/_app";
import { Paper, useTheme , Stack as Flex ,Box ,Typography } from "@mui/material";
import { FcSearch } from "react-icons/fc";

const TicketComponent = ({}:Ticket) => {
    const theme = useTheme()
    return (
      <Paper
        sx={{
          width: "90%",
          mx: "auto",     
          mt:1,
          boxShadow: 3,
          borderRadius: 2,
          overflow: "hidden",
          p:3
        }}
      >
        {/* Header */}
        <Flex display={"row"} >
           <Box sx={{ display: "flex", alignItems: "center" }}>
            
            <Box sx={{ mx: 1 }}>
              <Typography variant="h6" >
                סוג כרטיס
              </Typography>
              <Typography variant="body2" >
                Dibbya Subba
              </Typography>
            </Box>
            <FcSearch />
           </Box>
  
           
          </Flex>
   
  
  
    
      </Paper>
    );
  };
  
  
  export default TicketComponent
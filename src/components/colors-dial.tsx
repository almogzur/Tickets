import WidthContext from "@/context/WidthContext";
import { Box, SpeedDial, SpeedDialAction, Avatar } from "@mui/material";
import { blue, orange, green, pink } from "@mui/material/colors";
import { useContext, useState } from "react";
import { HiOutlineColorSwatch } from "react-icons/hi";


export default function ColorIndexDial() {
   const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)


  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  return ( 

    <Box sx={{  transform: 'translateZ(0px)', flexGrow: 1 }}>

      <SpeedDial
        sx={{ position: 'absolute', bottom: 40, right: !xs ? "10%" : "7%" }}
        icon={< HiOutlineColorSwatch size={"2em"} />}
        ariaLabel="SpeedDial basic example"
        direction='up'
        onClose={handleClose}
        onOpen={handleOpen}
        open={open}
      >


        <SpeedDialAction
          icon={<Avatar variant='rounded' sx={{ bgcolor: blue[800],  }}> </Avatar>}
          tooltipTitle={"רגיל"}
          tooltipOpen

        />
        <SpeedDialAction
          icon={<Avatar variant='rounded' sx={{ bgcolor: "black", }}  > </Avatar>}
          onClick={() => { }}
          tooltipTitle={"חסום"}
        tooltipOpen   
     />

        <SpeedDialAction
          icon={<Avatar variant='rounded' sx={{ bgcolor: orange[600], }}  > </Avatar>}
          tooltipTitle={"נגיש"}
          tooltipOpen

        />
        <SpeedDialAction
          icon={<Avatar variant='rounded' sx={{ bgcolor: green[400],  }}  > </Avatar>}
          tooltipTitle={"הנחה"}
          tooltipOpen

        />

        <SpeedDialAction
          icon={<Avatar variant='rounded' sx={{ bgcolor: pink[600],  textAlign: "center" }}  > </Avatar>}
          tooltipTitle={"הנחה נגיש"}
          tooltipOpen
        />
       
      </SpeedDial>
    </Box>



  );
}

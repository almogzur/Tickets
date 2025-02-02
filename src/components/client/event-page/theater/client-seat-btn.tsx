import { CSSProperties, useState, useMemo } from "react";
import { green, orange, purple, yellow } from "@mui/material/colors";
import { MdAccessible} from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { useTheme } from "@mui/material";
import { FaTicketAlt } from "react-icons/fa";
import { FaTicketSimple } from "react-icons/fa6";
import { LuTicket } from "react-icons/lu";

interface ToolTipButtonType {
  seatValue: number;
  seatnumber: number;
  row: string;
  hendler: (seatValue: number, seatnumber: number, row: string) => void;
}

const styles: Record<string, CSSProperties> = {
  seats: {
    backgroundColor: "#ddd",
    height: "7px",
    width: "7px",
    color: "black",
    margin: 2,
    border: "none",
    padding: 0,
    cursor: "pointer",
    borderRadius:1.3,
display:"flex",
    fontSize:7
    
  },
  seatBooked: { backgroundColor: "brown", cursor: "not-allowed" },
  seatSelected: { backgroundColor: purple[300] },
  seatBlocked: { color: "black", background: "black", cursor: "auto" },
  seatDiscounted: {},
  seatAccsesble: {},
};

const TooltipButton = ({ seatValue, seatnumber, row, hendler }: ToolTipButtonType) => {
  const [originalSeatType] = useState(seatValue);
  const [openDialog, setOpenDialog] = useState(false);
  const theme = useTheme()

  // Function to open the dialog
  const handleClick = () => {
    if (seatValue === 4 || seatValue === 5) {// discount of accses seat 
      setOpenDialog(true);
    } 
    else {
      hendler(seatValue, seatnumber, row); // no dialog
    }
  };

  // Precompute the style
  const seatStyle = useMemo(() => {
    if (seatValue === 1) return { ...styles.seats, ...styles.seatBooked };
    if (seatValue === 2) return { ...styles.seats, ...styles.seatSelected };
    if (seatValue === 3) return { ...styles.seats, ...styles.seatBlocked };
    if (seatValue === 4) return { ...styles.seats, ...styles.seatDiscounted };
    if (seatValue === 5) return { ...styles.seats, ...styles.seatAccsesble };
    return styles.seats;
  }, [seatValue]);



  const handleConfirm = () => {
    hendler(seatValue, seatnumber, row);
    setOpenDialog(false); 
  };

  const handleCancel = () => {
    setOpenDialog(false); 
  };

  return (
    <>
      <button onClick={handleClick} style={seatStyle}>

          {(originalSeatType === 5 || seatValue === 5) && <MdAccessible   color={ seatValue === 2? theme.palette.common.black : theme.palette.secondary.main }  />}
          {(originalSeatType === 4 || seatValue === 4) && <LuTicket  color={ seatValue === 2? theme.palette.common.black : theme.palette.secondary.main} />}

      </button>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={handleCancel}>
        <DialogTitle>Confirm Seat Selection</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to select this seat?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="primary">
            ביטול
          </Button>
          <Button onClick={handleConfirm} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default TooltipButton;

import { CSSProperties, useState, useMemo } from "react";
import { green, orange, purple } from "@mui/material/colors";
import { MdAccessible, MdDiscount } from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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
    fontSize: 7,
    cursor: "pointer",
    borderRadius:1.3
  },
  seatBooked: { backgroundColor: "brown", cursor: "not-allowed" },
  seatSelected: { backgroundColor: purple[300] },
  seatBlocked: { color: "black", background: "black", cursor: "auto" },
  seatDiscounted: { backgroundColor: green[700] },
  seatAccsesble: { backgroundColor: orange[600] },
};

const TooltipButton = ({ seatValue, seatnumber, row, hendler }: ToolTipButtonType) => {
  const [originalSeatType] = useState(seatValue);
  const [openDialog, setOpenDialog] = useState(false);

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
        {(originalSeatType === 5 || seatValue === 5) && <MdAccessible />}
        {(originalSeatType === 4 || seatValue === 4) && <MdDiscount />}
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

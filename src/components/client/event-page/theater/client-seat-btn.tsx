import { CSSProperties, useState, useMemo } from "react";
import { green, orange, purple, yellow } from "@mui/material/colors";
import { MdAccessible} from "react-icons/md";
import { BiSolidDiscount } from "react-icons/bi";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { SelectChangeEvent, Typography, useTheme } from "@mui/material";
import { FaTicketAlt } from "react-icons/fa";
import { FaTicketSimple } from "react-icons/fa6";
import { LuTicket } from "react-icons/lu";
import SelectWrap, { SelectItemType } from "@/components/gen/select-wrap";
import { EventType, TicketType } from "@/components/admin/newEvent/types/new-event-types";
import { TheaterType } from "@/components/admin/newEvent/theater/types/theater-types";

interface ToolTipButtonType {
  seatValue: number;
  seatnumber: number;
  row: string;
  hendler: (seatValue: number, seatnumber: number, row: string ,theater:TheaterType, price:string  ) => void;
  event:EventType|undefined
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

const TooltipButton = ({ seatValue, seatnumber, row, hendler, event }: ToolTipButtonType) => {
  const [originalSeatType] = useState(seatValue);

  const theme = useTheme()

  const [openDiscounteDialog, setOpenopenDiscounteDialog] = useState(false);
  const [openAccsessableDialog, setOpenAccsessableDialog] = useState(false);

  const [ selectedDiscounetPrice, setselectedDiscounetPrice ] = useState<string>("")



  const getDiscountes = ()=>{
         return event?.tickets?.filter((tikect)=> tikect.selectedType === 'discount' || tikect.selectedType==='citizen' ).flat()
  }
  const getNormailTicket = ()=>{
    return event?.tickets?.find((tikect)=> tikect.selectedType === 'normal' )
  }
  const getNoramlPrice = ()=>{
     return getNormailTicket()?.price ?? "" 
  }

  const getDiscountesNames= () : SelectItemType[] | undefined=>{
      const list =  getDiscountes()?.map((discount)=>{
            return {value :discount.price , label:discount.priceInfo}
          })
          if(list){
            return list
          }
  }




  // Function to open the dialog
  const handleClick = (seatValue:number) => {
    if (seatValue === 5) {// discount of accses seat 
      setOpenAccsessableDialog(true); // dialog invoke the hendler
    } 
    else if( seatValue === 4   ){
      setOpenopenDiscounteDialog(true) // dialog invoke the hendler
    }
    else {
      if(event?.Theater){
      hendler(seatValue, seatnumber, row ,event.Theater, getNoramlPrice() ); // no dialog
      }
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



  const handleDiscounteConfirm = () => {
     if(event?.Theater){
    hendler(seatValue, seatnumber, row , event.Theater , selectedDiscounetPrice);
    setOpenopenDiscounteDialog(false); 
     }
  };

  const handleDiscounteCancel = () => {
    setOpenopenDiscounteDialog(false); 
  };


  const handleAccsessableConfirm = () => {
    if(event?.Theater){
      hendler(seatValue, seatnumber, row,event?.Theater, getNoramlPrice());
      setOpenAccsessableDialog(false); 

    }
  };

  const handleAccsessableCancel = () => {
    setOpenAccsessableDialog(false); 
  };

  

  return (
    <>
      <button onClick={()=>  handleClick(seatValue)} style={seatStyle}>

          {(originalSeatType === 5 || seatValue === 5) && <MdAccessible   color={ seatValue === 2? theme.palette.common.black : theme.palette.secondary.main }  />}
          {(originalSeatType === 4 || seatValue === 4) && <LuTicket  color={ seatValue === 2? theme.palette.common.black : theme.palette.secondary.main} />}

      </button>

      {/* Discounte  Confirmation Dialog */}
          {/* accsessable Confirmation Dialog */}


{  seatValue === 4 ? 
      <Dialog
           open={openDiscounteDialog}
            onClose={handleDiscounteCancel}
            sx={{direction:"rtl"}}
            >
        <DialogTitle>בחר הנחה </DialogTitle>
        <DialogContent>
        <SelectWrap 
             label={"בחר ההנחה"} 
             items={getDiscountesNames()??[]} 
             value={selectedDiscounetPrice} 
             changeHndler={(e)=>{setselectedDiscounetPrice(e.target.value)} }
             helpText={""} 
             labelPositioin={"top"}
             />
          <Typography>יש להציג קופון/ תעודה </Typography>
          <Typography>בעת ההגעה לאירוע </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscounteCancel} color="primary">
            ביטול
          </Button>
          <Button onClick={handleDiscounteConfirm} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    
  : seatValue ===5 ?
      <Dialog
           open={openAccsessableDialog}
            onClose={handleAccsessableCancel}
            sx={{direction:"rtl"}}
            >
        <DialogTitle> מושב נגיש  </DialogTitle>
        <DialogTitle> בעת ההגעה לאולם יש להציג תעודה  </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccsessableCancel} color="primary">
            ביטול
          </Button>
          <Button onClick={handleAccsessableConfirm} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
      : null
}

    </>
  );
};

export default TooltipButton;

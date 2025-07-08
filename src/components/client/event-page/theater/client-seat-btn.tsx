import { CSSProperties, useState, useMemo, ReactNode } from "react";
import { green, orange, purple, yellow } from "@mui/material/colors";
import { MdAccessible} from "react-icons/md";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import {  Typography, useTheme } from "@mui/material";
import { LuTicket } from "react-icons/lu";
import { ClientEventType } from "@/types/pages-types/admin/admin-event-types";
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import SelectWrap, { SelectItemType } from "@/mui-components/select-wrap";

interface ToolTipButtonType {
  seatValue: number;
  seatNumber: number;
  row: string;
  handler: (seatValue: number, seatNumber: number, row: string ,theater:TheaterType, price:string ,  priceInfo?:string ) => void;
  event:ClientEventType|undefined
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
  seatAccessible: {},
};

const TooltipButton = ({ seatValue, seatNumber, row, handler, event }: ToolTipButtonType) => {

  const [originalSeatType] = useState(seatValue);

  const theme = useTheme()

  const [openDiscountDialog, setOpenDiscountDialog] = useState(false);
  const [openAccessibleDialog, setOpenAccessibleDialog] = useState(false);

  const [SelectedDiscountInfo ,setSelectedDiscountInfo ] = useState<{ price:string,priceInfo:string}>({
      price:'',
      priceInfo:''
    })


  const getDiscountsTickets = ()=>{
         return event?.tickets?.filter((ticket)=> ticket.selectedType === 'discount').flat()
  }
  const getDiscountsValues= () : SelectItemType[] | undefined=>{
    const list =  getDiscountsTickets()?.map((discount)=>{
          return {value :discount.price , label:discount.priceInfo}
        })
        if(list){
          return list
        }
}

  const getNormalTicket = ()=>{
    return event?.tickets?.find((ticket)=> ticket.selectedType === 'normal' )
  }
  const getNormalPrice = ()=>{
     return getNormalTicket()?.price ?? "" 
  }


  // Function to open the dialog
  const handleClick = (seatValue:number) => {
    if (seatValue === 5) {// discount of access seat 
      setOpenAccessibleDialog(true); // dialog invoke the handler
    } 
    else if( seatValue === 4   ){
      setOpenDiscountDialog(true) // dialog invoke the handler
    }
    else {
      if(event?.info.Theater){
        handler(seatValue, seatNumber, row ,event.info.Theater, getNormalPrice() ); // no dialog
      }
    }
  };

  // Precompute the style
  const seatStyle = useMemo(() => {
    if (seatValue === 1) return { ...styles.seats, ...styles.seatBooked };
    if (seatValue === 2) return { ...styles.seats, ...styles.seatSelected };
    if (seatValue === 3) return { ...styles.seats, ...styles.seatBlocked };
    if (seatValue === 4) return { ...styles.seats, ...styles.seatDiscounted };
    if (seatValue === 5) return { ...styles.seats, ...styles.seatAccessible };
    return styles.seats;
  }, [seatValue]);



  const handleDiscountConfirm = () => {
     if(event?.info.Theater){

          handler(seatValue, seatNumber, row , event.info.Theater , SelectedDiscountInfo.price , SelectedDiscountInfo.priceInfo);

        setOpenDiscountDialog(false); 
     }
  };

  const handleDiscountCancel = () => {
    setOpenDiscountDialog(false); 
  };


  const handleAccessibleConfirm = () => {
    if(event?.info.Theater){
      handler(seatValue, seatNumber, row,event?.info.Theater, getNormalPrice());
      setOpenAccessibleDialog(false); 

    }
  };

  const handleAccessibleCancel = () => {
    setOpenAccessibleDialog(false); 
  };

  

  return (
    <>
      <button onClick={()=>  handleClick(seatValue)} style={seatStyle}>

          {(originalSeatType === 5 || seatValue === 5) && <MdAccessible   color={ theme.palette.common.black  }  />}
          {(originalSeatType === 4 || seatValue === 4) && <LuTicket  color={theme.palette.common.black } />}

      </button>

      {/* discount  Confirmation Dialog */}
      {/* accessible Confirmation Dialog */}


{  seatValue === 4 ? 
      <Dialog
           open={openDiscountDialog}
            onClose={handleDiscountCancel}
            sx={{direction:"rtl"}}
            >
        <DialogTitle>בחר הנחה </DialogTitle>
        <DialogContent>

        <SelectWrap 
             label={"בחר ההנחה"} 
             items={getDiscountsValues()??[]} 
             value={SelectedDiscountInfo.price} 
             changeHandler={(e,child)=> {

                const childElement = child as React.ReactElement<{children:ReactNode}>; // bootstrapping the component

                if(childElement.props.children){
                    setSelectedDiscountInfo(p=>({ price: e.target.value, priceInfo:childElement.props.children?.toString()??""}))
                  }
                  else{
                      throw new Error("Client Select discount element Err line 170 , ")
                  }
                }
                   }
                  
          
             helpText={""} 
             labelPosition={"top"}
             />

          <Typography>יש להציג קופון/ תעודה </Typography>
          <Typography>בעת ההגעה לאירוע </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDiscountCancel} color="primary">
            ביטול
          </Button>
          <Button disabled={!SelectedDiscountInfo.price}  onClick={handleDiscountConfirm} color="primary">
            אישור
          </Button>
        </DialogActions>
      </Dialog>
    
  : seatValue ===5 ?
      <Dialog
           open={openAccessibleDialog}
            onClose={handleAccessibleCancel}
            sx={{direction:"rtl"}}
            >
        <DialogTitle> מושב נגיש  </DialogTitle>
        <DialogTitle> בעת ההגעה לאולם יש להציג תעודה  </DialogTitle>
        <DialogContent>

        </DialogContent>
        <DialogActions>
          <Button onClick={handleAccessibleCancel} color="primary">
            ביטול
          </Button>
          <Button onClick={handleAccessibleConfirm} color="primary">
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

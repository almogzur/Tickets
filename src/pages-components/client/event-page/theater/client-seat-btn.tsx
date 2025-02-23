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
import { TheaterType } from "@/types/components-typs/admin/theater/admin-theater-types";
import SelectWrap, { SelectItemType } from "@/HOCs/select-wrap";

interface ToolTipButtonType {
  seatValue: number;
  seatnumber: number;
  row: string;
  hendler: (seatValue: number, seatnumber: number, row: string ,theater:TheaterType, price:string ,  priceInfo?:string ) => void;
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
  seatAccsesble: {},
};

const TooltipButton = ({ seatValue, seatnumber, row, hendler, event }: ToolTipButtonType) => {

  const [originalSeatType] = useState(seatValue);

  const theme = useTheme()

  const [openDiscounteDialog, setOpenopenDiscounteDialog] = useState(false);
  const [openAccsessableDialog, setOpenAccsessableDialog] = useState(false);

  const [SelectedDiscounteInfo ,setSelectedDiscounteInfo ] = useState<{ price:string,priceInfo:string}>({
      price:'',
      priceInfo:''
    })


  const getDiscountesTickets = ()=>{
         return event?.tickets?.filter((tikect)=> tikect.selectedType === 'discount').flat()
  }
  const getDiscountesValues= () : SelectItemType[] | undefined=>{
    const list =  getDiscountesTickets()?.map((discount)=>{
          return {value :discount.price , label:discount.priceInfo}
        })
        if(list){
          return list
        }
}

  const getNormailTicket = ()=>{
    return event?.tickets?.find((tikect)=> tikect.selectedType === 'normal' )
  }
  const getNoramlPrice = ()=>{
     return getNormailTicket()?.price ?? "" 
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
      if(event?.info.Theater){
        hendler(seatValue, seatnumber, row ,event.info.Theater, getNoramlPrice() ); // no dialog
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
     if(event?.info.Theater){

          hendler(seatValue, seatnumber, row , event.info.Theater , SelectedDiscounteInfo.price , SelectedDiscounteInfo.priceInfo);

        setOpenopenDiscounteDialog(false); 
     }
  };

  const handleDiscounteCancel = () => {
    setOpenopenDiscounteDialog(false); 
  };


  const handleAccsessableConfirm = () => {
    if(event?.info.Theater){
      hendler(seatValue, seatnumber, row,event?.info.Theater, getNoramlPrice());
      setOpenAccsessableDialog(false); 

    }
  };

  const handleAccsessableCancel = () => {
    setOpenAccsessableDialog(false); 
  };

  

  return (
    <>
      <button onClick={()=>  handleClick(seatValue)} style={seatStyle}>

          {(originalSeatType === 5 || seatValue === 5) && <MdAccessible   color={ theme.palette.common.black  }  />}
          {(originalSeatType === 4 || seatValue === 4) && <LuTicket  color={theme.palette.common.black } />}

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
             items={getDiscountesValues()??[]} 
             value={SelectedDiscounteInfo.price} 
             changeHndler={(e,child)=> {

                const childElement = child as React.ReactElement<{children:ReactNode}>; // bootsraping the component

                if(childElement.props.children){
                    setSelectedDiscounteInfo(p=>({ price: e.target.value, priceInfo:childElement.props.children?.toString()??""}))
                  }
                  else{
                      throw new Error("Client Select Discoune Elemnt Err line 170 , ")
                  }
                }
                   }
                  
          
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
          <Button disabled={!SelectedDiscounteInfo.price}  onClick={handleDiscounteConfirm} color="primary">
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

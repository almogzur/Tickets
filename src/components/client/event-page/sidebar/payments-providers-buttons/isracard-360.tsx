import { useState } from "react";
import { Dialog, DialogTitle, DialogContent, IconButton, CircularProgress, Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";
import { ClientSelectedSeatType, IsracardCreateOrderZVS, IsracardCartItemType } from "@/types/pages-types/client/client-event-type";
import { TheaterType } from "@/types/components-types/admin/theater/admin-theater-types";
import { useClientEvent } from "@/hooks/client/use-event";
import { rollBack } from "@/util/fn/frontend_api-fn";
import { grey } from "@mui/material/colors";


type IsracardBtnPropsType = {
  cart:IsracardCartItemType[]
  total:string
  eventId:string
  TheaterState:TheaterType
  eventName:string
  selectedSeats:ClientSelectedSeatType[]
}

const IsracardBtn = (props: IsracardBtnPropsType) => {

  const [open, setOpen] = useState(false);
  const [paymentLink, setPaymentLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { Event, isEventError, updateEventHook } = useClientEvent(props.eventId);
  

  const SaleLinkRequest = async (): Promise<string|undefined> => {

    const isValidData = IsracardCreateOrderZVS.safeParse(props);

    if (!isValidData.success) {
      alert(JSON.stringify(isValidData.error.issues));
      return
    }

    try {
      setLoading(true);
      const response = await axios.post("/api/client/providers/isracard/create-payment-link", props);
      console.log(response.data);
      setPaymentLink(response.data); // Set the payment link
      setOpen(true); // Open dialog after getting link
      return response.data
    } catch (err) {
      console.log(err, "err front");
      setOpen(false)
      return
    } finally {
      setLoading(false);
    }
  };
  const handleClose = async  ( e :React.SyntheticEvent<HTMLButtonElement> ) => {

    await rollBack(
      props.TheaterState,
      props.eventId,
      props.selectedSeats,
      props.cart
    );
    setOpen(false);
  }

  return (
    <>
       <Button variant="contained" color="primary" onClick={SaleLinkRequest}>
       ישראכאט
       </Button>

       <Dialog 
           open={open} 
           onClose={() => setOpen(false)}
           maxWidth="md" 
           fullWidth
           >
        
        <DialogTitle>
          <IconButton
              onClick={handleClose}
              sx={{ position: "absolute", right: 8, top: 8 ,background:grey[200]}}
          >
            <CloseIcon />

          </IconButton>

        </DialogTitle>

        <DialogContent 
            sx={{ 
              height: "80vh",
               display: "flex",
                justifyContent: "center",
                 alignItems: "center",
                  p: 0 
                  }}>
          {
          loading ? 
            <CircularProgress  color='primary' />
          : paymentLink ? 
            <iframe
              src={paymentLink}
              width="100%"
              height="100%"
              style={{ border: "none" }}
            />
            : 
            <p>שגיאה בדף תשלום </p>
          }
        </DialogContent>
        
      </Dialog>
    </>
  );
};

export default IsracardBtn;

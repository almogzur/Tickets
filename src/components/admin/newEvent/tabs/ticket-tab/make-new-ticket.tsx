import  {useState,useContext,useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, Divider, useTheme  } from '@mui/material';
import { RiDragMoveFill , } from "react-icons/ri";
import InputWrap from '@/components/admin/input';
import { FcFilm } from "react-icons/fc";
import WidthContext from '@/context/WidthContext';
import { FcCurrencyExchange } from "react-icons/fc";
import { IoMdAddCircle } from "react-icons/io";


import TabsTicketContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabsEventSchedulesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context';
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

export default function MakeNewTicket() {
  const [open, setOpen] = useState(false);

  const  {tickets,setTickets,updateTicket,updteTicketsArray} =useContext(TabsTicketContext)
  const {schedule} =useContext(TabsEventSchedulesContext)
  const {infoFileds}=  useContext(TabsInfoContext)


  const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

       const TicketOptions = [
          {value:"normal",label:"מחיר מלא "},
          {value:"discount",label:"הנחה"},
          {value:"citizen",label:"תושב"}
        ]

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant='contained' color='secondary' onClick={handleClickOpen} sx={{p:!xs?0.5:null , fontSize:!xs?13:null ,borderRadius:0 }}  >
         כרטיס חדש 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}

         fullWidth
         
      >
        <DialogTitle style={{padding:12  }} >  
        
          <Flex direction={"row"} alignItems={"center"}>

                <Flex direction={"row"} alignContent={"center"} gap={2} >
                     <Flex direction={"row"} alignItems={"center"} gap={2} >
                      
                        <FcFilm size={!xs? "1.5em":"2em"} color={"black"}  style={{border:`solid ${theme.palette.secondary.main} ` , padding:1 }} />        
                        <Typography variant='h5' >  {"כרטיס חדש"} </Typography> 
                     </Flex>        
                </Flex>

         </Flex>

        </DialogTitle>

        <Divider sx={{borderWidth:2}} ></Divider>

        <DialogContent>

      
        
            <Flex   >
                <Flex direction={"row"} alignItems={"center"} gap={2} >
                    <Typography variant='h6' >פרטי כרטיס</Typography>
                  
                  </Flex>
                <Flex >
                    <InputWrap stateName={''} label={"סוגה המחיר"}  
                         isSelect 
                         selectItems={TicketOptions}
                         
                          />
                    <InputWrap stateName={''} inputType='number' label={'מחיר'}      />
                   {  <InputWrap stateName={''} label={'תיאור ההנחה'}/>}
                </Flex>
           </Flex>
      


        </DialogContent>


        <DialogActions  >
            <Flex direction={"row"} width={"100%"} justifyContent={"space-between"} gap={2} mx={1}  >
                <Button color='secondary' onClick={handleClose} sx={{borderRadius:0}} >צור</Button>
                <Button  sx={{bgcolor:"black",borderRadius:0}} onClick={handleClose} >בטל</Button>
          </Flex>
        </DialogActions>
      </Dialog>
    </>
  );
}
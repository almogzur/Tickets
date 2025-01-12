//Recte
import  {useState,useContext, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor, useEffect, ChangeEvent, SyntheticEvent, ReactNode} from 'react';

// Components 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, useTheme, Chip, } from '@mui/material';
import InputWrap from '@/components/gen/input-wrap';

//Icons
import { FcBusinessman, FcPlanner, FcViewDetails } from "react-icons/fc";
import { IoLocationSharp } from 'react-icons/io5';
import { IoTicket } from "react-icons/io5";

//Context Usege
import WidthContext from '@/context/WidthContext';
import TabsTicketContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

// Types 

//Colors
import {  red } from '@mui/material/colors';
import { DateTimeValidationError } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import SelectWrap from '@/components/gen/select-wrap';
import DateTimePickerWrap from '@/components/gen/time-date/date-time-picker-wrap';
import { SafeParseError, SafeParseSuccess, ZodError } from 'zod';
import { IoMdAddCircle } from 'react-icons/io';
import { TicketStateType, TicketType, TicketValidationSchema } from '@/components/admin/newEvent/types/new-event-types';


interface TicketOptionType {
   value: "normal" | "discount" | "citizen" | "approachable" | "";
   label: string;
}
interface MakeNewTicketType {
  setTabValue:Dispatch<SetStateAction<number>>

}

export default function MakeNewTicket({setTabValue}:MakeNewTicketType) {
  
  const theme = useTheme()
  const [open, setOpen] = useState(false);
  const {tickets ,setTickets} =useContext(TabsTicketContext)
  const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const [formErrors,setFormErrors ]= useState(false)

  const [Ticket, setTicket] = useState<TicketStateType>({
      EndSealesDate :null  ,
      selectedType:'',
      priceInfo:"",
      price:"", 
  }) 

  const generateTickitOptions = (tickets: TicketStateType[]): TicketOptionType[] => {

  const TicketOptions: TicketOptionType[] = [
    { value: "normal", label: "מחיר מלא" },
    { value: "citizen", label: "תושב" },
    { value: "discount", label: "הנחה" },
    { value: "approachable", label: "נגיש" }
  ];

  if (tickets.length) {
    // Filter TicketOptions to remove selected options except for "discount"
    return TicketOptions.filter(option => 
      option.value === "discount" || !tickets.some(ticket => ticket.selectedType === option.value)
    );
  } else {
    // If no tickets, return all TicketOptions
    return TicketOptions;
  }
  };
  const resetTicketPricesForm =( ):void=>{
      setTicket(p=>({
           EndSealesDate :null  ,
           selectedType:"",
           priceInfo:"",
           price:"", 
          }))
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
   // resetTicketPricesForm()
  };
  const addTicket = (e:React.MouseEvent<HTMLButtonElement>):void=>{
    const newTicket =   validateFileds(Ticket).data ?    validateFileds(Ticket).data: undefined
    setTickets(p=>( newTicket? [...p,newTicket]:[...p]))
    resetTicketPricesForm()
    handleClose()
  }
  const validateFileds = ( State: TicketStateType ) : { result:boolean,data:TicketType|undefined , errors: ZodError<TicketType> | undefined }=>{
    const result =  TicketValidationSchema.safeParse(State)
        return {result:result.success , data:result.data  , errors:result.error}

  }

 // useEffect(()=>{    console.log(Ticket ,infoFileds)},[Ticket,infoFileds])

  return (
    <>
      <Button 
         variant='contained' 
         color='primary' 
         onClick={handleClickOpen}
         endIcon={<IoMdAddCircle  style={{paddingRight:10}}/>} 
         sx={{ fontSize:!xs?13:null ,borderRadius:0 }}  
         >
         כרטיס חדש 
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={!xs}
       >
     
        <DialogTitle style={{padding:2   , background:"black"}} >  
        

          <Flex  direction={"row"} alignItems={"center"} gap={2} mx={1} p={2} >
             <IoTicket  size={!sm?"1.5em":"1.7em"} color={theme.palette.primary.main}  />        
             <Typography variant='body1' sx={{color:"#fff" ,fontWeight:800}}  >{"כרטיס חדש"} </Typography> 
      
    

         </Flex>

        </DialogTitle>


        <DialogContent sx={{m:0, p:1}} >
          <Flex p={1} >
           <SelectWrap   
            label='סוג כרטיס'
              items={generateTickitOptions(tickets)}
              variant='outlined'
              labelPositioin='top'
              value={Ticket.selectedType}
              changeHndler={(e) => {
                setTicket(p => ({ ...p, selectedType: e.target.value }));
                e.target.value === "citizen" ? setTicket(p => ({ ...p, priceInfo: "הנחת תושב" }))
                  :
                  e.target.value === "normal" ? setTicket(p => ({ ...p, priceInfo: 'מחיר מלא' }))
                    :
                    e.target.value === "discount" ? setTicket(p => ({ ...p, priceInfo: '' }))
                      :
                      e.target.value === "approachable" ? setTicket(p => ({ ...p, priceInfo: "מושב נגיש" }))
                        : null;
              } } 
              helpText={''}                
                    />
           { Ticket.selectedType === 'normal' &&    
                      <>
              <InputWrap 
                label={'מחיר'}
                value={Ticket.price}
                labelPositioin={'top'}
                inputType='number'
                onChangeHndler={(e) => { setTicket(p => ({ ...p, price: e.target.value })); } }
                variant='outlined' helpText={''}
                       />
                      </>
                    }
           { Ticket.selectedType==="discount" &&  
                <>
            <InputWrap 
                inputType='number'
                label={'מחיר הנחה'}
                labelPositioin={'top'}
                icon={<FcBusinessman />}
                value={Ticket.price}
                onChangeHndler={(e) => { setTicket(p => ({ ...p, price: e.target.value })); } }
                variant='outlined' helpText={''}
               />
            <InputWrap
                icon={<FcBusinessman />}
                value={Ticket.priceInfo}
                label={'תיאור ההנחה'}
                variant='outlined'
                labelPositioin={'top'}
                onChangeHndler={(e) => { setTicket(p => ({ ...p, priceInfo: e.target.value })); } } 
                helpText={''}
                />
              </>
                    }
          { Ticket.selectedType==="citizen" && 
            <InputWrap 
              stateName={''}
              value={Ticket.price}
              label={'מחיר תתושב'}
              inputType='number'
              labelPositioin={'top'}
              onChangeHndler={(e) => { setTicket(p => ({ ...p, price: e.target.value })); } }
              variant='outlined' helpText={''}
            />   
         }
         { Ticket.selectedType==='approachable' && 
                
             <InputWrap 
              stateName={''}
              value={Ticket.price}
              label={'* מחיר'}
              inputType='number'
              labelPositioin={'top'}
              onChangeHndler={(e) => { setTicket(p => ({ ...p, price: e.target.value })); } }
              variant='outlined'
              helpText={''}
                          />
                    }

            <DateTimePickerWrap    
               value={ Ticket.EndSealesDate}
               minDate={new Date()}
               maxTIme={dayjs(infoFileds.Date).toDate()}
               variant='outlined'
               label={"סגירת מכירות לכרטיס זה"}
               helpText={""}
               onAcceptHendler={(e) => e !== null ?
                setTicket(p => ({ ...p, EndSealesDate: e.toDate() }))
                :
               null
                }
               labelPositioin={'top'}
               onEroorHndler={(e: DateTimeValidationError, context: dayjs.Dayjs | null): void => { } }
                />
          </Flex>
        </DialogContent>


        <DialogActions  >
            <Flex direction={"row"} width={"100%"} justifyContent={"space-between"} gap={2} mx={1}  >

             <Button  
                 disabled={!validateFileds(Ticket).result} 
                 onClick={addTicket}
                 sx={{borderRadius:0}}
               >צור</Button>
                <Button  sx={{bgcolor:"black",borderRadius:0}} onClick={handleClose}>בטל</Button>
          </Flex>
        </DialogActions>
 
      </Dialog>
    </>
  );
}



  

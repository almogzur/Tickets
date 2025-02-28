//Recte
import  {useState,useContext, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor, useEffect, ChangeEvent, SyntheticEvent, ReactNode} from 'react';

// Components 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, useTheme, Chip, } from '@mui/material';

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

import {  ZodError } from 'zod';
import { IoMdAddCircle } from 'react-icons/io';
import {  TicketType, TicketZVS } from '@/types/pages-types/admin/admin-event-types';
import InputWrap from '@/HOCs/TeextFiledWrpa/input-wrap';
import SelectWrap from '@/HOCs/select-wrap';
import { NormalSwitchWrap } from '@/HOCs/ios-switch-wrap';
import DatePickerWrap from '@/HOCs/time-date/date-picker-wrap';
import TimePickerWrap from '@/HOCs/time-date/time-picker-wrap';




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
  const [isClosingDate,setIsClosingDate]=useState(false)
  const [formErrors,setFormErrors ]= useState(false)

  const [Ticket, setTicket] = useState<TicketType>({
      EndSealesHour:"",
      EndSealesDate :''  ,
      selectedType:'',
      priceInfo:"",
      price:"", 
  }) 

  const generateTickitOptions = (tickets: TicketType[]): TicketOptionType[] => {

  const TicketOptions: TicketOptionType[] = [
    { value: "normal", label: "רגיל" },
    { value: "discount", label: " הנחה " },
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
          EndSealesHour:null,
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
    setIsClosingDate(false)
   // resetTicketPricesForm()
  };
  const addTicket = (e:React.MouseEvent<HTMLButtonElement>):void=>{
    const newTicket =   validateFileds(Ticket).data ?    validateFileds(Ticket).data: undefined
    setTickets(p=>( newTicket? [...p,newTicket]:[...p]))
    resetTicketPricesForm()
    handleClose()
  }
  const validateFileds = ( State: TicketType ) : { result:boolean,data:TicketType|undefined , errors: ZodError<TicketType> | undefined }=>{
    const result =  TicketZVS.safeParse(State)
        return {result:result.success , data:result.data  , errors:result.error}

  }

 // useEffect(()=>{    console.log(Ticket ,infoFileds)},[Ticket,infoFileds])


 const
     HaderWrapper = Flex,
     HaderA = Flex, 
     HaderB = Flex



  return (
    <>
       <Button variant='outlined'>
      <IoMdAddCircle  size={"2.5em"} color={theme.palette.primary.main}  style={{paddingRight:0}}  onClick={handleClickOpen}  />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullWidth
        fullScreen={!xs}
       >
     
        <DialogTitle style={{ padding:4, background:"black"}}  >  
        

          <HaderWrapper  direction={"row"} alignItems={"center"}   width={"100%"} mx={-1}>
            
             <HaderA  alignItems={"center"}  sx={{scale:!sm?0.9:1}} >
              <IoTicket  size={!sm?"1.5em":"1.7em"} color={theme.palette.primary.main}  />        
              <Typography variant='body1' sx={{color:"#fff" ,fontWeight:800}} textAlign={"center"}  >{"כרטיס חדש"} </Typography> 
             </HaderA>

             <HaderB   direction={"row"} justifyContent={"end"} width={"inherit"}  >
               <NormalSwitchWrap 
                 switchValue={isClosingDate}
                 switchOnChangeHendler={(e) => setIsClosingDate(!isClosingDate)  }
                 switchSize='large'
                 title={'תאריך סגירת מכירות ?'} 
                 labelPlacement='bottom'
                   />
             </HaderB>

         </HaderWrapper>
 
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
                setTicket(p => ({ ...p, selectedType: e.target.value  as TicketType['selectedType'] }));
                e.target.value === "citizen" ? setTicket(p => ({ ...p, priceInfo: "הנחת תושב" }))
                  :
                  e.target.value === "normal" ? setTicket(p => ({ ...p, priceInfo: 'מחיר' }))
                    :
                    e.target.value === "discount" ? setTicket(p => ({ ...p, priceInfo: '' }))
                      :
                   null;
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
                label={'מחיר ההנחה'}
                labelPositioin={'top'}
                icon={<FcBusinessman />}
                value={Ticket.price}
                onChangeHndler={(e) => { setTicket(p => ({ ...p, price: e.target.value })); } }
                variant='outlined' helpText={''}
               />
            <InputWrap
                icon={<FcBusinessman />}
                value={Ticket.priceInfo}
                label={'תיאור'}
                variant='outlined'
                labelPositioin={'top'}
                onChangeHndler={(e) => { setTicket(p => ({ ...p, priceInfo: e.target.value })); } } 
                helpText={''}
                />
              </>
                    }

          {  isClosingDate && 
          <>
            <DatePickerWrap    
              value={Ticket.EndSealesDate}
              minDate={new Date()}
              variant='outlined'
              label={"בחר תאריך"}
              helpText={""}
         
              labelPositioin={'top'}
              onEroorHndler={() => { } } 
              onChangeHendler={ (e)=>{ e !== null ?
                setTicket(p => ({ ...p, EndSealesDate: e.toDate().toLocaleDateString() }))
                :null
              }} 
              />
              <TimePickerWrap 
                  label={'בחר שעה'} 
                  value={Ticket.EndSealesHour}
                   onEroorHndler={()=>{}}
                   labelPositioin={'top'}
                   onChangeHendler={ (e)=>{ e !== null ?
                    setTicket(p => ({ ...p, EndSealesHour: e.toDate().toLocaleDateString() }))
                    :null
                  }} 
                    />
              </>
            }


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



  

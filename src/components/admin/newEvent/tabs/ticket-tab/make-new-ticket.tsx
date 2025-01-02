//Recte
import  {useState,useContext, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor, useEffect, ChangeEvent, SyntheticEvent} from 'react';

// Components 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, Divider, useTheme, Chip, Select, MenuItem, FormControl, InputLabel, SelectChangeEvent, } from '@mui/material';
import InputWrap from '@/components/input-wrap';

//Icons
import { FcBusinessman, FcFilm, FcLeave, FcPlanner, FcViewDetails } from "react-icons/fc";
import { MdDiscount } from "react-icons/md";
import { IoLocationSharp } from 'react-icons/io5';
import { IoTicket } from "react-icons/io5";

//Context Usege
import WidthContext from '@/context/WidthContext';
import TabsTicketContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

// Types 
import {  BaceTicketVS, BaceTIcketStateType, BaceTicketType, } from '@/pages/admin/new-event'
import {FullDateOptions} from '@/pages/_app'

//Colors
import {  red } from '@mui/material/colors';
import { DateTimeValidationError } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import SelectWrap from '@/components/select-wrap';
import DateTimePickerWrap from '@/components/date-time-wrap';
import { ppid } from 'process';
import { SafeParseError, SafeParseSuccess, ZodError } from 'zod';
import { IoMdAddCircle } from 'react-icons/io';




interface TicketOptionType {
  value: "normal" | "discount" | "citizen";
  label: string;
}

interface MakeNewTicketType {
  setTabPage:Dispatch<SetStateAction<number>>

}

export default function MakeNewTicket({setTabPage }:MakeNewTicketType) {
  
  const [open, setOpen] = useState(false);
  const  {tickets ,setTickets} =useContext(TabsTicketContext)
 const {infoFileds,setInfoFileds} = useContext(TabsInfoContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()
  const [formErrors,setFormErrors ]= useState(false)

  const [Ticket, setTicket] = useState<BaceTIcketStateType >({
    // Bace
      eventName :  infoFileds.eventName,
      location:infoFileds.location,
      Date: infoFileds.Date,
      cat:infoFileds.cat,
      EndSealesDate :new Date()  ,
      selectedType:undefined,
      priceInfo:"",
      price:"", 
 }) 


 const TicketOptions: TicketOptionType[] = [
        { value: "normal", label: "מחיר מלא" },
        { value: "citizen", label: "תושב" },
        { value: "discount", label: "הנחה" },
  ];

 // useEffect(()=>{    console.log(Ticket ,infoFileds)},[Ticket,infoFileds])

  const resetTicketPricesForm =( ):void=>{
      setTicket(p=>({
           ...p,
           EndSealesDate :new Date()  ,
           selectedType:undefined,
           priceInfo:"",
           price:"", 
          }))
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
    resetTicketPricesForm()
  };

  const addTicket = (e:React.MouseEvent<HTMLButtonElement>):void=>{
    const newTicket =   validateFileds(Ticket).data ?    validateFileds(Ticket).data: undefined
    setTickets(p=>( newTicket? [...p,newTicket]:[...p]))
    resetTicketPricesForm()
    handleClose()
  }


  const validateFileds = (State: BaceTIcketStateType) : {result:boolean,data:BaceTicketType|undefined , errors:ZodError<BaceTicketType>|undefined}=>{
           const result =  BaceTicketVS.safeParse(State)

                console.log(result);

   return {result :result.success , data:result.data  , errors:result.error}

  }

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

      >
     
        <DialogTitle style={{padding:2   , background:"black"}} >  
        

          <Flex  direction={"row"} alignItems={"center"} gap={2} mx={1} p={2} >
             <IoTicket  size={!sm?"1.5em":"1.7em"} color={theme.palette.primary.main}  />        
             <Typography variant='body1' sx={{color:"#fff" ,fontWeight:800}}  >{"כרטיס חדש"} </Typography> 
      
    

         </Flex>

        </DialogTitle>


        <DialogContent sx={{m:0, p:1}} >
                <Flex >

                   <SelectWrap   
                           label='סוג כרטיס'
                          items={TicketOptions} 
                          changeHndler={(e)=>{
                            setTicket(p=>({...p,selectedType:e.target.value}))
                              e.target.value === "citizen"? setTicket(p=>({...p,priceInfo:"הנחת תושב"}))
                              :
                              e.target.value === "normal"? setTicket(p=>({...p,priceInfo:'מחיר מלא'}))
                              :
                              e.target.value === "discount"? setTicket(p=>({...p,priceInfo:''}))
                              :
                              null
                          }}  
                          labelPositioin='top'
                          value={Ticket.selectedType}
                           />

 
                   { Ticket.selectedType === 'normal' &&    
                      <>
                      <InputWrap 
                          label={'מחיר'}
                          value={Ticket.price}
                          labelPositioin={'top'}   
                          inputType='number'
                          onChangeHndler={(e) => {  setTicket(p=>({...p,price:e.target.value }))}}       
                       />
                      </>
                   }
                   { Ticket.selectedType==="discount" &&  
                       <>
                         <InputWrap 
                            inputType='number'
                            label={'מחיר הנחה'}
                            labelPositioin={'top'}
                            icon={<FcBusinessman/>}
                            value={Ticket.price}
                            onChangeHndler={(e) => {  setTicket(p=>({...p,price:e.target.value}))}}       

                        />    
                      <InputWrap
                          icon={<FcBusinessman/>}
                           value={Ticket.priceInfo}
                           label={'תיאור ההנחה'}
                           variant='standard' 
                           labelPositioin={'top'}

                           onChangeHndler={(e) => {  setTicket(p=>({...p,priceInfo:e.target.value}))}}       
                           />


                      </>
                   }
                   { Ticket.selectedType==="citizen" && 
                      <Flex  >
                         <InputWrap 
                             stateName={''}
                             value={Ticket.price}
                             label={'מחיר תתושב'}
                             inputType='number' 
                             labelPositioin={'top'}
                             onChangeHndler={(e) => {  setTicket(p=>({...p,price:e.target.value }))}}       
                          />



                      </Flex>
                    }

                    <DateTimePickerWrap    
                        value={ Ticket.EndSealesDate}
                        minDate={new Date()}
                        maxTIme={dayjs(Ticket.Date).toDate()}
                        variant='standard'
                        label={"סגירת מכירות לכרטיס זה"}
                        onAcceptHendler={(e) => e !== null ?
                         setTicket(p => ({ ...p, EndSealesDate: e.toDate() }))
                         :
                        null
                         }
                        labelPositioin={'top'}
                        onEroorHndler={(e: DateTimeValidationError, context: dayjs.Dayjs | null): void => { } }
                     />
     
                   <TicketChip 
                        text={ Ticket.eventName }  
                        placeholder="הוסף שם"
                        icon={<FcViewDetails/>} 
                         m={0.5}
                        setTabPage={   setTabPage }
                        newTab={0}

                           />
                    <TicketChip 
                        text={Ticket.location}
                        placeholder="הוסף מיקום  " 
                        setTabPage={ setTabPage }
                        newTab={0}
                        icon={<IoLocationSharp color="#1a8cdc"/>} 
                        m={0.5}
                      />  

                     <TicketChip
                       text={ Ticket.Date.toLocaleTimeString("he-IL",FullDateOptions)}
                       setTabPage={  setTabPage }
                       newTab={0}
                       placeholder='הוסף תאריך'
                         icon={<FcPlanner/>}
                         m={0.5}
                          grow={4}
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



interface TicketChipType {
    text:string|undefined
    placeholder:string
    newTab:number
    setTabPage:Dispatch<SetStateAction<number>>
    icon?:ReactElement<unknown, string | JSXElementConstructor<any>>,
    p?:CSSProperties['padding'] ,
    m?:CSSProperties['margin'],
    br?:CSSProperties['borderRadius'],
    styleProps?:CSSProperties,
    grow?:CSSProperties['flexGrow']
    w?:CSSProperties['width']
    v?:"filled"|"outlined"
    Scale?:number 
    

    
  }

  const TicketChip =  ({text, icon , p, m,br,styleProps , grow , w ,v,Scale,setTabPage,newTab,placeholder}:TicketChipType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        return  <Chip 
                     onClick={ !text? ()=>setTabPage(newTab) :undefined }
                     avatar={icon}
                     label={<Typography>text?text:placeholder</Typography>} 
                     sx={{
                        m:m?? 1, 
                        p:p?? 1, 
                        justifyContent:"start", 
                        borderRadius:br?? 0,
                        fontSize:!xs? 14: 16 ,
                        '& .MuiChip-label': {},
                        '& .MuiChip-avatar':{ scale:Scale?? 1.3 } ,
                        bgcolor: !text ? red[50] : "#fff",
                        width: w? w:  !sm? "100%":null
                      }}
                      variant= {v? v: 'filled'  }
                      style={{...styleProps}}
                        />
  }





  

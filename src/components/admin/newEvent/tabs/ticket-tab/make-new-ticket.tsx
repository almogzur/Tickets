//Recte
import  {useState,useContext, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor, useEffect, ChangeEvent} from 'react';

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
import { BaceTIcketType, InfoFormType, BaceTicketVS, BaceTIcketType_Partial } from '@/pages/admin/new-event'
import {FullDateOptions} from '@/pages/_app'

//Colors
import { grey, red } from '@mui/material/colors';
import { DateTimePicker, DateTimeValidationError, MobileDateTimePicker } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import SelectWrap from '@/components/select-wrap';
import DateTimePickerWrap from '@/components/date-time-wrap';




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
  const [dateEroor,setDateEroor ]= useState(false)

  const [Ticket, setTicket] =useState<BaceTIcketType_Partial >({
    // Bace
     eventName :  infoFileds.eventName,
     location:infoFileds.location,
     Date: infoFileds.Date,
     EndSealesDate :undefined  ,
     cat:infoFileds.cat,
     selectedType:undefined,
      priceInfo:"",
      finelPrice:0, 
 }) 


 const TicketOptions: TicketOptionType[] = [
        { value: "normal", label: "מחיר מלא" },
        { value: "discount", label: "הנחה" },
        { value: "citizen", label: "תושב" },
  ];

  // useEffect(()=>{    console.log(Ticket ,infoFileds)},[Ticket,infoFileds])

  const resetTicketPricesForm =( ):void=>{
      setTicket(p=>({
           ...p,
            finelPrice:0,
            priceInfo:"",
            selectedType:undefined,
            TicketClosingSealesDate:undefined,
            
          }))
  }
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    
  
    setOpen(false);
  };
  const updateTicketEndOfSalesDate =(e: dayjs.Dayjs | null):void=>{

    if (e && e.year() && e.month() && e.date() && e.day()  && e.hour()&& e.minute() ) {
      // set the time in utc  -3 form area time , 
       const newDate = e.toDate()
       setTicket(p=>({...p,EndSealesDate:newDate}))
       setDateEroor(false)
          
      }
      else{
        //  error henler
        setDateEroor(true)
      }

    
  }
  const validateFileds =( State:BaceTIcketType_Partial) : boolean=>{

            const result =  BaceTicketVS.safeParse(State)
                console.log(result);
                

        
       
   return !result.success

  }

  return (
    <>
      <Button 
         variant='contained' 
         color='primary' 
         onClick={handleClickOpen}
         endIcon={<IoTicket  style={{marginRight:10}}/>} 
         sx={{ fontSize:!xs?13:null ,borderRadius:0}}  
         >
         כרטיס חדש 
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
         fullWidth
      >
     
        <DialogTitle style={{padding:2   , background:"black"}} >  
        
          <Flex direction={"row"} alignItems={"center"}  >
                     <Flex  alignItems={"center"} gap={0} mx={1} >
                      
                         <IoTicket  size={!sm?"1.5em":"1.7em"} color={theme.palette.primary.main}  />        
                         <Typography variant='body1' sx={{color:"#fff" ,fontWeight:800}}  >{"כרטיס חדש"} </Typography> 
                     </Flex>        
    

         </Flex>

        </DialogTitle>

        <Divider sx={{borderWidth:2}} ></Divider>

        <DialogContent >


            <Flex   >
                  <Typography variant='h6' style={{}} >פרטי כרטיס</Typography>
                
                <Flex >

                   <SelectWrap   
                           label='סוג כרטיס'
                          items={TicketOptions} 
                          changeHndler={(e)=>{setTicket(p=>({...p,selectedType:e.target.value}))}}  
                          labelPositioin='top'
                           />

 
                   { Ticket.selectedType === 'normal' &&    
                      <>
                      <InputWrap 
       
                       
                          label={'מחיר'}
                          value={Ticket.priceInfo}
                          labelPositioin={'top'}   
                          onChangeHndler={(e) => { }}       
                                     />
                       <InputWrap
                         labelPositioin={'top'}                  
                          stateName={'priceInfo'}
                          label={'אופציונלי  תיאור'}
                          value={Ticket.priceInfo}
                          onChangeHndler={(e) => {
                            const value = e.target.value;
                            setTicket(p => ({...p}));
                           } }  
                                />
                      </>
                   }
                   { Ticket.selectedType==="discount" &&  
                       <>
                         <InputWrap 
                            stateName={''}
                            inputType='number'
                            label={'מחיר הנחה '}
                            value={Ticket.finelPrice}
                            labelPositioin={'top'}
                            icon={<FcBusinessman/>}
                            onChangeHndler={(e) => {

                                 const value = e.target.value;
                                 setTicket(p => ({
            
                                 }));

                            } } 
        
                        />    
                      <InputWrap
                        icon={<FcBusinessman/>}
                           stateName={''}
                           value={Ticket.priceInfo}
                           label={'תיאור ההנחה'}
                           variant='standard' 
                           labelPositioin={'top'}
                           onChangeHndler={(e) => {
                             const value = e.target.value;
                             setTicket(p => ({...p  }));
                           
                           } }
                               />


                      </>
                   }
                   { Ticket.selectedType==="citizen" && 
                      <Flex  >
                         <InputWrap 
                         
                             stateName={''}
                             value={Ticket.finelPrice}
                             label={'מחיר תתושב'}
                             inputType='number' 
                             labelPositioin={'top'}
                             onChangeHndler={(e) => {
                               const value = e.target.value;
                               setTicket(p => ({...p }));
                          }}
                          />


                       </Flex>
                   }

                    <DateTimePickerWrap    
                        value={ Ticket.EndSealesDate}
                        minDate={new Date()}
                        maxTIme={Ticket.Date}
                        variant='standard'
                        label={"סגירת מכירות לכרטיס זה"}
                        onAcceptHendler={updateTicketEndOfSalesDate}
                        orientation={'portrait'}
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
                       text={ Ticket.Date? Ticket.Date.toLocaleDateString("he-IL",FullDateOptions) : undefined}
                       setTabPage={  setTabPage }
                       newTab={0}
                       placeholder='הוסף תאריך'
                         icon={<FcPlanner/>}
                         m={0.5}
                          grow={4}
                          />



                       
                </Flex>

           </Flex>

 

        </DialogContent>


        <DialogActions  >
            <Flex direction={"row"} width={"100%"} justifyContent={"space-between"} gap={2} mx={1}  >

                <Button color='secondary' disabled={validateFileds(Ticket)}  onClick={handleClose} sx={{borderRadius:0}} >צור</Button>

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
                     label={text?text:placeholder} 
                     sx={{
                        m:m?? 2, 
                        p:p?? 2.5, 
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





  

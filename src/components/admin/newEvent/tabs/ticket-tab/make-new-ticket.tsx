import  {useState,useContext,useRef, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, Divider, useTheme, Chip, Switch, FormControlLabel  } from '@mui/material';
import { RiDragMoveFill , } from "react-icons/ri";
import InputWrap from '@/components/admin/input';
import { FcFilm, FcLeave, FcPlanner, FcViewDetails } from "react-icons/fc";
import WidthContext from '@/context/WidthContext';
import { MdDiscount } from "react-icons/md";




import TabsTicketContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabsEventSchedulesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context';
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';
import MyChip from '../../chip';
import { IoLocationSharp } from 'react-icons/io5';
import { FullDateOptions, Ticket } from '@/pages/_app';
import { TiKey } from 'react-icons/ti';
import { red } from '@mui/material/colors';
import Toggler from '../../toggler';

export default function MakeNewTicket({setTabPage}:{setTabPage:Dispatch<SetStateAction<number>>}) {
  const [open, setOpen] = useState(false);

  const  {tickets,updateTicket,updteTicketsArray} =useContext(TabsTicketContext)

  const {schedule} =useContext(TabsEventSchedulesContext)
  const {infoFileds}=  useContext(TabsInfoContext)
  

  const [Ticket, setTicket] =useState<Ticket>({
      evenName:infoFileds.keys.name,
      location:infoFileds.keys.location,
      eventDate:schedule.day ? schedule.day.toLocaleDateString("he-il",FullDateOptions):null ,
      price:null,
      type:null,
      discoundInfo:null,
      discountPrice:null,
      TickerclosingSealesDate:schedule.closingSealesDate ? schedule.closingSealesDate.toLocaleDateString("he-il",FullDateOptions):null ,
    }) // local no resone to extract to context level

    

  
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
    console.log(validateAllFileds(Ticket));

    setOpen(false);
  };

  const validateAllFileds =(State:Ticket) : boolean=>{

     return  true
  }

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

                       <InputWrap
                         stateName={'type'} 
                         label={"סוג הכרטיס"}  
                         isSelect 
                         selectItems={TicketOptions}
                         isRequired
                         variant='standard'
                         value={Ticket.type}
                         onChangeHndler={(e)=>{
                                  const key = e.target.name
                                  const value = e.target.value
                                  setTicket(p=>({...p,[key]:value}))
                         }}   
                             />

                      <InputWrap 
                            stateName={'price'} 
                            inputType='number'
                            label={'מחיר'} 
                            variant='standard'
                            value={Ticket.price}
                            onChangeHndler={(e)=>{
                              const key = e.target.name
                              const value = e.target.value
                              setTicket(p=>({...p,[key]:value}))

                            }}
                             />
                
            
                     { Ticket.type==="discount" &&  
                      <InputWrap
                         stateName={'discoundInfo'} 
                         value={Ticket.discoundInfo}
                         onChangeHndler={(e)=>{
                          const key = e.target.name
                          const value = e.target.value
                          setTicket(p=>({...p,[key]:value}))

                        }}
                         label={'תיאור ההנחה'} 
                          variant='standard'
                           icon={<MdDiscount size={"2em"} style={{margin:10, color:"red"}}  />} 
                            />
                           }


               
                   <MakeTicketFormChip 
                        text={ Ticket.evenName }  
                        placeholder="הוסף שם  "
                        icon={<FcViewDetails/>} 
                         m={0.5}
                        setTabPage={   setTabPage }
                        newTab={0}

                           />
                    <MakeTicketFormChip 
                        text={Ticket.location}
                        placeholder="הוסף מיקום  " 
                        setTabPage={ setTabPage }
                        newTab={0}
                        icon={<IoLocationSharp color="#1a8cdc"/>} 
                        m={0.5}
                      />  

                     <MakeTicketFormChip
                       text={ Ticket.eventDate}
                       setTabPage={  setTabPage }
                       newTab={3}
                       placeholder='  הוסף תאריך  '
                         icon={<FcPlanner/>}
                         m={0.5}
                          grow={4}
                          />

                  <MakeTicketFormChip
                       text={ Ticket.TickerclosingSealesDate}
                       setTabPage={  setTabPage }
                       newTab={3}
                       placeholder='    הוסף תאריך סגירת  קופות '
                         icon={<FcLeave/>}
                         m={0.5}
                          grow={4}
                          />

       
                          
                </Flex>
           </Flex>
           <FormControlLabel 
           sx={{}}
           slotProps={{typography:{variant:"button",}}}
              control={<Switch  defaultChecked />} label="Label" />
           <Toggler/>


        </DialogContent>


        <DialogActions  >
            <Flex direction={"row"} width={"100%"} justifyContent={"space-between"} gap={2} mx={1}  >

                <Button color='secondary' disabled={validateAllFileds(Ticket)}  onClick={handleClose} sx={{borderRadius:0}} >צור</Button>
                <Button  sx={{bgcolor:"black",borderRadius:0}} onClick={handleClose}>בטל</Button>
          </Flex>
        </DialogActions>
 
      </Dialog>
    </>
  );
}



interface MakeTIcketFormChipType {
    text:string,
    icon?:ReactElement<unknown, string | JSXElementConstructor<any>>,
    p?:CSSProperties['padding'] ,
    m?:CSSProperties['margin'],
    br?:CSSProperties['borderRadius'],
    styleProps?:CSSProperties,
    grow?:CSSProperties['flexGrow']
    w?:CSSProperties['width']
    v?:"filled"|"outlined"
    Scale?:number 
    setTabPage?:Dispatch<SetStateAction<number>>
    newTabNumber?:number
    newTab?:number
    placeholder?:string
    

    
  }

  const MakeTicketFormChip =  ({text, icon , p, m,br,styleProps , grow , w ,v,Scale,setTabPage,newTab,placeholder}:MakeTIkitFormChipType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        return  <Chip 
                     onClick={ !text ? ()=>setTabPage(newTab): null}
                     avatar={icon}
                     label={text??placeholder} 
                     sx={{
                        m:m?? 2, 
                        p:p?? 2.5, 
                        justifyContent:"start", 
                        borderRadius:br?? 0,
                        fontSize:!xs? 14: 16 ,
                        '& .MuiChip-label': {},
                        '& .MuiChip-avatar':{ scale:Scale?? 1.3 } ,
                        bgcolor: !text ? red[100] : "#fff",
                        width: w? w:  !sm? "100%":null
                      }}
                      variant= {v? v: 'filled'  }
                      style={{...styleProps}}
                        />
  }



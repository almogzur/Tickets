
//Reacg
import  {useState,useContext, Dispatch, SetStateAction, ReactElement, CSSProperties, JSXElementConstructor, useEffect} from 'react';

// Components 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Typography,Stack as Flex, Divider, useTheme, Chip, } from '@mui/material';
import InputWrap from '@/components/input';

//Icons
import { FcBusinessman, FcFilm, FcLeave, FcPlanner, FcViewDetails } from "react-icons/fc";
import { MdDiscount } from "react-icons/md";
import { IoLocationSharp } from 'react-icons/io5';

//Context Usege
import WidthContext from '@/context/WidthContext';
import TabsTicketContext from '@/context/admin/new-event/tabs/tabs-ticket-context';
import TabsEventSchedulesContext from '@/context/admin/new-event/tabs/tabs-event-schedules-context';
import TabsInfoContext from '@/context/admin/new-event/tabs/tabs-info-context';

// Types 
import { BaceTicket, FullDateOptions, Ticket } from '@/pages/_app';

//Colors
import { grey, red } from '@mui/material/colors';

export default function MakeNewTicket({setTabPage}:{setTabPage:Dispatch<SetStateAction<number>>}) {
  
  const [open, setOpen] = useState(false);
  const  {tickets,updateTicket,updteTicketsArray} =useContext(TabsTicketContext)
  const {schedule} =useContext(TabsEventSchedulesContext)
  const {infoFileds}=  useContext(TabsInfoContext)
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
  const theme = useTheme()


  interface TicketOptionType {
    value: "normal" | "discount" | "citizen";
    label: string;
  }
  
  const TicketOptions: TicketOptionType[] = [
    { value: "normal", label: "מחיר מלא" },
    { value: "discount", label: "הנחה" },
    { value: "citizen", label: "תושב" },
  ];

  const [Ticket, setTicket] =useState<Ticket>({
    // Bace
     evenName :infoFileds?.keys ? infoFileds?.keys.name: "",
     location:infoFileds.keys.location,
     eventDate:schedule.day ? schedule.day.toLocaleDateString("he-IL",FullDateOptions):"" ,
     TicketClosingSealesDate:schedule.closingSealesDate ? schedule.closingSealesDate.toLocaleDateString("he-il",FullDateOptions):"null" ,
     selectedType:"",
      priceInfo:"",
      finelPrice:"",
    // state 
      types:{
          normal:{price:"",info:""},
          discount:{price:"",info:""},
          citizen:{price:"",info:"הנחת תושב"}
        }
   
    }) // local no resone to extract to context level

    const resetTicketPricesForm =( ):void=>{
      setTicket(p=>({
           ...p,
            finelPrice:"",
            priceInfo:"",
            selectedType:"",
            
            types:{ 
              normal:{info:"",price:""},
              discount:{info:"", price:""},
              citizen:{price:"",info:'הנחת תושב'}
            }
          }))
    }

    // useEffect(()=>{
    //   console.log(Ticket);
      
    // }

    // ,[Ticket])

    
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    
    resetTicketPricesForm()
    setOpen(false);
  };
  const validateFileds =( State:Ticket) : boolean=>{

             const TicketTypeSnapShot =  State.selectedType

             const    { types  , ...rest }= State // removing 

  


              const Bace = rest
              const ValidateArr =  Object.entries(Bace).map(([key,value],i)=>{

                       return value !== null                  
            })
            console.log(ValidateArr)


       
   
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
     
        <DialogTitle style={{padding:12 , background:grey[200] }} >  
        
          <Flex direction={"row"} alignItems={"center"}  >

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
                  <Typography variant='h6' >פרטי כרטיס</Typography>
                
                <Flex >

                       <InputWrap
                         stateName={'type'} 
                         label={"סוג הכרטיס"}  
                         isSelect 
                         selectItems={TicketOptions}
                         value={Ticket.selectedType}
                         onChangeHndler={(e)=>{

                              const value = e.target.value
                                  
                                  setTicket(p=>({...p,selectedType:value}))
                         }}   
                             />
 
                   { Ticket.selectedType === 'normal' &&    
                      <>
                      <InputWrap 
                            stateName={''} 
                            inputType='number'
                            label={'מחיר'}  
                            value={Ticket.types.normal.price}
                            onChangeHndler={(e)=>{
               
                              const value = e.target.value
                              setTicket(p=>({
                                 ...p ,
                                types:{
                                  ...p.types,
                                   normal:{...p.types.normal , price:value}
                                }
                              }))

                            }}
                             />
                             <InputWrap
                               stateName={'priceInfo'}
                                label={'תיאור'}
                                helpText='אופציונלי'
                                value={Ticket.types.normal.info}
                                onChangeHndler={(e)=>{
                                      const value =e.target.value
                                      setTicket(p=>({
                                        ...p ,
                                        types:{
                                          ...p.types,
                                           normal:{...p.types.normal , info:value}
                                        }
                                        
                                      }))
                                }}
                                icon={<FcFilm size={"2em"}/>}
                                />
                      </>
                   }
                   { Ticket.selectedType==="discount" &&  
                       <>
                         <InputWrap 
                            stateName={''} 
                            inputType='number'
                            label={'מחיר הנחה '} 
                            value={Ticket.types.discount.price}
                            onChangeHndler={(e)=>{

                              const value = e.target.value
                              setTicket(p=>({
                                ...p,
                                types:{
                                  ...p.types,
                                   discount:{...p.types.discount, price:value}
                                }

                              }))

                            }}
                             />
                      <InputWrap
                         stateName={''} 
                         value={Ticket.types.discount.info}
                         onChangeHndler={(e)=>{
                          const value = e.target.value
                          setTicket(p=>({
                            ...p,
                            types:{
                              ...p.types,
                               discount:{...p.types.discount, info:value}
                            }

                          }))

                        }}
                         label={'תיאור ההנחה'} 
                          variant='standard'
                           icon={<MdDiscount size={"2em"} style={{margin:10, color:theme.palette.secondary.main}}  />} 
                            />
                

                      </>
                   }
                   { Ticket.selectedType==="citizen" && 
                      <Flex  >
                         <InputWrap 
                            stateName={''} 
                            value={Ticket.types.citizen.price}
                            onChangeHndler={(e)=>{
                              const value = e.target.value
                              setTicket(p=>({
                                ...p,
                                types:{
                                  ...p.types,
                                   citizen:{...p.types.citizen, price:value}
                                }
                              }))

                            }}
                            label={'מחיר תתושב'} 
                            inputType='number'

                              />


                         <InputWrap  isDisabled  stateName={''} label={'תיאור : הנחת תושב'} icon={<FcBusinessman size={"2.5em"} style={{margin:3}}  />} />
                       </Flex>
                   }



                   <MakeTicketFormChip 
                        text={ Ticket.evenName??"" }  
                        placeholder="הוסף שם  "
                        icon={<FcViewDetails/>} 
                         m={0.5}
                        setTabPage={   setTabPage }
                        newTab={0}

                           />
                    <MakeTicketFormChip 
                        text={Ticket.location??""}
                        placeholder="הוסף מיקום  " 
                        setTabPage={ setTabPage }
                        newTab={0}
                        icon={<IoLocationSharp color="#1a8cdc"/>} 
                        m={0.5}
                      />  

                     <MakeTicketFormChip
                       text={ Ticket.eventDate??""}
                       setTabPage={  setTabPage }
                       newTab={3}
                       placeholder='הוסף תאריך'
                         icon={<FcPlanner/>}
                         m={0.5}
                          grow={4}
                          />

                  <MakeTicketFormChip
                       text={ Ticket.TicketClosingSealesDate??""}
                       setTabPage={  setTabPage }
                       newTab={3}
                       placeholder="הוסף סגירת קופות"
                         icon={<FcLeave/>}
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

  const MakeTicketFormChip =  ({text, icon , p, m,br,styleProps , grow , w ,v,Scale,setTabPage,newTab,placeholder}:MakeTIcketFormChipType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
        return  <Chip 
                     onClick={ !text && setTabPage && newTab ? ()=>setTabPage(newTab) :undefined }
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





  

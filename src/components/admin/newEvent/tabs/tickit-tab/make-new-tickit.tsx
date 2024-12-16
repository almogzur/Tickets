import  {useState,useContext,useRef} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper, { PaperProps } from '@mui/material/Paper';
import Draggable from 'react-draggable';
import { Typography,Stack as Flex, Divider, useTheme  } from '@mui/material';
import { RiDragMoveFill , } from "react-icons/ri";
import InputWrap from '@/components/admin/input';
import { FcFilm } from "react-icons/fc";
import WidthContext from '@/context/WidthContext';


function PaperComponent(props: PaperProps) {
  const nodeRef = useRef<HTMLDivElement>(null);
  return (
    <Draggable
      nodeRef={nodeRef as React.RefObject<HTMLDivElement>}
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...props} ref={nodeRef} />
    </Draggable>
  );
}

export default function MakeNewTickit() {
  const [open, setOpen] = useState(false);
  const theme = useTheme()
       const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
        
      <Button variant='contained' color='secondary' onClick={handleClickOpen} >
        צור סוג כרטיס 
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
         id="draggable-dialog-title" 
         disableEscapeKeyDown
         fullWidth
         
      >
       {/* id must be provided for movment functinalty */}
        <DialogTitle style={{ cursor: 'move' , }} id="draggable-dialog-title"  >  
        
          <Flex direction={"row"}  style={{ cursor: 'move' }} alignItems={"center"} justifyContent={"space-between"} >

                <Flex direction={"row"} alignContent={"center"} gap={2} >
                     <Flex direction={"row"} alignItems={"center"} gap={2} >
                        <FcFilm size={!xs? "1.5em":"2em"} color={"black"}  style={{border:`solid ${theme.palette.secondary.main} ` ,  padding:4 }} />        
                        <Typography variant='h5' >  {"צור כרטיס חדש"} </Typography> 
                     </Flex>        
                </Flex>

            <RiDragMoveFill color='black' size={"1.5em"} />
         </Flex>

        </DialogTitle>

        <Divider sx={{borderWidth:2}} ></Divider>

        <DialogContent>

      
        
            <Flex   >
                <Flex direction={"row"} alignItems={"center"} gap={2} >
                    <Typography variant='h6' >פרטי כרטיס</Typography>
                  
                  </Flex>
                <Flex>
                    <InputWrap stateName={''} label={"קהל היעד"}  />
                    <InputWrap stateName={''} inputType='number' label={'מחיר'} />
                    <InputWrap stateName={''} label={'תיאור'}/>
                </Flex>
           </Flex>
      


        </DialogContent>


        <DialogActions  >
            <Flex direction={"row"} width={"100%"} justifyContent={"space-between"} gap={2} mx={1}  >
                <Button color='secondary' onClick={handleClose}>צור</Button>
                <Button  sx={{bgcolor:"black"}} onClick={handleClose} >בטל</Button>
          </Flex>
        </DialogActions>
      </Dialog>
    </>
  );
}
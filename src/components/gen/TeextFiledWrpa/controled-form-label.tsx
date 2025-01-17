import WidthContext from "@/context/WidthContext"
import { Typography, useFormControl ,useTheme} from "@mui/material"
import { CSSProperties, useContext } from "react"

interface ControledLabelType {
    labelPositioin:"top"|"end"
    label:string
    isLabelBold?:boolean
    labelTextcolor?:CSSProperties['color']


}
 const ControledLabel =({labelPositioin,label ,isLabelBold  ,labelTextcolor}:ControledLabelType)=>{
    const theme = useTheme()
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    const { focused , filled, variant, required ,error,color, ...rest } = useFormControl() || {};
  //  console.log(rest);
    
          const  fullWidth= 1000
    
      return   (
      <Typography   
           sx={
            focused?
                [ {   
                 width:labelPositioin==="end"? fullWidth*0.11 : fullWidth,
                 color:error? "red" : color?theme.palette[`${color}`].main : null,

                 fontWeight: isLabelBold? "bold": null,

                  },
                 variant==="outlined"&&
                  {
                   position:"relative",
                   top:!sm ?3:3, 
                   p:1
                 },
                 {
                  color:error? "red": color? theme.palette[`${color}`].main  :undefined,    
                 }
                ]
                 :
            filled ?
                 [
                 {
                  width:labelPositioin==="end"? fullWidth*0.11 : fullWidth,
                  color:error? "red":undefined,
                  fontWeight: isLabelBold? "bold": null,

                 },
                 variant==="outlined"&&
                 {
                  position:"relative",
                   top: !sm ? 3 : 3, 
                  p:1
                }
               ,{
              
                fontSize:!sm? 14:18,
              }
                ]      
                :
                {
                 width:fullWidth,
                 fontWeight: isLabelBold? "bold": null,
                 fontSize:!sm? 14:18,
                 position:"relative",
                 opacity:1,
                 color:labelTextcolor?? null
                 
                 }
                }
            >
        {label}
        </Typography>)
    


}

export default ControledLabel


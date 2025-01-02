import WidthContext from "@/context/WidthContext"
import { Typography, useFormControl ,useTheme} from "@mui/material"
import { CSSProperties, useContext } from "react"

interface ControledLabelType {
    labelPositioin:"top"|"end"
    label:string
    themeColor?:CSSProperties['color']


}
 const ControledLabel =({labelPositioin,label }:ControledLabelType)=>{
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
                 color:error? "red" : color?theme.palette[`${color}`].main : null
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
                 },
                 variant==="outlined"&&
                 {
                  position:"relative",
                   top: !sm ? 3 : 3, 
                  p:1
                }
               ,{
                opacity:0.7,
                fontSize:18
                }
                ]      
                :
                {
                 width:fullWidth,
                 opacity:0.6,
                 fontSize:18,
                 position:"relative",
                
                 }
                }
            >
        {label}
        </Typography>)
    


}

export default ControledLabel


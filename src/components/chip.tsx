import WidthContext from "@/context/WidthContext"
import { Chip,useTheme } from "@mui/material"
import { grey, purple } from "@mui/material/colors";
import { CSSProperties, Dispatch, JSXElementConstructor, ReactElement,SetStateAction,useContext} from "react";

interface MyChipType {
    text:string
    icon?:ReactElement<unknown, string | JSXElementConstructor<any>>,
    p?:CSSProperties['padding'] ,
    m?:CSSProperties['margin'],
    br?:CSSProperties['borderRadius'],
    styleProps?:CSSProperties,
    grow?:CSSProperties['flexGrow']
    w?:CSSProperties['width']
    v?:"filled"|"outlined"
    Scale?:number 
    setTabPage?:Dispatch<SetStateAction<number>>|void
    newTabNumber?:number
    newTab?:number
    placeholder?:string
    

    
  }

  const MyChip = ({text, icon , p, m,br,styleProps , grow , w ,v,Scale,placeholder}:MyChipType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)
    const theme = useTheme()
        return  <Chip 
 
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
                        bgcolor:grey[200],
                        width: w? w:  !sm? "100%":null
                      }}
                      variant= {v? v: 'filled'  }
                      style={{...styleProps}}
                        />
  }

  export default MyChip


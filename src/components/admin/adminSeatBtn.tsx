import {  CSSProperties, useContext } from 'react'

import {Colors} from '@/lib/colors'

import { useTheme } from '@mui/material';
import { green } from '@mui/material/colors';
import {TipinfoType} from '../../pages/_app'
import TipContext from '@/context/Tip-context';


/*
INDEX !!!!!
0:init : blue
1:taaken : red
2:selected :porpole
3:block : black
4:Discount : green[800]

*/

interface AdminSeatBtnProps {
    seatValue:number,
    seatnumber:number,
    row:string,

}


const AdminSeatBtn = ({ seatValue, seatnumber, row }:AdminSeatBtnProps) => {

    const { tipX, tipY, seatTipInfo, setTipY ,setTipX, setSeatTipInfo ,resetTip }=useContext(TipContext)

const theme = useTheme()


    const styles :Record<string,CSSProperties> =  {
        seats: {
            
          backgroundColor: theme.palette.primary.main,
          height:"4px",
          width:"4px",
          color:"black",
          margin:2 ,
          fontWeight:"bold",
          

          
        },
        seatBooked: {backgroundColor: "brown",cursor: "not-allowed"},
        seatSelected: {backgroundColor: theme.palette.secondary.main,},
        seatBlocked: {backgroundColor:"black"},
        seatDiscounted:{backgroundColor:green[800]},
       
      
 };  

    const tiphndler = (xArg: number,yArg: number ,initValueArg:number, rowArg:string, seatNumberArg:number  )=>{

        resetTip()   
        // retriger the animation 
        
        setTimeout(()=>{
              
              setTipX(xArg)
              setTipY(yArg)
              setSeatTipInfo( {initValue:initValueArg,row:rowArg,seatNumber:seatNumberArg})
        },200)
      

    }
      
  return (

     <div

       onClick={(e)=> { 
            tiphndler(e.nativeEvent.pageX,e.nativeEvent.pageY , seatValue , row ,seatnumber  ) 

          //   console.log( 
              
          //     "x",e.clientX,
          //     "x",e.pageX,
          //     "Ex",e.nativeEvent.pageX,
          //     "enpx",e.nativeEvent.pageX,
          //     "enlx",e.nativeEvent.layerX,

          //      "ecy",e.clientY,
          //     "epy",e.pageY,
          //     "enly",e.nativeEvent.layerY,
          //    "eny",e.nativeEvent.y, 
          //     "enpy",e.nativeEvent.pageY,
          //    "ency",e.nativeEvent.clientY
          //     );
       }}

       style={ 
        
        seatValue === 1 ? { ...styles.seats, ...styles.seatBooked }
        :
        seatValue === 2? { ...styles.seats, ...styles.seatSelected } 
        :
        seatValue === 3? { ...styles.seats, ...styles.seatBlocked } 
        :
        seatValue === 4? { ...styles.seats, ...styles.seatDiscounted } 
        :
         styles.seats 
        }
        
      >
        
    </div>
    


     
  );
};


export default AdminSeatBtn
  
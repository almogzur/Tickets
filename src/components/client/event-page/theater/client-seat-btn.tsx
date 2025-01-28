import {  CSSProperties, useContext } from 'react'


import ClientTipContext from '@/context/client/c-tip-context'
import { purple } from '@mui/material/colors';
const styles :Record<string,CSSProperties> =  {
  seats: {
    backgroundColor: "#fff",
    height:"7px",
    width:"7px",
    color:"black",
    margin:2 ,
    fontWeight:"bold",
    zIndex:22
    
  },
  seatSelected: {backgroundColor: purple[300]},
  seatBlocked: {color:"black"},
  seatBooked: {backgroundColor: "brown",cursor: "not-allowed"},
 

 };  
 interface ToolTipButtonType{ 
  seatValue:number
  seatnumber:number
  row:string
  hendler:any
  
 }


const TooltipButton = ({ seatValue, seatnumber, row ,hendler }:ToolTipButtonType) => {

  const {clientTipPosition, setClientTipPosition ,clinetTipInfo ,setClinetTipInfo, resetClinetTip }=useContext(ClientTipContext)


    const tiphndler = (xArg: number,yArg: number)=>{
      setClientTipPosition({x:xArg,y:yArg})
      
    }
       const textset = "מושב";
        const coat = 'מחיר רגיל'
        const citConst = 'מחיר תושב'
  return (

     <div
       onClick={(e)=> { 
            hendler(seatValue,seatnumber,row) ;
            tiphndler(e.nativeEvent.pageX,e.nativeEvent.pageY ) 
            setClinetTipInfo({row:row,initValue:seatValue,seatNumber:seatnumber} )
       }}

       style={ 
        seatValue ===1 ? { ...styles.seats, ...styles.seatBooked }
        :
        seatValue === 2? { ...styles.seats, ...styles.seatSelected } 
        :
         styles.seats 
        }
        
      >
      {}  
    </div>
    
  );
};


export default TooltipButton

        // click event X , Y 
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
  
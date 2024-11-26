
import { useState, useEffect, useContext, CSSProperties, MouseEvent, } from 'react'

const styles :Record<string,CSSProperties> =  {
  seats: {
    backgroundColor: "silver",
    height:"4px",
    width:"4px",
    color:"black",
    margin:2 ,
    fontWeight:"bold",

    zIndex:22
    
  },

  seatSelected: {backgroundColor: "rgb(53, 212, 6)",},
  seatBlocked: {color:"black"},
  seatBooked: {backgroundColor: "brown",cursor: "not-allowed"},
 

 };  


const TooltipButton = ({ initValue, seatnumber, row ,hendler , setTipY, setTipX  ,setTipTitel}) => {

    const tiohndler = (x: number,y: number)=>{
      
      setTipX(x)
      setTipY(y)
    }
       const textset = "מושב";
        const textrow = "שורה";
  return (

   <div
       onClick={(e)=> { 
            hendler(initValue,seatnumber,row) ;
            tiohndler(e.nativeEvent.pageX,e.nativeEvent.pageY ) 
            setTipTitel(`${  row.includes(textrow) ? "" : textrow}
             ${row} ${textset}:
             ${[seatnumber]}`
            )
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

       style={ initValue ===1 ? { ...styles.seats, ...styles.seatBooked }: initValue === 2? { ...styles.seats, ...styles.seatSelected } :  styles.seats }
      >
    </div>


     
  );
};


export default TooltipButton
  
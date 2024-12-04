import {  CSSProperties } from 'react'

import {Colors} from '@/lib/colors'

const styles :Record<string,CSSProperties> =  {
  seats: {
    backgroundColor: "#fff",
    height:"4px",
    width:"4px",
    color:"black",
    margin:2 ,
    fontWeight:"bold",
    zIndex:22
    
  },
  seatSelected: {backgroundColor: Colors.b,},
  seatBlocked: {color:"black"},
  seatBooked: {backgroundColor: "brown",cursor: "not-allowed"},
 

 };  

 interface ControlBtnProps {
    seatValue:number,
    seatnumber :number,
    row:string,
    hendler:Function,
    setTipY:Function,
    setTipX:Function,
    setTipTitel:Function,
    tiketCost?:String
    cizCost:number,
    
 }

const ControlBtn = ({ seatValue, seatnumber, row ,hendler , setTipY, setTipX  ,setTipTitel , tiketCost , cizCost }:ControlBtnProps) => {

    const tiphndler = (x: number,y: number)=>{
      
      setTipX(x)
      setTipY(y)
    }
       const textset = "מושב";
        const coat = 'מחיר רגיל'
        const citConst = 'מחיר תושב'
  return (

   <div
       onClick={(e)=> { 
            hendler(seatValue,seatnumber,row) ;
            tiphndler(e.nativeEvent.pageX,e.nativeEvent.pageY ) 
            setTipTitel(` ${row} -  ${textset} : ${[seatnumber+1]} ${coat}:${tiketCost} ${citConst}:${cizCost} `)

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
        seatValue ===1 ? { ...styles.seats, ...styles.seatBooked }
        :
        seatValue === 2? { ...styles.seats, ...styles.seatSelected } 
        :
         styles.seats 
        }
        
      >
        
    </div>


     
  );
};


export default ControlBtn
  
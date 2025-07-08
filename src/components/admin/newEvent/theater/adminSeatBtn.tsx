import {  CSSProperties, useContext, useEffect, useState } from 'react'

import { useTheme } from '@mui/material';
import { green, orange, pink, red } from '@mui/material/colors';
import SingleTipontext from '@/context/admin/new-event/map/single-tip-context'
import MultiSelectContext from '@/context/admin/new-event/map/multi-select-context';
import React from 'react';
import { Positions } from '@/types/components-types/admin/theater/admin-theater-types';


/*
INDEX !!!!!
0:init : blue
1:taaken : red
2:selected :porpole
3:block : black
4:accessible,
5:discounte

*/

interface AdminSeatBtnProps {
    seatValue:number
    seatnumber:number
    row:string
    isMultiSelect?:boolean
}


function TipAlingeSelfPositions (screenW:number,screenH:number,eventY:number,EentX:number  ):Positions{
        const tipWidth = 150 
        const tipHeight = 300
        
    return { x:0, y:0}
}

const AdminSeatBtn = ({ seatValue, seatnumber, row , isMultiSelect }:AdminSeatBtnProps) => {

     const {singleTipPositions , setSingleTipPositions, setSeatTipInfo  ,resetSingleTip }=useContext(SingleTipontext)
     const {multiTipPositions , setMutiTipPositions ,resetMultiTip  , multiTipInfo ,setMultiTipInfo ,resetErr }= useContext(MultiSelectContext)
     const theme = useTheme()
     const [errCliks,setErrClicks]= useState(0)



    const styles :Record<string,CSSProperties> =  {
        seats: {
          backgroundColor: theme.palette.primary.main,
          height:"7px",
          width:"7px",
          color:"black",
          margin:2 ,
          border:"none",
          padding:0,
          
        },
        seatPurchase:{background:red[900],cursor:'not-allowed'},
        seatBlocked: {backgroundColor:"black"},
        seatAccsesble:{backgroundColor:orange[600]},
 };  




 const openTip = (xArg: number,yArg: number ,initValueArg:number, rowArg:string, seatNumberArg:number  )=>{
  resetMultiTip()
  resetSingleTip()   
  // retriger the animation 

  
  setTimeout(()=>{
        
        setSingleTipPositions({x:xArg,y:yArg})
        setSeatTipInfo( {initValue:initValueArg,row:rowArg,seatNumber:seatNumberArg})
  },200)


}


 const multiSelectHndler = (seatNArg:number,rowArg:string, xArg: number, yArg: number)=>{

          if(  !multiTipInfo.row    ){
         
            setMutiTipPositions({x:xArg ,y:yArg})
            setMultiTipInfo((prev)=>({...prev,first:seatNArg, row:rowArg}))
          }
          else if( multiTipInfo.first !== undefined &&  rowArg === multiTipInfo.row && seatNArg !== multiTipInfo.first ){

            const SelectingFromRight = multiTipInfo.first > seatNArg 
            const SelectingFromLeft = multiTipInfo.first < seatNArg

              let total :number
              if( SelectingFromRight){
                //right to left 
                total = multiTipInfo.first - seatNArg +1
                setMultiTipInfo(p=>({...p,selectdir:"R"}))
     
               console.log("right");

               
              }else if(SelectingFromLeft){
                // left to right
                total = seatNArg - multiTipInfo.first  +1 
                setMultiTipInfo(p=>({...p,selectdir:"L"}))
                 console.log("left");
                
              }

            resetErr()
            setMultiTipInfo(p=>({...p,second:seatNArg, totalselected:total }))     

         
          }
          else{
            // err
        //  console.log("err");      
          // sets err
          setMultiTipInfo(p=>({...p,err:"נא לבחור מושב מאותה שורה"}))
           // reset secend for tip diveider and data integraty
          setMultiTipInfo(p=>({...p,second:0 , totalselected:0 }))     
          setErrClicks(p=>(p+1))
          errCliks === 2?  resetMultiTip() : null
     
    
          

         }


  

  

  //resetMultiTip() // for retregaring animation and fata inegraty

  setTimeout(()=>{},200)

    
 }

      
  return (

     <button
       onClick={(e)=> { 
         !isMultiSelect?
           openTip(e.nativeEvent.pageX,e.nativeEvent.pageY , seatValue , row ,seatnumber  ) 
           :
           multiSelectHndler(seatnumber, row , e.nativeEvent.pageX , e.nativeEvent.pageY   )
           console.log(
           "in H",  e.nativeEvent.view?.innerHeight,
            "in W", e.nativeEvent.view?.innerWidth ,
              "EY", e.nativeEvent.pageY ,
              "EX", e.nativeEvent.pageX ,
              e
             );
           
       }}

      style={ 
        seatValue === 3? { ...styles.seats, ...styles.seatBlocked } 
        :
        seatValue === 5? { ...styles.seats, ...styles.seatAccsesble } 
        :
         styles.seats 
        }
      />   
  );
};


export default AdminSeatBtn

    //Event posions 
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

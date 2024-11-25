
import { motion ,AnimatePresence } from "framer-motion"
import { useState, useEffect, useContext, CSSProperties, } from 'react'
import WidthContext from '../context/WidthContext';
import { useRouter } from 'next/router'
import MoviesContext from "../context/MoviesContext";





const TooltipButton = ({ initValue, seatnumber, row, title ,Style  ,i ,hendler }) => {


  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext);
  const [visible, setVisible] = useState(false);
  const show = (value: number) => { return value !==1  ?   setVisible(true) : null}
  const hide = () => setVisible(false);



  

  return (
     <button
      onClick={(e)=> {e.stopPropagation(); hendler(initValue,seatnumber,row)}}
      style={Style}

      // onMouseEnter={(e)=> {
      //   e.stopPropagation()
      //   e.preventDefault()
      //    show(initValue)
      // }}
      // onMouseLeave={ (e)=>{
      //   e.preventDefault()
      //   e.stopPropagation()
      //   hide()
      // }}
      // onTouchStart={(e)=>
      //  {
      //   e.stopPropagation()
      //   e.preventDefault()
      //   show(initValue)
      // }}
      // onTouchEnd={(e)=>{
      //   e.stopPropagation()
      //   e.preventDefault()
      //    hide() 
      // }}
      // 
      >

      <AnimatePresence>
        {visible  && (
          <motion.div
            style={{
              background: "#333",
              color: "white",
              padding: "5px 10px",
              borderRadius: "4px",
              fontSize: !xs ? 25 : !md ? 35 : !lg ? 40 : 45,
              display: "flex",
              zIndex: "9999",
              width:"fit-content"
              
            }}
            tabIndex={-1}
            initial={{ opacity: 0, y: -150 }}
            animate={{ opacity: 1, y:-230,   transition: { duration: 0.5 } }}
            exit={{ opacity: 0, transition: { duration: 0.5 } }}
          >
            {title}
          </motion.div>
        ) }
      </AnimatePresence>

    </button>
  );
};


export default TooltipButton
  
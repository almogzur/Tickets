import { FormControlLabel } from "@mui/material"
import { ChangeEvent, ReactNode, useState } from "react"
import { styled } from '@mui/material/styles';
import Switch, { switchClasses } from "@mui/material/Switch";


export interface  SwitchTextTrackStylePropsType {
     switchWrpaerSize?:  'medium'|'large'|undefined
}
export interface SwitchWrapType extends SwitchTextTrackStylePropsType {
    switchValue:boolean
    switchOnChangeHendler:(e:ChangeEvent<HTMLInputElement>)=>void
  }

  export const SwitchTextTrack = styled(Switch)<SwitchTextTrackStylePropsType>( 
    ( {switchWrpaerSize} ) => 
    {
      const sizes = {
        medium: {
          width: 64,
          height: 36,
          padding: 6,
          thumb: { width: 24, height: 24 },
          transform: "translateX(28px)",
        },
        large: {
          width: 85,
          height: 48,
          padding: 8,
          thumb: { width: 30, height: 30 },
          transform: "translateX(36px)",
        },
      };
  
      const { width, height, padding, thumb, transform } =  switchWrpaerSize ==='medium'? sizes.medium : sizes.large
  
    return {
      width,
      height,
      padding,
      [`& .${switchClasses.switchBase}`]: {
        padding: (height - thumb.height) / 2,
        color: "#ff6a00",
      },
      [`& .${switchClasses.thumb}`]: {
        width: thumb.width,
        height: thumb.height,
        backgroundColor: "#fff",
        boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.4)",
      },
      [`& .${switchClasses.track}`]: {
        width: "100%",
        height: "100%",
        background: "linear-gradient(to right, #ee0979, #ff6a00)",
        opacity: "1 !important",
        borderRadius: height / 2,
        position: "relative",
        transition: "background 0.3s",
        "&:before, &:after": {
          display: "inline-block",
          position: "absolute",
          top: "50%",
          transform: "translateY(-50%)",
          color: "#fff",
          textAlign: "center",
          fontSize: "0.85rem",
          fontWeight: 600,
        },
        "&:before": {
          content: '"לא"',
          left: switchWrpaerSize === 'medium'?  26 : 35, // Ensure the text doesn't touch the edge
          width: "40%", // Adjust width for proper centering
          opacity: 1,
        },
        "&:after": {
          content: '"כן"',
          right: switchWrpaerSize === 'medium'?  26 : 33, // Ensure the text doesn't touch the edge
          width: "40%", // Adjust width for proper centering
          opacity: 0,
        },
      },
      [`& .${switchClasses.checked}`]: {
        [`&.${switchClasses.switchBase}`]: {
          transform,
          color: "#185a9d",
          "&:hover": {
            backgroundColor: "rgba(24,90,157,0.1)",
          },
        },
        [`& .${switchClasses.thumb}`]: {
          backgroundColor: "#fff",
        },
        [`& + .${switchClasses.track}`]: {
          background: "linear-gradient(to right, #43cea2, #185a9d)",
          "&:before": {
            opacity: 0,
          },
          "&:after": {
            opacity: 1,
          },
        },
      },
    };
  });

  const SwitchWrap = ({switchValue,switchOnChangeHendler,switchWrpaerSize}:SwitchWrapType)=>{
      return <SwitchTextTrack
               value={switchValue}
               onChange={switchOnChangeHendler}  
               inputProps={{ 'aria-label': 'controlled', }}
               switchWrpaerSize={switchWrpaerSize?? "large"} // sise it taken
               />
    } 
    export default SwitchWrap
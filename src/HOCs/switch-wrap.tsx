import { FormControlLabel, Typography } from "@mui/material"
import { ChangeEvent, ReactNode, SyntheticEvent, useContext, useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Switch, { switchClasses } from "@mui/material/Switch";
import WidthContext from "@/context/WidthContext";


export interface  SwitchTextTrackStylePropsType {
     switchSize?:  'medium'|'large'|undefined
}
export interface SwitchWrapType extends SwitchTextTrackStylePropsType {
    value:boolean
    switchOnChangeHendler:(e:SyntheticEvent, checked: boolean)=>void  
  }

export interface NormalSwitchWrapPropsType extends SwitchTextTrackStylePropsType {
  switchValue:boolean|undefined
  switchOnChangeHendler:(e :React.SyntheticEvent, checked:boolean)=>void
  title:string
  labelPlacement:"bottom" | "top" | "end" | "start" 
}


  export const SwitchTextTrack = styled(Switch)<SwitchTextTrackStylePropsType>( 
    ( {switchSize} ) => 
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
  
      const { width, height, padding, thumb, transform } =  switchSize ==='medium'? sizes.medium : sizes.large
  
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
          left: switchSize === 'medium'?  26 : 35, // Ensure the text doesn't touch the edge
          width: "40%", // Adjust width for proper centering
          opacity: 1,
        },
        "&:after": {
          content: '"כן"',
          right: switchSize === 'medium'?  26 : 33, // Ensure the text doesn't touch the edge
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

  export const RSwitchTextTrack = styled(Switch)<SwitchTextTrackStylePropsType>(
    ({ switchSize }) => {
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
  
      const { width, height, padding, thumb, transform } =
      switchSize === 'medium' ? sizes.medium : sizes.large;
  
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
          background: "linear-gradient(to right, #43cea2, #185a9d)", // Green to Blue gradient for "כן"
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
            content: '"לא"', // No on the right
            left: switchSize === 'medium' ? 4 : 4, // Adjust left position for proper centering
            width: "40%", // Adjust width for proper centering
            opacity: 0, // Hide "כן" by default (off state)
          },
          "&:after": {
            content: '"כן"', // Yes on the left

            right: switchSize === 'medium' ? 2 : 4, // Adjust right position for proper centering
            width: "40%", // Adjust width for proper centering
            opacity: 1, // Show "לא" by default (off state)
          },
        },
        [`& .${switchClasses.checked}`]: {
          [`&.${switchClasses.switchBase}`]: {
            transform,
            color: "#185a9d", // Blue when switched on (for "כן")
            "&:hover": {
              backgroundColor: "rgba(24,90,157,0.1)",
            },
          },
          [`& .${switchClasses.thumb}`]: {
            backgroundColor: "#fff",
          },
          [`& + .${switchClasses.track}`]: {
            background: "linear-gradient(to right, #ee0979, #ff6a00)", // Red to Orange for "לא"
            "&:before": {
              opacity: 1, // Show "כן" when checked (on state)
            },
            "&:after": {
              opacity: 0, // Hide "לא" when checked (on state)
            },
          },
        },
      };
    }
  );

  const IOSSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
  ))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
      padding: 0,
      margin: 2,
      transitionDuration: '300ms',
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          backgroundColor: theme.palette.primary.main,
          opacity: 1,
          border: 0,
          ...theme.applyStyles('dark', {
            backgroundColor: theme.palette.primary.main,
          }),
        },
        '&.Mui-disabled + .MuiSwitch-track': {
          opacity: 0.5,
        },
      },
      '&.Mui-focusVisible .MuiSwitch-thumb': {
        color: '#33cf4d',
        border: '6px solid #fff',
      },
      '&.Mui-disabled .MuiSwitch-thumb': {
        color: theme.palette.grey[100],
        ...theme.applyStyles('dark', {
          color: theme.palette.grey[600],
        }),
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.7,
        ...theme.applyStyles('dark', {
          opacity: 0.3,
        }),
      },
    },
    '& .MuiSwitch-thumb': {
      boxSizing: 'border-box',
      width: 22,
      height: 22,
    },
    '& .MuiSwitch-track': {
      borderRadius: 26 / 2,
      backgroundColor: '#E9E9EA',
      opacity: 1,
      transition: theme.transitions.create(['background-color'], {
        duration: 500,
      }),
      ...theme.applyStyles('dark', {
        backgroundColor: '#39393D',
      }),
    },
  }));
  



 const SwitchWrap = ({value,switchOnChangeHendler,switchSize }:SwitchWrapType)=>{

        
        return <RSwitchTextTrack
               checked={value}
               onChange={switchOnChangeHendler}  
               inputProps={{ 'aria-label': 'controlled', }}
               switchSize={switchSize?? "large"} // sise it taken
               />
      

  } 

  export const NormalSwitchWrap = ({switchValue,switchOnChangeHendler,title, labelPlacement }:NormalSwitchWrapPropsType)=>{
    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    return (
      <FormControlLabel
          value={switchValue}
          onChange={switchOnChangeHendler}
          control={<IOSSwitch   />}
          label={<Typography sx={{color:"#ddd" , fontWeight:"bold"  ,textAlign:"center"}} >{title}</Typography>}
          labelPlacement={labelPlacement?? "end"}
          sx={{scale:!xs? 0.8:1,gap:1}}
          
        />
    )

  }





  export default SwitchWrap
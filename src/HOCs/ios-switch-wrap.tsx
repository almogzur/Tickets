import { Box, FormControlLabel, Typography } from "@mui/material"
import { ChangeEvent, CSSProperties, ReactNode, SyntheticEvent, useContext, useEffect, useState } from "react"
import { styled } from '@mui/material/styles';
import Switch from "@mui/material/Switch";
import WidthContext from "@/context/WidthContext";


export interface SwitchPropsType {
  switchSize?: 'medium' | 'large' | undefined
}
export interface SwitchWrapPropsType extends SwitchPropsType {
  value: boolean
  switchOnChangeHendler: (e: SyntheticEvent, checked: boolean) => void
}


const IOSSwitch = styled(Switch)(
  ({ theme }) => ({
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



export interface WithTextSwitchWrapPropsType extends SwitchPropsType {
  switchValue: boolean 
  switchOnChangeHendler: (e: React.SyntheticEvent, checked: boolean) => void
  title: string
  labelPlacement: "bottom" | "top" ,
  textColor?: CSSProperties['color'],
}


export const IosWithTextSwitchWrap = ({
  switchValue,
  switchOnChangeHendler,
  title,
  labelPlacement,
  textColor
}: WithTextSwitchWrapPropsType) => {
  const { xxl, xl, lg, md, sm, xs, xxs } = useContext(WidthContext)

  return (
  <Box   sx={{ scale: !xs ? 0.8 : 1, gap: 1 , m:1 }} >
   { labelPlacement === 'top' &&   <Typography sx={{ color: textColor ?? "#ddd", fontWeight: "bold", textAlign: "center" }} >{title}</Typography>}
       <IOSSwitch 
        checked={switchValue}
        onChange={switchOnChangeHendler}
        inputProps={{ 'aria-label': 'controlled', }}
        />
     { labelPlacement === 'bottom' &&  <Typography sx={{ color: textColor ?? "#ddd", fontWeight: "bold", textAlign: "center" }} >{title}</Typography>}   

 </Box>
  )

}





export default IosWithTextSwitchWrap
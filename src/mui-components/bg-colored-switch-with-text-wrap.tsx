


import Switch, { switchClasses } from "@mui/material/Switch";



import WidthContext from "@/context/WidthContext"
import {Box, Stack as Flex, styled, TextFieldVariants, Typography } from '@mui/material'
import { green, grey, red } from "@mui/material/colors"
import { ChangeEvent, Dispatch, ReactNode, SetStateAction, SyntheticEvent, useContext } from "react"
import { SwitchPropsType, SwitchWrapPropsType } from "./ios-switch-wrap";

export const RSwitchTextTrack = styled(Switch)<SwitchPropsType>(
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


  export const SwitchTextTrack = styled(Switch)<SwitchPropsType>(
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
  
      const { width, height, padding, thumb, transform } = switchSize === 'medium' ? sizes.medium : sizes.large
  
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
            left: switchSize === 'medium' ? 26 : 35, // Ensure the text doesn't touch the edge
            width: "40%", // Adjust width for proper centering
            opacity: 1,
          },
          "&:after": {
            content: '"כן"',
            right: switchSize === 'medium' ? 26 : 33, // Ensure the text doesn't touch the edge
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
  


const SwitchWrap = ({ value, switchOnChangeHandler, switchSize }: SwitchWrapPropsType) => {

  return <RSwitchTextTrack
    checked={value}
    onChange={switchOnChangeHandler}
    inputProps={{ 'aria-label': 'controlled', }}
    switchSize={switchSize ?? "large"} 

  />


}


interface  BgColoredSwitchWithTextAndChildrenWrapPropsType extends SwitchWrapPropsType {
    mainText:string
    subMainText?:string
    subText:string
    variant?:TextFieldVariants
    children?:ReactNode
}

const BgColoredSwitchWithTextAndChildren =({
        mainText,
        subText,
        variant,
        subMainText,
        children,
        switchOnChangeHandler,
        value,

        }:BgColoredSwitchWithTextAndChildrenWrapPropsType)=>{

    const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

    return (
          <Flex   
             direction={"row"}
             justifyContent={"space-evenly"}
                
                pt={2}
                pb={2}
                pr={1}
                pl={1}
                m={1}
                width={"100%"}
                height={80}
                gap={0.5}
                borderRadius={1}
                sx={{ 
                     border:variant==='outlined' ? 'solid 1px ':undefined ,
                     borderColor:'lightgray',
                     background:variant==='filled'? grey[200]: undefined,
                     "&:hover":{
                        borderColor:'black',
                        background:variant==='filled'? grey[300]:undefined,
                    },
                    }}
                 >
            <SwitchWrap value={value} switchOnChangeHandler={switchOnChangeHandler }/>
                <Flex>
                   <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {mainText.slice(0,20)}</Typography>
                    {subMainText &&  <Typography  fontWeight={"bold"} fontSize={!sm?13  :18}> {subMainText.slice(0,20)}</Typography>}
                  <Typography  fontSize={!sm ?11: 13} >{subText.slice(0, children? 70 : 90)}</Typography>
                  
                </Flex>

                <Box width={100}  >
                {! value &&  children}
                </Box>

                
         </Flex>
    )
}




export default BgColoredSwitchWithTextAndChildren
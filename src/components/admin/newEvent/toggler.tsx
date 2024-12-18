import { FormControlLabel } from "@mui/material";
import { styled } from "@mui/material/styles";
import Switch, { switchClasses } from "@mui/material/Switch";
import { ChangeEventHandler, SyntheticEvent } from "react";

export const SwitchTextTrack = styled(Switch)({
  width: 60,
  height: 30,
  padding: 4,
  [`& .${switchClasses.switchBase}`]: {
    padding: 8,
    color: "#ff6a00",
  },
  [`& .${switchClasses.thumb}`]: {
    width: 13,
    height: 13,
    backgroundColor: "#fff",
  },
  [`& .${switchClasses.track}`]: {
    background: "red",
    opacity: "1 !important",
    borderRadius: 20,
    position: "relative",
    "&:before, &:after": {
      display: "inline-block",
      position: "absolute",
      top: "50%",
      width: "50%",
      transform: "translateY(-50%)",
      color: "#fff",
      textAlign: "center",
      fontSize: "0.75rem",
      fontWeight: 500,
    },
    "&:before": {
      content: '""',
      left: 4,
      opacity: 0,
    },
    "&:after": {
      content: '"on"',
      right: 4,
    },
  },
  [`& .${switchClasses.checked}`]: {
    [`&.${switchClasses.switchBase}`]: {
      color: "#185a9d",
      transform: "translateX(32px)",
      "&:hover": {
        backgroundColor: "rgba(24,90,257,0.08)",
      },
    },
    [`& .${switchClasses.thumb}`]: {
      backgroundColor: "#fff",
    },
    [`& + .${switchClasses.track}`]: {
      background: "green",
      "&:before": {
        opacity: 1,
      },
      "&:after": {
        opacity: 0,
      },
    },
  },
});

interface TogglerType {
    value ?: boolean
    onChangeHndler? : (e:SyntheticEvent<Element, Event>)=>void
    stateName?:string

}

export default function Toggler ({value,onChangeHndler}:TogglerType){

   return <FormControlLabel
    onChange={onChangeHndler}
    value={value}
    control={<SwitchTextTrack sx={{ m: 1 }} defaultChecked />}
    label=""
  />
}

import InputWrap, { InputWrapPropsType } from "./input-wrap";

export type MultilineType =   {
    multiline: true;
    rows: number;
     
  }  

  export type MultilinePropsType  = InputWrapPropsType & MultilineType
  
  export default function TextAreaWrap ({rows ,multiline , ...restProps}:MultilinePropsType){
    return <InputWrap {...restProps}  rows={rows} multiline  />

}



import { Typography , Stack as Flex } from "@mui/material"
import { ChangeEventHandler } from "react"
import OutLineInputWrap from "./input-wrap"

interface PriceFormPropsType {
    normalPrice:string
    dicountPrice:string
    PriceHndler: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement>
  }
  const PicerForm = ({normalPrice,dicountPrice,PriceHndler}:PriceFormPropsType)=>{
  
    return (
      
    <form >
      <Typography textAlign={'center'} color='primary' variant='h3'  >מחיר מושב </Typography>
      <Flex direction={'row'} justifyContent={"space-around"} >
        
      <OutLineInputWrap  label={'מחיר רגיל'} value={normalPrice} onChangeHndler={PriceHndler} stateName={"normalPrice"}     />
     
      <OutLineInputWrap  label={'מחיר מוזל'} value={dicountPrice} onChangeHndler={PriceHndler} stateName={'discountPricel'}      />
      <Typography>{"מחיר מוזל  תושב "}</Typography>
        </Flex>
      </form>
    )
  }
  export default PicerForm
import { DatePicker, DateTimeValidationError, PickerChangeHandlerContext } from "@mui/x-date-pickers"
import dayjs from "dayjs"
import { TextFieldVariants, useTheme , TextFieldProps  } from "@mui/material"
import  ControledLabel  from "@/components/gen/controled-form-label"


interface DatePickerWrapType  {
    label:string
    variant?:TextFieldVariants
    value:Date
    minDate? : Date 
    maxDate? :Date
    isEroor?:boolean
    onAcceptHendler: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onChangeHendler?: (value: dayjs.Dayjs | null, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    onEroorHndler: (e:DateTimeValidationError, context:dayjs.Dayjs|null )=>void
    labelPositioin:"top"|"end"
    MediaQuery?:string 
    color?:TextFieldProps['color']
    helpText?:string,
    disablePast?:boolean
}

const DatePickerWrap =({ 
          label,
          labelPositioin,
          variant,
          isEroor,
          value,
          maxDate,
          MediaQuery,
          color,
          helpText,
          minDate,
          disablePast,
          onAcceptHendler  ,
          onEroorHndler,
          onChangeHendler
        
         }:DatePickerWrapType)=>{

        const theme = useTheme()


    return    ( 

    <DatePicker                 
            desktopModeMediaQuery={MediaQuery??theme.breakpoints.up("lg")}
            value={ dayjs(value) }
            closeOnSelect={false}
            disablePast={disablePast??true}
            // tryed not working curenntly
            // minTime ={}
            // minDateTime={} 
            // maxDate={} 
            // maxTime ={}
            maxDate={maxDate?dayjs(maxDate):undefined} //  time select
            onError={onEroorHndler}
            label={<ControledLabel labelPositioin={labelPositioin} label={label} />}
            sx={{  m:0.5 }}       
            onAccept={onAcceptHendler}
            onChange={onChangeHendler}


            slotProps={{
                    textField:{
                        variant:variant??"outlined" ,
                        color:color,
                        helperText:helpText? helpText :undefined
                    }
                        
            }}
   />

   )
}




export default DatePickerWrap
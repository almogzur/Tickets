import {  Schedule } from '@/pages/_app'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { createContext, Dispatch, MouseEventHandler, SetStateAction } from 'react'



interface TabsEventsDatesContextTye {
    schedules: Schedule[]
    setSchedules:Dispatch<SetStateAction<Schedule[]>>
    dateEroor:boolean
    addEventDate :(e:dayjs.Dayjs, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    removeDate:(dateToRemove: Schedule) => void
    addEventHour:(e:dayjs.Dayjs,schedul:Schedule,schedulIndex:number) => void
    removeEventHour:(hourIndex:number,schedulIndex:number) => void
}
export default createContext<TabsEventsDatesContextTye>(null)
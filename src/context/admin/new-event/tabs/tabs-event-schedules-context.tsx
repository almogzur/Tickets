import {  Schedule } from '@/pages/_app'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { createContext, Dispatch, MouseEventHandler, SetStateAction } from 'react'



interface TabsEventsSchedulesContextTye {
    schedule: Schedule
    setSchedule:Dispatch<SetStateAction<Schedule>>
    dateEroor:boolean
    addScheduleDate :(e:dayjs.Dayjs, context: PickerChangeHandlerContext<DateTimeValidationError>) => void
    removeScheduleDate:(dateToRemove: Schedule) => void
    addScheduleHour:(e:dayjs.Dayjs,schedul:Schedule) => void
    removeScheduleHour:() => void
    setEndOfDate:(e:dayjs.Dayjs,schdual:Schedule)=> void
    removeEndOdDate:()=>void
}
export default createContext<TabsEventsSchedulesContextTye>(null)
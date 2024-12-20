import {  Schedule } from '@/pages/_app'
import { DateTimeValidationError, PickerChangeHandlerContext } from '@mui/x-date-pickers'
import dayjs from 'dayjs'
import { createContext, Dispatch, MouseEventHandler, SetStateAction } from 'react'



interface TabsEventsSchedulesContextTye {
    schedule: Schedule
    dateEroor:boolean
    setSchedule:Dispatch<SetStateAction<Schedule>>
    addScheduleDate : (e:dayjs.Dayjs) => void
    removeScheduleDate:(dateToRemove: Schedule) => void 
    setEndOfDate:(e:dayjs.Dayjs,schdual:Schedule)=> void
    removeEndOdDate:()=>void
}



export default createContext<TabsEventsSchedulesContextTye>({
    schedule: {
        isEventClosedForSeal: false,
        day: undefined,
        closingSealesDate: undefined
    },
    setSchedule: function (value: SetStateAction<Schedule>): void {
        throw new Error('Function not implemented.')
    },
    dateEroor: false,
    addScheduleDate: function (e: dayjs.Dayjs): void {
        throw new Error('Function not implemented.')
    },
    removeScheduleDate: function (dateToRemove: Schedule): void {
        throw new Error('Function not implemented.')
    },
    setEndOfDate: function (e: dayjs.Dayjs, schdual: Schedule): void {
        throw new Error('Function not implemented.')
    },
    removeEndOdDate: function (): void {
        throw new Error('Function not implemented.')
    }
})
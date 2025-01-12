import { Positions, TheaterTipinfoType } from '@/components/admin/newEvent/theater/types/theater-types'
import { createContext, SetStateAction } from 'react'




interface ClinetTipContenxtType {
     clientTipPosition:Positions
     clinetTipInfo: TheaterTipinfoType
     setClientTipPosition:React.Dispatch<React.SetStateAction<Positions>>
     setClinetTipInfo :React.Dispatch<React.SetStateAction<TheaterTipinfoType>>
     resetClinetTip:()=> void
}

export default createContext<ClinetTipContenxtType>({
     clientTipPosition: {
          x: 0,
          y: 0
     },
     clinetTipInfo: {
          initValue: 0,
          row: "",
          seatNumber: 0
     },
     setClientTipPosition: function (value: SetStateAction<Positions>): void {
          throw new Error('Function not implemented.')
     },
     setClinetTipInfo: function (value: SetStateAction<TheaterTipinfoType>): void {
          throw new Error('Function not implemented.')
     },
     resetClinetTip: function (): void {
          throw new Error('Function not implemented.')
     }
})
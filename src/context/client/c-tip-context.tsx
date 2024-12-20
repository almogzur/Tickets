import { createContext, SetStateAction } from 'react'
import { TipinfoType ,Positions } from '@/pages/_app'



interface ClinetTipContenxtType {
     clientTipPosition:Positions
     clinetTipInfo: TipinfoType
     setClientTipPosition:React.Dispatch<React.SetStateAction<Positions>>
     setClinetTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
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
     setClinetTipInfo: function (value: SetStateAction<TipinfoType>): void {
          throw new Error('Function not implemented.')
     },
     resetClinetTip: function (): void {
          throw new Error('Function not implemented.')
     }
})
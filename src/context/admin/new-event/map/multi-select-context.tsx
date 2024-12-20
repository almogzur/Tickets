import { createContext, SetStateAction } from 'react'


import { Positions , MultiTipeInfoType } from '@/pages/_app'

interface MultiTipContenxtType {
     multiTipPositions:Positions
     multiTipInfo: MultiTipeInfoType
     setMutiTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     resetMultiTip:()=> void
     setMultiTipInfo:React.Dispatch<React.SetStateAction<MultiTipeInfoType>>
     resetErr: () => void
}

export default createContext<MultiTipContenxtType>({
     setMutiTipPositions: function (value: SetStateAction<Positions>): void {
          throw new Error('Function not implemented.')
     },
     resetMultiTip: function (): void {
          throw new Error('Function not implemented.')
     },
     setMultiTipInfo: function (value: SetStateAction<MultiTipeInfoType>): void {
          throw new Error('Function not implemented.')
     },
     resetErr: function (): void {
          throw new Error('Function not implemented.')
     },
     multiTipPositions: {
          x: 0,
          y: 0,
     },
     multiTipInfo: {
          seatNumber: 0,
          row: "",
          first: 0,
          second: 0,
          totalselected: 0,
          err: "",
          selectdir: undefined
     }
})
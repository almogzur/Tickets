import { Positions, TheaterMultiTipeInfoType } from '@/components/admin/newEvent/theater/types/theater-types'
import { createContext, Dispatch, SetStateAction } from 'react'




interface MultiTipContenxtType {
     multiTipPositions:Positions
     multiTipInfo: TheaterMultiTipeInfoType
     setMutiTipPositions:Dispatch<React.SetStateAction<Positions>>
     resetMultiTip:()=> void
     setMultiTipInfo:Dispatch<React.SetStateAction<TheaterMultiTipeInfoType>>
     resetErr: () => void
}

export default createContext<MultiTipContenxtType>({
     setMutiTipPositions: function (value: SetStateAction<Positions>): void {
          throw new Error('Function not implemented.')
     },
     resetMultiTip: function (): void {
          throw new Error('Function not implemented.')
     },
     setMultiTipInfo: function (value: SetStateAction<TheaterMultiTipeInfoType>): void {
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
          first: undefined,
          second: undefined,
          totalselected: 0,
          err: "",
          selectdir: undefined
     }
})
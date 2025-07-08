import { Positions, TheaterMultiTipInfoType } from '@/types/components-types/admin/theater/admin-theater-types'
import { createContext, Dispatch, SetStateAction } from 'react'




interface MultiTipContextType {
     multiTipPositions:Positions
     multiTipInfo: TheaterMultiTipInfoType
     setMutiTipPositions:Dispatch<React.SetStateAction<Positions>>
     setMultiTipInfo:Dispatch<React.SetStateAction<TheaterMultiTipInfoType>>
     resetMultiTip:()=> void
     resetErr: () => void
}

export default createContext<MultiTipContextType>({
     setMutiTipPositions: function (value: SetStateAction<Positions>): void {
          throw new Error('Function not implemented.')
     },
     resetMultiTip: function (): void {
          throw new Error('Function not implemented.')
     },
     setMultiTipInfo: function (value: SetStateAction<TheaterMultiTipInfoType>): void {
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
          totalSelected: 0,
          err: "",
          selectDir: undefined
     }
})
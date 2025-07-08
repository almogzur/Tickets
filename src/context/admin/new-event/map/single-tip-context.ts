
import { Positions, TheaterTipInfoType } from '@/types/components-types/admin/theater/admin-theater-types'
import { createContext, SetStateAction } from 'react'



interface SingleTipContextType {
     singleTipPositions:Positions
     seatTipInfo: TheaterTipInfoType
     resetSingleTip:()=>void
     setSingleTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TheaterTipInfoType>>
}

export default createContext<SingleTipContextType>(
     {
          singleTipPositions: {
               x: 0,
               y: 0
          },
          seatTipInfo:{
               initValue: 0,
               row: "",
               seatNumber: 0
          },
          resetSingleTip:():void=>{},
          
          setSingleTipPositions: function (value: SetStateAction<Positions>): void {          },
          setSeatTipInfo: function (value: SetStateAction<TheaterTipInfoType>): void {          },
     }
)
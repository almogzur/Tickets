
import { Positions, TheaterTipinfoType } from '@/types/components-types/admin/theater/admin-theater-types'
import { createContext, SetStateAction } from 'react'



interface SingleTipContenxtType {
     singleTipPositions:Positions
     seatTipInfo: TheaterTipinfoType
     resetSingleTip:()=>void
     setSingleTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TheaterTipinfoType>>
}

export default createContext<SingleTipContenxtType>(
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
          setSeatTipInfo: function (value: SetStateAction<TheaterTipinfoType>): void {          },
     }
)
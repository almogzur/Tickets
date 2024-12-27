import { Positions,  } from '@/pages/_app'
import { TipinfoType } from '@/pages/admin/new-event'
import { createContext, SetStateAction } from 'react'



interface SingleTipContenxtType {
     singleTipPositions:Positions
     seatTipInfo: TipinfoType
     resetSingleTip:()=>void
     setSingleTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
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
          setSeatTipInfo: function (value: SetStateAction<TipinfoType>): void {          },
     }
)
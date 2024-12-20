import { Positions, TipinfoType } from '@/pages/_app'
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
          
          setSingleTipPositions: function (value: SetStateAction<Positions>): void {
               throw new Error('Function not implemented.')
          },
          setSeatTipInfo: function (value: SetStateAction<TipinfoType>): void {
               throw new Error('Function not implemented.')
          },
     }
)
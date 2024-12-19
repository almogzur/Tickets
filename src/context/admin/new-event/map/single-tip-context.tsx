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
               x: undefined,
               y: undefined
          },
          seatTipInfo:{
               initValue: undefined,
               row: undefined,
               seatNumber: undefined
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
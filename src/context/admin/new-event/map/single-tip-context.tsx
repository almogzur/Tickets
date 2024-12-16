import { Positions, TipinfoType } from '@/pages/_app'
import { createContext } from 'react'



interface SingleTipContenxtType {
     singleTipPositions:Positions
     setSingleTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     seatTipInfo: TipinfoType
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
     resetSingleTip:Function
}

export default createContext<SingleTipContenxtType|null>(null)
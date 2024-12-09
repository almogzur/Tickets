import { createContext } from 'react'
import { TipinfoType ,Positions } from '../pages/_app'


interface SingleTipContenxtType {
     singleTipPositions:Positions
     setSingleTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     seatTipInfo: TipinfoType
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
     resetSingleTip:Function
}

export default createContext<SingleTipContenxtType|null>(null)
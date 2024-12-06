import { createContext } from 'react'
import { TipinfoType } from '../pages/_app'

interface TipContenxtType {
     tipX: number 
     tipY:number 
     setTipX:React.Dispatch<React.SetStateAction<number>>
     setTipY :React.Dispatch<React.SetStateAction<number>>
     seatTipInfo: TipinfoType
     setSeatTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
     resetTip:Function
}

export default createContext<TipContenxtType|null>(null)
import { createContext } from 'react'
import { TipinfoType ,Positions } from '../pages/_app'



interface ClinetTipContenxtType {
     clientTipPosition:Positions
     setClientTipPosition:React.Dispatch<React.SetStateAction<Positions>>
     clinetTipInfo: TipinfoType
     setClinetTipInfo :React.Dispatch<React.SetStateAction<TipinfoType>>
     resetClinetTip:()=> void
}

export default createContext<ClinetTipContenxtType|null>(null)
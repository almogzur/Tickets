import { createContext } from 'react'


import { Positions , MultiTipeInfoType } from '@/pages/_app'

interface MultiTipContenxtType {
     multiTipPositions:Positions
     setMutiTipPositions:React.Dispatch<React.SetStateAction<Positions>>
     resetMultiTip:()=> void
     multiTipInfo: MultiTipeInfoType
     setMultiTipInfo:React.Dispatch<React.SetStateAction<MultiTipeInfoType>>
     resetErr: () => void
}

export default createContext<MultiTipContenxtType|null>(null)
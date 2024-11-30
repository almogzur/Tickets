import type { AppProps } from 'next/app'


import MoviesContext from '../context/MoviesContext'
import { useEffect, useState } from 'react';
import { Movie } from '../constants/models/Movies';
import { movies as mockMovies } from './../constants/movies';
import '../styles/global.css'
import { useMediaQuery } from 'usehooks-ts';
import WidthContext from '../context/WidthContext';
import SeatsPositionContext  from '../context/map-position-context'
import TipContext from '@/context/Tip-context';
import { SessionProvider } from "next-auth/react"
import AdmindDawerContext from '../context/AdmindDawerContext'

import '@tomtom-international/web-sdk-maps/dist/maps.css'


function MyApp({ 
  Component,
  pageProps: { session, ...pageProps },
  }: AppProps) {


  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  const [x,setX] = useState(0)  
  const [y,setY] = useState(0)  
  const [S,setS] = useState(0)
  const [ tipX, setTipX]=useState(null)
  const [ tipY, setTipY]= useState(null)
  const [DawerIsOpen , setdDawerIsOpen] = useState(false)


  const xxl = useMediaQuery('(min-width : 1600px)')
   const xl = useMediaQuery('(min-width : 1200px)')
   const lg = useMediaQuery('(min-width: 992px)')
   const md = useMediaQuery('(min-width: 768px)')
   const sm = useMediaQuery('(min-width : 576px)')
   const xs = useMediaQuery('(min-width : 489px)')
   const xxs = useMediaQuery('(min-width : 310px)')


  return (
    
    
      <SessionProvider>
        <AdmindDawerContext.Provider value={{DawerIsOpen,setdDawerIsOpen}}>
        <TipContext.Provider value={{tipX, tipY ,setTipX,setTipY}}>
        <SeatsPositionContext.Provider value={{x,y,S,setX,setY,setS}}>
        <MoviesContext.Provider value={{movies, setMovies}}>
        <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>
          <Component {...pageProps} />
        </WidthContext.Provider>
        </MoviesContext.Provider>
        </SeatsPositionContext.Provider>
        </TipContext.Provider>
        </AdmindDawerContext.Provider>
      </SessionProvider>


    
  )
}




export default MyApp




import type { AppProps } from 'next/app'

import Layout from '../components/Layout'
import MoviesContext from '../context/MoviesContext'
import { useEffect, useState } from 'react';
import { Movie } from '../constants/models/Movies';
import { movies as mockMovies } from './../constants/movies';
import '../styles/global.css'
import { useMediaQuery } from 'usehooks-ts';
import WidthContext from '../context/WidthContext';



function MyApp({ Component, pageProps }: AppProps) {


  const [movies, setMovies] = useState<Movie[]>(mockMovies);

  const xxl = useMediaQuery('(min-width : 1600px)')
   const xl = useMediaQuery('(min-width : 1200px)')
   const lg = useMediaQuery('(min-width: 992px)')
   const md = useMediaQuery('(min-width: 768px)')
   const sm = useMediaQuery('(min-width : 576px)')
   const xs = useMediaQuery('(min-width : 489px)')
   const xxs = useMediaQuery('(min-width : 310px)')


  return (
    <Layout>
      <MoviesContext.Provider value={{movies, setMovies}}>
      <WidthContext.Provider value={{xxl,xl,lg,md,sm,xs,xxs}}>

        <Component {...pageProps} />
        </WidthContext.Provider>
      </MoviesContext.Provider>
   
    </Layout>
  )
}

export default MyApp

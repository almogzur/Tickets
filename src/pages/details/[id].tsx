import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import { Movie } from '../../constants/models/Movies'
import MoviesContext from '../../context/MoviesContext';
import DisableZoom from '../../lib/hooks/useDisablePinchZoomEffect'
import WidthContext from '@/context/WidthContext';
import SeatWrapper  from '../../components/Seats'
import { Container , Typography as Heading , Stack as Flex  , Button } from '@mui/material';
import Map from '../../components/tom-map'

const DetailsPage = () => {  

  const router = useRouter()
  const { movies ,setMovies } = useContext(MoviesContext);
  const { id } : any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));


  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>פרטים</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>

      <Flex direction={"column"}>
        <ShowCover imageSrc={movie.cover} name = {movie.name} />
      </Flex>
      
         <SeatWrapper/>
     {/* <Map/>  */}
    </>
  );
}


const ShowCover =({imageSrc,name}:{imageSrc:any, name:string})=>{
  const {xxl,xl,lg,md,sm,xs,xxs} = useContext(WidthContext)

  return (
    <Flex direction={'row'} justifyContent={"center"}>
        <Image src={imageSrc} height={!xs? 400 : 500} width={!xs? 300 : 400} alt={name}></Image>

    </Flex>
  )
}








 
export default DetailsPage;
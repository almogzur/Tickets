import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { useState, useEffect, useContext, CSSProperties, useRef, } from 'react'
import { Event } from '../../constants/models/Events'
import MoviesContext from '../../context/Events';
import DisableZoom from '../../lib/hooks/useDisablePinchZoomEffect'
import WidthContext from '@/context/WidthContext';
import ClinetSideSeates  from '../../components/client/client-side-seats'
import { Container , Typography as Heading , Stack as Flex  , Button } from '@mui/material';
import Map from '../../components/client/tom-map'
import ClientLayout from '../../Layouts/client-layout';



import   Eilat_1   from '../../constants/theathers/eilat_1'







const DetailsPage = ({}) => {  

  const router = useRouter()
  const { events ,setEvents } = useContext(MoviesContext);
  const {id}  = router.query

  const event = typeof id ==='string' && events.find(ev => ev.id === parseInt(id));

 
  if (!event) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>פרטים</title>
        <meta name="viewport" content="width=device-width, user-scalable=no"/>
      </Head>
      
      <ClientLayout> 
          <Flex direction={"column"}>
            <ShowCover imageSrc={event.cover} name = {event.name} />
            </Flex>
      
         <ClinetSideSeates mainSeats={Eilat_1.mainSeats} sideSeats={Eilat_1.sideSeats} sideText={Eilat_1.testsStyle} sideStyles={Eilat_1.styles}/>
     {/* <Map/>  */}
      </ClientLayout>
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
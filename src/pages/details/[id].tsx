import Head from 'next/head'
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router'
import { Button, Heading , Flex } from '@chakra-ui/react'


import { Movie } from '../../constants/models/Movies'
import MoviesContext from '../../context/MoviesContext';
import { CSSProperties, useContext } from 'react';
import { StaticImport } from 'next/dist/shared/lib/get-img-props';

const styles :Record<string,CSSProperties> = {
paymentButton: {
  background: '#f84464',
},
paymentButtonContainer: {
  position: 'sticky',
  bottom: '10px',
},
buttonContainer: {
  display: 'flex',
  justifyContent: 'space-around',
},
buttonHolder: {
  width: '40%',
  display: 'flex',
  justifyContent: 'space-around',
  marginTop: '40px',
},
}


const Details = () => {  

  const router = useRouter()
  const { movies } = useContext(MoviesContext);
  const { id } : any = router.query
  const movie = movies.find(mov => mov.id === parseInt(id));




    
  if (!movie) return <div>loading...</div>
  return (
    <>
      <Head>
        <title>פרטים</title>
      </Head>
      <Flex direction={"column"}>
        <Heading fontSize={"4xl"} p={4} textAlign={"center"} >{movie.name}</Heading>
        <Heading textAlign={"center"} color={"#fff"} >מחיר לכרטיס</Heading>

        
        <ShowCover imageSrc={movie.cover.src} name = {movie.name} />
        <BookTicketsButton  id={movie.id}/>

        </Flex>
  
    </>
  );
}

type MovieType = {
  movie: Movie;
  isLoading: boolean;
  isError: boolean;
}
 
export default Details;


const BookTicketsButton = ({id}:{id:Number|String}) => {
  return (
        <Flex justify={"center"} m={5} >
        <Button variant={"solid"} colorPalette={"blue"} >

            <Link href={`/seats/${id}`} >
   
            הזמן כרטיס
     
          </Link>
        </Button>
        </Flex>
  )
}

const ShowCover =({imageSrc,name}:{imageSrc:StaticImport, name:string})=>{
  return (
    <Flex justifyContent={"center"}>
        <Image src={imageSrc} height={400} width={300} alt={name}></Image>

    </Flex>
  )
}
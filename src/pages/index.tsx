import {  Button, Container ,Flex ,  Card,  Text, Heading ,Image } from '@chakra-ui/react';


import Head from 'next/head'
import Link from 'next/link';


import {useGetMovies} from '../services/movies'
import { Movie } from '../constants/models/Movies';
import { FcShare } from "react-icons/fc";



export default function Home() {
  const { movies, isLoading, isError } = useGetMovies();

  const MoviesList = () => {
    if (movies) {
      return movies.map((movie: Movie) => (
     
          <Link href={`/details/${movie.id}`} key={movie.id} >
             <Card.Root maxW="sm" overflow="hidden">
             <Image
               src={movie.cover.src}
               alt="Green double couch with wooden legs"
      
             />
             <Card.Body gap="2">
               <Card.Title>Living room Sofa</Card.Title>
               <Card.Description>
                  {movie.adText }
               </Card.Description>
               <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
                 $450
               </Text>
             </Card.Body>
             <Card.Footer gap="2">
               <Button variant="solid">Buy now</Button>
               <Button variant="ghost">Add to cart</Button>
             </Card.Footer>
           </Card.Root>
          </Link>

      ))
    } else if (isLoading) {
      return <>טוען...</>
    } else {
      return <>אין תוצאות </>
    }
  }
  
  return (
    <>
      <Head>
        <title>Book My Ticket | Home</title>
      </Head>

        <Heading as='h3' textAlign={"center"} >ההופעות שלנו</Heading>
     <div style={{display:'flex' ,flexWrap:"wrap",  flexDirection:'row',
  
  
     
     }}>
       <MoviesList/>
       </div>

    </>
  )
}

import { Box } from '@mui/material';
import Link from 'next/link'
import { useRouter } from 'next/router';



import type { InferGetStaticPropsType, GetStaticProps, GetStaticPropsContext, PreviewData } from 'next'
import { ParsedUrlQuery } from 'querystring';
import { useEffect } from 'react';
 

 



const NotFound =  () => {


  const router = useRouter();

  const isAdminRoute = /^\/admin(\/|$)/.test(router.asPath);
  const isClientRoute = !/^\/admin(\/|$)/.test(router.asPath); // Routes that don't match "/admin/*"



  

  return (
    <Box 
      sx={{
        "*":{ color:"red"}
      }}
     >
      <h1>{router.pathname}</h1>
      <h1>{router.asPath}</h1>

      <h2>That page cannot be found :(</h2>
      <p>Go back to the <Link href="/">Homepage</Link></p>
    </Box>
  );
}
 
export default NotFound;



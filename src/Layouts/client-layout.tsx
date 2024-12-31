import { Stack as Flex , Container } from "@mui/material";
import Navbar from "../components/Navbar"


const ClientLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />
      <Container sx={{background:"black"}} >
      { children }
      </Container>
      </>
  );
}
 
export default ClientLayout;

import type { InferGetServerSidePropsType, GetServerSideProps } from 'next'



export const getServerSideProps = (async (context) => {
  const nonce = context.res?.getHeader("x-nonce") 
  return { props: { nonce } }

}) satisfies GetServerSideProps<{ nonce: string | number | string[] | undefined }>



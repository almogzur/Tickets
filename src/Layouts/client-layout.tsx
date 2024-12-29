import { Stack as Flex , Container } from "@mui/material";
import Navbar from "../components/Navbar"
import { Fragment } from "react";

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
export const dynamic = "force-dynamic"

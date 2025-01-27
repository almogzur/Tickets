import { Container , Stack as Flex } from "@mui/material";
import ClientNavbar from "../components/client/Navbar"

const ClientLayout = ({ children }: any) => {
  return (
    <>
   
      <Flex alignItems={"center"}  bgcolor={"black"} >
            <ClientNavbar />
        <Container sx={{p:0,m:0,direction:"rtl"}}  >
            { children }
        </Container>
      </Flex>

      </>
  );
}
 
export default ClientLayout;







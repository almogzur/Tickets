import { Container , Stack as Flex } from "@mui/material";
import ClientNavbar from "../components/client/Navbar"

const ClientLayout = ({ children }: any) => {
  return (
    <>
       <ClientNavbar />
        <Flex alignItems={"center"}  bgcolor={"black"} >
           { children }
       </Flex>
      </>
  );
}
 
export default ClientLayout;







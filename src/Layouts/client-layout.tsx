import { Stack as Flex , Container } from "@mui/material";
import Navbar from "../components/Navbar"


const ClientLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />

      { children }

      </>
  );
}
 
export default ClientLayout;







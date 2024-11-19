import { Container } from "@mui/material";
import Navbar from "./Navbar"

const Layout = ({ children }: any) => {
  return (
    <Container sx={{}} >
      <Navbar />
      { children }
    </Container>
  );
}
 
export default Layout;
import Navbar from "./Navbar"
import { Provider } from "../components/ui/provider"

const Layout = ({ children }: any) => {
  return (
    < >
      <Navbar />
      { children }
    </>
  );
}
 
export default Layout;
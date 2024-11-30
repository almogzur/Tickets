import Navbar from "../components/Navbar"

const ClientLayout = ({ children }: any) => {
  return (
    < >
      <Navbar />
      { children }
    </>
  );
}
 
export default ClientLayout;
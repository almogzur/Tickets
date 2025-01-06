import Navbar from "../components/gen/Navbar"

const ClientLayout = ({ children }: any) => {
  return (
    <>
      <Navbar />

      { children }

      </>
  );
}
 
export default ClientLayout;







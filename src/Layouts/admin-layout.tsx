import { useContext } from 'react';
import MiniDrawer from '../components/Drawer'
import {Stack as Flex, Paper , Box } from '@mui/material'
import { styled, useTheme } from '@mui/material/styles';


import AdmindDawerContext from '../context/AdmindDawerContext';

const AdminLayout = ({ children }: any) => {
  const theam = useTheme()
  const { DawerIsOpen, setdDawerIsOpen } = useContext(AdmindDawerContext);



  const DRAWER_OPEN_WIDTH = 160;
  const DRAWER_CLOSED_WIDTH = 70

  return (
    < >
      
      <MiniDrawer  />
        <Flex 
          sx={{
            direction:"rtl",
     }}
            >
          { children }
        </Flex>
    </>
  );
}
 
export default AdminLayout;
import { Box } from '@mui/material';
import { useState } from 'react';
import { DrawerHeader } from '../styles/NavbarStyles';
import Navbar from '../components/Navbar';
import Topbar from '../components/Topbar';
import { Outlet } from 'react-router-dom';

const OperatorMainLayout = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>

      <Topbar open={open} handleDrawerOpen={handleDrawerOpen} />

      <Navbar open={open} handleDrawerClose={handleDrawerClose} />

      <Box component="main" sx={{ flexGrow: 1, padding: "0 10%" }}>
        <DrawerHeader />
        <Outlet />
      </Box>
    </Box>
  );
}

export default OperatorMainLayout;
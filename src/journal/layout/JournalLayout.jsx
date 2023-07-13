import { Box, Toolbar } from '@mui/material';
import { NavBar, SideBar } from '../components';

// Sidebar size
const drawerWidth = 300;

export const JournalLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh' }} className='animate__animated animate__fadeIn'>
      <NavBar drawerWidth={drawerWidth} />

      <SideBar drawerWidth={drawerWidth} />

      <Box component='main' sx={{ width: '100%', p: 3 }} className='animate__animated animate__zoomIn'>
        <Toolbar></Toolbar>

        {children}
      </Box>
    </Box>
  );
};

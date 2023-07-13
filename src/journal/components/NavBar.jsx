import { useDispatch } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';

import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';

export const NavBar = ({ drawerWidth }) => {
  const dispatch = useDispatch();

  const onLogout = () => {
    // console.log('Logout user');
    dispatch(startLogout());
  };

  return (
    <AppBar position='fixed' sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` } }}>
      <Toolbar>
        <IconButton color='inherit' aria-label='toggle menu' sx={{ mr: 2, display: { sm: 'none' } }}>
          <MenuOutlined />
        </IconButton>

        <Grid container justifyContent='space-between' alignItems='center'>
          <Typography variant='h6' component='h2' noWrap>
            Journal App
          </Typography>

          <IconButton color='error' aria-label='logout' onClick={onLogout}>
            <LogoutOutlined />
          </IconButton>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

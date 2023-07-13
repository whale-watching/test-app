import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';

import { GitHub, Google, VisibilityOff, Visibility } from '@mui/icons-material';
import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField, Typography } from '@mui/material';
import AuthLayout from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';
import { startGitHubSignIn, startGoogleSignIn, startLoginWithEmailAndPassword } from '../../store/auth/thunks';

const formInitialState = { email: '', password: '' };

const LoginPage = () => {
  const dispatch = useDispatch();
  const { status, errorMessage } = useSelector((state) => state.auth);

  const { email, password, onInputChange } = useForm(formInitialState);

  const [showPassword, setShowPassword] = useState(false);
  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const onSubmit = (event) => {
    event.preventDefault();
    dispatch(startLoginWithEmailAndPassword({ email, password }));
  };

  const onGoogleSignIn = () => {
    // console.log('On google sign IN');
    dispatch(startGoogleSignIn());
  };

  const onGitHubSignIn = () => {
    dispatch(startGitHubSignIn());
  };

  return (
    <AuthLayout title='Login'>
      <form onSubmit={onSubmit} aria-label='submit-form'>
        <Grid container justifyContent='center'>
          <Grid item xs={10} sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='email@gmail.com'
              fullWidth
              variant='standard'
              name='email'
              value={email}
              onChange={onInputChange}
              required
            />
          </Grid>

          <Grid item xs={10} sx={{ mt: 3 }}>
            <TextField
              label='Password'
              type={showPassword ? 'text' : 'password'}
              fullWidth
              variant='standard'
              name='password'
              value={password}
              onChange={onInputChange}
              required
              inputProps={{ 'data-testid': 'password' }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton aria-label='toggle password visibility' onClick={togglePasswordVisibility} edge='start'>
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid container spacing={3} sx={{ mb: 3, mt: 4 }} alignItems='center'>
            <Grid item xs={12} display={!!errorMessage ? '' : 'none'} className='animate__animated animate__flash'>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item xs={12} sm={12}>
              <Button type='submit' variant='outlined' fullWidth disabled={isAuthenticating}>
                Login
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                startIcon={<Google />}
                onClick={onGoogleSignIn}
                disabled={isAuthenticating}
                aria-label='google-btn'
              >
                <Typography>Sign in with Google</Typography>
              </Button>
            </Grid>

            <Grid item xs={12} sm={6}>
              <Button
                variant='contained'
                fullWidth
                startIcon={<GitHub />}
                onClick={onGitHubSignIn}
                disabled={isAuthenticating}
                aria-label='github-btn'
              >
                <Typography>Sign in with GitHub</Typography>
              </Button>
            </Grid>
          </Grid>

          <Grid container spacing={1} direction='row' justifyContent='center' sx={{ mt: 3 }}>
            <Link component={RouterLink} color='inherit' to='/auth/register' underline='hover'>
              Don't have an account yet ? Create one
            </Link>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

export default LoginPage;

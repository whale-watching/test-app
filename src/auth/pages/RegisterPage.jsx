import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink } from 'react-router-dom';
import { startRegisterUserWithEmailAndPassword } from '../../store/auth/thunks';

import { Alert, Button, Grid, IconButton, InputAdornment, Link, TextField } from '@mui/material';
import { VisibilityOff, Visibility } from '@mui/icons-material';
import AuthLayout from '../layout/AuthLayout';

import { useForm } from '../../hooks/useForm';

// Regex expressions for form validation
const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;

// Form values
const formData = { username: '', email: '', password: '', password2: '' };
let passwordAux = '';

const formValidations = {
  username: [(value) => value.length >= 3, 'Username must have a minimum length of 3'],
  email: [(value) => emailRegex.test(value), 'Email is not valid'],
  password: [(value) => passwordRegex.test(value), '6+ characters long, at least one letter and one number'],
  password2: [(value) => value === passwordAux, 'Passwords do not match'],
};

export const RegisterPage = () => {
  const { status, errorMessage } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [showPassword, setShowPassword] = useState(false);
  const [isFormSubmitted, setisFormSubmitted] = useState(false);

  const { onInputChange, username, email, password, password2, usernameValid, emailValid, passwordValid, password2Valid, isFormValid, formState } =
    useForm(formData, formValidations);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const isAuthenticating = useMemo(() => status === 'checking', [status]);

  const onSubmit = (event) => {
    event.preventDefault();
    setisFormSubmitted(true);

    if (!isFormValid) return;

    dispatch(startRegisterUserWithEmailAndPassword(formState));
    // console.log(formState);
  };

  useEffect(() => {
    // console.log(password);
    passwordAux = password;
  }, [password]);

  return (
    <AuthLayout title='Register'>
      <form onSubmit={onSubmit}>
        <Grid container direction='column'>
          <Grid item sx={{ mt: 2 }}>
            <TextField
              label='User Name'
              type='text'
              placeholder='Your username'
              fullWidth
              required
              name='username'
              value={username}
              onChange={onInputChange}
              error={!!usernameValid && isFormSubmitted}
              helperText={isFormSubmitted && usernameValid}
            />
          </Grid>

          <Grid item sx={{ mt: 2 }}>
            <TextField
              label='Email'
              type='email'
              placeholder='email@gmail.com'
              fullWidth
              required
              name='email'
              value={email}
              onChange={onInputChange}
              error={!!emailValid && isFormSubmitted}
              helperText={isFormSubmitted && emailValid}
            />
          </Grid>

          <Grid container columns={{ xs: 1, md: 4 }} spacing={1}>
            <Grid item sx={{ mt: 2 }} xs={1} md={2}>
              <TextField
                label='Password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                name='password'
                value={password}
                onChange={onInputChange}
                error={!!passwordValid && isFormSubmitted}
                helperText={isFormSubmitted && passwordValid}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={togglePasswordVisibility} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>

            <Grid item sx={{ mt: 2 }} xs={1} md={2}>
              <TextField
                label='Confirm password'
                type={showPassword ? 'text' : 'password'}
                fullWidth
                required
                name='password2'
                value={password2}
                onChange={onInputChange}
                error={!!password2Valid && isFormSubmitted}
                helperText={isFormSubmitted && password2Valid}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton aria-label='toggle password visibility' onClick={togglePasswordVisibility} edge='end'>
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>

          <Grid container sx={{ mb: 2, mt: 3 }} direction='column'>
            <Grid item display={!!errorMessage ? '' : 'none'} className='animate__animated animate__flash'>
              <Alert severity='error'>{errorMessage}</Alert>
            </Grid>

            <Grid item sx={{ mt: 2 }}>
              <Button type='submit' variant='outlined' fullWidth disabled={isAuthenticating}>
                Create Account
              </Button>
            </Grid>

            <Grid item sx={{ mt: 6 }} alignSelf='center'>
              <Link component={RouterLink} color='inherit' to='/auth/login'>
                Already have an account ? Sign In
              </Link>
            </Grid>
          </Grid>
        </Grid>
      </form>
    </AuthLayout>
  );
};

import { configureStore } from '@reduxjs/toolkit';
import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import LoginPage from '../../../src/auth/pages/LoginPage';
import { authSlice } from '../../../src/store/auth/authSlice';

import { notAuthenticatedState } from '../../fixtures/authFixtures';

const mockStartGoogleSignIn = jest.fn();
const mockStartLoginWithEmailAndPassword = jest.fn();

jest.mock('../../../src/store/auth/thunks', () => {
  return {
    startGoogleSignIn: () => mockStartGoogleSignIn,
    startLoginWithEmailAndPassword: ({ email, password }) => {
      return () => mockStartLoginWithEmailAndPassword({email, password});
    },
  };
});

// Mock only a part of a module or library
// In this case only mock useDispatch
jest.mock('react-redux', () => {
  return {
    ...jest.requireActual('react-redux'),
    useDispatch: () => {
      return (fn) => fn();
    },
  };
});

const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
  },
  preloadedState: {
    // precargar un estado al stoore
    auth: notAuthenticatedState,
  },
});

describe('Testing <LoginPage/> component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should render the component', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getAllByText('Login').length).toBeGreaterThanOrEqual(1);
  });

  test('Should start google sign in when button is clicked', () => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const googleBtn = screen.getByLabelText('google-btn');
    fireEvent.click(googleBtn);

    expect(mockStartGoogleSignIn).toHaveBeenCalled();
    expect(mockStartGoogleSignIn).toHaveBeenCalledTimes(1);
  });

  test('Onsubmit should call start login with email and password', () => {
    const email = 'softtscoder@gmail.com';
    const password = 'testingpassword123';

    render(
      <Provider store={store}>
        <MemoryRouter>
          <LoginPage />
        </MemoryRouter>
      </Provider>
    );

    const emailField = screen.getByRole('textbox', { name: 'Email' });
    fireEvent.change(emailField, { target: { name: 'email', value: email } });

    const passwordField = screen.getByTestId('password');
    fireEvent.change(passwordField, { target: { name: 'password', value: password } });

    const loginForm = screen.getByLabelText('submit-form');
    fireEvent.submit(loginForm);

    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalled();
    expect(mockStartLoginWithEmailAndPassword).toHaveBeenCalledWith({ email, password });
  });
});

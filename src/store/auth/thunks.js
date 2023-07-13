import {
  firebaseSignOut,
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  signInWithGitHub,
  signInWithGoogle,
} from '../../firebase/provides';

import { checkingCredentials, login, logout } from './authSlice';
import { clearNotesLogout } from '../journal/journalSlice';

// Thunk just for testing purposes
export const checkingAuthentication = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
  };
};

export const startGoogleSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGoogle();

    // console.log(result);

    if (!result.ok) return dispatch(logout(result.message));

    delete result.ok;
    dispatch(login(result));
  };
};

export const startGitHubSignIn = () => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await signInWithGitHub();

    if (!result.ok) return dispatch(logout(result.message));

    delete result.ok;
    dispatch(login(result));
  };
};

export const startRegisterUserWithEmailAndPassword = ({ username: displayName, email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await registerUserWithEmailAndPassword({ displayName, email, password });

    if (!result.ok) return dispatch(logout(result.message));

    // console.log(result);
    dispatch(login(result));
  };
};

export const startLoginWithEmailAndPassword = ({ email, password }) => {
  return async (dispatch) => {
    dispatch(checkingCredentials());

    const result = await loginWithEmailAndPassword({ email, password });

    if (!result.ok) return dispatch(logout(result.message));

    delete result.ok;
    dispatch(login(result));
  };
};

export const startLogout = () => {
  return async (dispatch) => {
    await firebaseSignOut();

    dispatch(clearNotesLogout());

    dispatch(logout());
  };
};

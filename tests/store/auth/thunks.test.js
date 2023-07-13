import {
  firebaseSignOut,
  loginWithEmailAndPassword,
  registerUserWithEmailAndPassword,
  signInWithGitHub,
  signInWithGoogle,
} from '../../../src/firebase/provides';
import { checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import {
  checkingAuthentication,
  startGitHubSignIn,
  startGoogleSignIn,
  startLoginWithEmailAndPassword,
  startLogout,
  startRegisterUserWithEmailAndPassword,
} from '../../../src/store/auth/thunks';
import { clearNotesLogout } from '../../../src/store/journal/index.js';
import { demoUser } from '../../fixtures/authFixtures';

// Mock of all Firebase providers, all exports from the file in the path
jest.mock('../../../src/firebase/provides');

describe('Tests on auth thunks', () => {
  // Mock the redux dispatch function
  const dispatch = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('Should start checkingAuthentication', async () => {
    const returnedFunctionByThunk = await checkingAuthentication();
    await returnedFunctionByThunk(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledTimes(1);

    // These 3 forms do the same :
    expect(dispatch).toHaveBeenCalledWith(expect.any(Object));
    expect(dispatch).toHaveBeenCalledWith({ payload: undefined, type: 'auth/checkingCredentials' });
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
  });

  test('Should start successful GoogleSignIn, call checkingCredentials and login', async () => {
    const successfulResponse = { ok: true, ...demoUser };
    // Mocked function :
    await signInWithGoogle.mockResolvedValue(successfulResponse);

    // thunk
    // ()() execute the returned function, same as line 24-25
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(successfulResponse));
    expect(dispatch).toHaveBeenNthCalledWith(2, login(successfulResponse));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should start GoogleSignIn and return error, call only logout with error message', async () => {
    const errorResponse = { ok: false, code: expect.any(String), message: 'Test error message' };
    // Mocked function :
    await signInWithGoogle.mockResolvedValue(errorResponse);

    // execute thunk
    await startGoogleSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(errorResponse.message));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should start successful github signin, call checking credentials and login', async () => {
    const successfulResponse = { ok: true, ...demoUser };
    await signInWithGitHub.mockResolvedValue(successfulResponse);

    await startGitHubSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(successfulResponse));
    expect(dispatch).toHaveBeenNthCalledWith(2, login(successfulResponse));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should start githubSignIn and return error, call only logout with error message', async () => {
    const errorResponse = { ok: false, code: expect.any(String), message: 'Test error message' };
    // Mocked function :
    await signInWithGitHub.mockResolvedValue(errorResponse);

    // execute thunk
    await startGitHubSignIn()(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(errorResponse.message));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should succesfully startRegisterUserWithEmailAndPassword', async () => {
    // Successful mock response from Firebase
    const succesfulResponse = { ok: true, ...demoUser };
    await registerUserWithEmailAndPassword.mockResolvedValue(succesfulResponse);

    const demoRegisterUser = { username: expect.any(String), email: expect.any(String), password: expect.any(String) };
    await startRegisterUserWithEmailAndPassword(demoRegisterUser)(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(succesfulResponse));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should return error startRegisterUserWithEmailAndPassword, call checkingCredentials and logout', async () => {
    const errorResponse = { ok: false, code: expect.any(String), message: 'Register email and pass error message' };
    await registerUserWithEmailAndPassword.mockResolvedValue(errorResponse);

    const demoRegisterUser = { username: expect.any(String), email: expect.any(String), password: expect.any(String) };
    await startRegisterUserWithEmailAndPassword(demoRegisterUser)(dispatch);

    expect(dispatch).toHaveBeenCalled();
    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenNthCalledWith(2, logout(errorResponse.message));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should succesfully startLoginWithEmailAndPassword', async () => {
    const successfulResponse = { ok: true, ...demoUser };
    const loginData = { email: expect.any(String), password: expect.any(String) };

    // Mocked function
    await loginWithEmailAndPassword.mockResolvedValue(successfulResponse);

    const returnedFunctionByThunk = startLoginWithEmailAndPassword(loginData);
    await returnedFunctionByThunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(login(demoUser));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('Should startLoginWithEmailAndPassword and return error, call checkingCredentials and logout', async () => {
    const errorResponse = { ok: false, code: expect.any(String), message: 'login with email and password error message' };
    const loginData = { email: expect.any(String), password: expect.any(String) };

    await loginWithEmailAndPassword.mockResolvedValue(errorResponse);

    const returnedAsyncFunctionByThunk = startLoginWithEmailAndPassword(loginData);
    await returnedAsyncFunctionByThunk(dispatch);

    expect(dispatch).toHaveBeenCalledWith(checkingCredentials());
    expect(dispatch).toHaveBeenCalledWith(logout(errorResponse.message));
    expect(dispatch).toHaveBeenCalledTimes(2);
  });

  test('startLogout should call firebaseSignOut, clearNotes and logout', async () => {
    await startLogout()(dispatch);

    expect(firebaseSignOut).toHaveBeenCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith(clearNotesLogout());
    expect(dispatch).toHaveBeenCalledWith(logout());
    expect(dispatch).toHaveBeenCalledTimes(2);
  });
});

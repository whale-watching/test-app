import { authSlice, checkingCredentials, login, logout } from '../../../src/store/auth/authSlice';
import { authenticatedState, demoUser, initialState, notAuthenticatedState, notAuthenticatedWithErrorMsgState } from '../../fixtures/authFixtures';

describe('Tests on auth redux slice', () => {
  test('Slice name should be "auth" and must return correct initial state', () => {
    expect(authSlice.name).toBe('auth');
    expect(authSlice.getInitialState()).toEqual(initialState);
  });

  test('Should login', () => {
    const state = authSlice.reducer(initialState, login(demoUser));
    expect(state).toEqual(authenticatedState);
  });

  test('Should logout no error message', () => {
    const state = authSlice.reducer(authenticatedState, logout());
    expect(state).toEqual(notAuthenticatedState);
  });

  test('Should logout with error message', () => {
    const state = authSlice.reducer(authenticatedState, logout('Error message test'));
    expect(state).toEqual(notAuthenticatedWithErrorMsgState);
  });

  test('Should check credentials', () => {
    const state = authSlice.reducer(notAuthenticatedState, checkingCredentials());
    expect(state.status).toBe('checking');
    expect(state).toEqual({ ...notAuthenticatedState, status: 'checking' });
  });
});

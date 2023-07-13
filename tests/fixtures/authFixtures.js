export const initialState = {
  status: 'checking', // checking, not-authenticated, authenticated
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const authenticatedState = {
  status: 'authenticated',
  uid: 'B723BdaDHy1123AB29djE',
  email: 'softtscoder@gmail.com',
  displayName: 'Testing',
  photoURL: 'https://demo.jpg',
  errorMessage: null,
};

export const notAuthenticatedState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: null,
};

export const notAuthenticatedWithErrorMsgState = {
  status: 'not-authenticated',
  uid: null,
  email: null,
  displayName: null,
  photoURL: null,
  errorMessage: 'Error message test',
};

export const demoUser = {
  uid: 'B723BdaDHy1123AB29djE',
  email: 'softtscoder@gmail.com',
  displayName: 'softtscoder',
  photoURL: 'https://demo.jpg',
};

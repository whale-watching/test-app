import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { onAuthStateChanged } from 'firebase/auth';
import { firebaseAuth } from '../firebase/config';
import { login, logout } from '../store/auth/authSlice';
import { startLoadingNotes } from '../store/journal/thunks';

// use checking authentication custom hook
export const useCheckAuth = () => {
  const { status } = useSelector((state) => state.auth);

  const dispatch = useDispatch(logout());

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (user) => {
      // console.log(user);

      if (!user) return dispatch(logout());

      // If the user exists then:
      const { uid, email, displayName, photoURL } = user;
      dispatch(login({ uid, email, displayName, photoURL }));

      dispatch(startLoadingNotes());
    });
  }, []);

  return { status };
};

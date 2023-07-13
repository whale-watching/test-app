import { Routes, Route, Navigate } from 'react-router-dom';
import { RegisterPage } from '../pages';
import LoginPage from '../pages/LoginPage';

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path='login' element={<LoginPage />} />

      <Route path='register' element={<RegisterPage />} />

      <Route path='/*' element={<Navigate to='/auth/login' />} />
    </Routes>
  );
};

export default AuthRoutes;

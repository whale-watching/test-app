import { useCheckAuth } from '../hooks';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import AuthRoutes from '../auth/routes/AuthRoutes';
import JournalRoutes from '../journal/routes/JournalRoutes';
import { CheckingAuth } from '../ui';

const AppRouter = () => {
  const { status } = useCheckAuth();

  if (status === 'checking') {
    return <CheckingAuth />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {status === 'authenticated' ? (
          // Private Routes
          // {/* JournalApp */}
          <Route path='/*' element={<JournalRoutes />} />
        ) : (
          // Public Routes
          // {/* Login and register */}
          <Route path='/auth/*' element={<AuthRoutes />} />
        )}

        <Route path='/*' element={<Navigate to='/auth/login' />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;

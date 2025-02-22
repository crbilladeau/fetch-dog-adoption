import { useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router';
import { Toaster } from 'sonner';

/* Context */
import { useAuth } from './context/AuthContext';

/* Components */
import Login from './Login';
import SearchDashboard from './authenticated-routes/SearchDashboard';

/* Context */
import { FavoritesProvider } from './context/FavoritesContext';

function App() {
  const { isAuthenticated, setIsAuthenticated } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('auth-session');
    if (!token) {
      return setIsAuthenticated(false);
    }

    const { expiration } = JSON.parse(token || '');

    if (expiration > Date.now()) {
      setIsAuthenticated(true);
      navigate('/search');
    } else {
      localStorage.removeItem('auth-session');
      setIsAuthenticated(false);
      navigate('/login');
    }
  }, []);

  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route
        path='search'
        element={
          isAuthenticated ? (
            <FavoritesProvider>
              <Toaster richColors />
              <SearchDashboard />
            </FavoritesProvider>
          ) : (
            <Navigate to='/login' />
          )
        }
      />
      <Route path='/' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;

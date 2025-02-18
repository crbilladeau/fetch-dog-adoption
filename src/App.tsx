import { Routes, Route, Navigate } from 'react-router';

/* Context */
import { useAuth } from './context/AuthContext';

/* Components */
import Login from './Login/Login';
import SearchDashboard from './SearchDashboard/SearchDashboard';

function App() {
  const { isAuthenticated } = useAuth();
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route
        path='search'
        element={
          isAuthenticated ? <SearchDashboard /> : <Navigate to='/login' />
        }
      />

      <Route path='/' element={<Navigate to='/login' />} />
    </Routes>
  );
}

export default App;

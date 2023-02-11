import { Route, Routes } from 'react-router-dom';
import App from './App';
import { Dashboard } from './Dashboard';
import Login from './Login';
import ProtectedRoute from './ProtectedRoute';

export default function Pages() {
  return (
    <Routes>
      <Route path='login' element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path='/' element={<App />}>
          <Route path='/' element={<Dashboard />} />
        </Route>
      </Route>
      <Route path='*' element={<Login />} />
    </Routes>
  );
}

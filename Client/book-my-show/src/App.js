import './App.css';
import {BrowserRouter, Route, Routes, Navigate} from 'react-router-dom';
import Home from './pages/Home/Home';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SingleMovie from './pages/SingleMovie/SingleMovie';
import BookShow from './pages/BookShow/BookShow';
import ForgetPassword from './pages/Forget/Forget';
import ResetPassword from './pages/Reset/Reset';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  return (
    <div>
    <BrowserRouter>
    <Routes>
      <Route path="/" element={
        <ProtectedRoute>
          <Home/>
        </ProtectedRoute>
      } />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/forget" element={<ForgetPassword/>} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/movie/:id" element={<SingleMovie/>} />
      <Route path="/movie/:movieId/book-show/:showId" element={<BookShow/>} />
    </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;

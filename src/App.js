import './App.css';
import AddVideo from './pages/AddVideoPage';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';
import Wishlists from './pages/Wishlists';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import PublicRoute from './components/routes/PublicRoute';
import PrivateRoute from './components/routes/PrivateRoute';
import EditVideoPage from './pages/EditVideoPage';
import useAuthCheck from './hooks/useAuthCheck';
import PasswordResetPage from './pages/PasswordResetPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import ErrorPage from './pages/ErrorPage';




function App() {
  const authChecked = useAuthCheck();


  return !authChecked ? <div>Checking Authentication</div> : (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><RegistrationPage /></PublicRoute>} />
        <Route path='/password-reset' element={<PrivateRoute><PasswordResetPage /></PrivateRoute>} />
        <Route path='/forgotpassword/:id/:token' element={<PrivateRoute><ForgotPasswordPage /></PrivateRoute>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/my-wishlist' element={<PrivateRoute><Wishlists /></PrivateRoute>} />
        <Route path='/videos/:videoId' element={<VideoDetailPage />} />
        <Route path='/videos/:videoId/update' element={<PrivateRoute><EditVideoPage /></PrivateRoute>} />
        <Route path='/addVideo' element={<PrivateRoute><AddVideo /></PrivateRoute>} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

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


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<PublicRoute><LoginPage /></PublicRoute>} />
        <Route path='/register' element={<PublicRoute><RegistrationPage /></PublicRoute>} />
        <Route path='/' element={<HomePage />} />
        <Route path='/my-wishlist' element={<PrivateRoute><Wishlists /></PrivateRoute>} />
        <Route path='/videos/:videoId' element={<VideoDetailPage />} />
        <Route path='/videos/:videoId/update' element={<EditVideoPage />} />
        <Route path='/addVideo' element={<PrivateRoute><AddVideo /></PrivateRoute>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

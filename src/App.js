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


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegistrationPage />} />
        <Route path='/' element={<HomePage />} />
        <Route path='/my-wishlist' element={<Wishlists />} />
        <Route path='/videos/:videoId' element={<VideoDetailPage />} />
        <Route path='/addVideo' element={<AddVideo />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

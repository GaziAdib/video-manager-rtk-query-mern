import './App.css';
import AddVideo from './pages/AddVideoPage';
import HomePage from './pages/HomePage';
import VideoDetailPage from './pages/VideoDetailPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from './components/footer/Footer';
import Navbar from './components/navbar/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/videos/:videoId' element={<VideoDetailPage />} />
          <Route path='/addVideo' element={<AddVideo />} />
        </Routes>
      <Footer />
    </Router>
  );
}

export default App;

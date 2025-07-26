import { Routes, Route, useLocation } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotificationPage from './pages/NotificationPage';
import ProfilePage from './pages/ProfilePage';
import PostDetail from './pages/PostDetail';
import NavBar from './components/NavBar';
import { useEffect, useState } from 'react';
import { Loading } from './components/Loading';
import ShareModal from './components/ShareModal';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import LeftSidebar from './components/LeftSideBar';
import RightSidebar from './components/RightSidebar';
import Layout from './components/Layout';
import { useAuth } from './context/AuthContext';
import AllActivities from './pages/AllActivities';
import Saves from './pages/Saves';
import Friends from './pages/Friends';

function App() {
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);
  const location = useLocation();
  const { user, logout } = useAuth();
  const hideNavbarFooter = location.pathname === '/login' || location.pathname === '/signup';

  useEffect(() => {
    const handleLoad = () => {
      setLoading(false);
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
      return () => window.removeEventListener("load", handleLoad);
    }
  }, []);
  console.log("calling from app");
  
  return (
    <div className="h-full w-full duration-100 ease-linear">
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loading />}
      <NavBar user={user} logout={logout} />
      <div className="flex w-full h-full relative">
        {!hideNavbarFooter && <LeftSidebar isWritePostModalOpen={isWritePostModalOpen} setIsWritePostModalOpen={setIsWritePostModalOpen} user={user}/>}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage setIsWritePostModalOpen={setIsWritePostModalOpen} />} />
            <Route path="/:user/notifications" element={<NotificationPage />} />
            <Route path="/:user/profile" element={<ProfilePage user={user}/>} />
            <Route path="/:user/recent-activities/:type" element={<AllActivities />} />
            <Route path="/:user/saves" element={<Saves />} />
            <Route path="/:user/friends" element={<Friends />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </Layout>
        {!hideNavbarFooter && <RightSidebar />}
      </div>
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        postUrl={window.location.href}
      />
    </div>
  );
}

export default App

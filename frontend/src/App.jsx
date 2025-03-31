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

function App() {
  const [loading, setLoading] = useState(true);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);
  const location = useLocation();
  const hideNavbarFooter = location.pathname === '/login';

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
  return (
    <div className="h-full w-full duration-100 ease-linear">
      <Toaster position="top-right" reverseOrder={false} />
      {loading && <Loading />}
      <NavBar />
      <div className="flex w-full h-full relative">
        {!hideNavbarFooter && <LeftSidebar isWritePostModalOpen={isWritePostModalOpen} setIsWritePostModalOpen={setIsWritePostModalOpen} />}
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage isWritePostModalOpen={isWritePostModalOpen} setIsWritePostModalOpen={setIsWritePostModalOpen} />} />
            <Route path="/notifications" element={<NotificationPage />} />
            <Route path="/profile" element={<ProfilePage />} />
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





// Update the Profile page. add the side bars. make the project open source

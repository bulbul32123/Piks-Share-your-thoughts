import { FaSearch, FaUser, FaBell } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { Link } from 'react-router-dom';
import Logo from './Logo';
import MobileNavResponsive from './MobileNavResponsive';
import NotificationDropdown from './NotificationDropdown';
import { BsBellFill } from 'react-icons/bs';
import { useAuth } from '../context/AuthContext';

export default function NavBar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showMobileNav, setShowMobileNav] = useState(false);
  const dropdownRef = useRef(null);
  const { user, loading, logout } = useAuth();
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New comment on your post',
      message: 'John Doe commented on your post',
      time: '2 hours ago',
      isRead: false,
      avatar: 'https://i.pravatar.cc/150?img=1',
      link: '/post/1'
    },
    {
      id: 2,
      title: 'Someone liked your post',
      message: 'Jane Smith liked your recent post',
      time: '5 hours ago',
      isRead: false,
      avatar: 'https://i.pravatar.cc/150?img=2',
      link: '/post/2'
    },
    {
      id: 3,
      title: 'New follower',
      message: 'Mike Brown started following you',
      time: 'Yesterday',
      isRead: true,
      avatar: 'https://i.pravatar.cc/150?img=3',
      link: '/profile'
    },
    {
      id: 4,
      title: 'New follower',
      message: 'Mike Brown started following you',
      time: 'Yesterday',
      isRead: true,
      avatar: 'https://i.pravatar.cc/150?img=3',
      link: '/profile'
    },
    {
      id: 5,
      title: 'New follower',
      message: 'Mike Brown started following you',
      time: 'Yesterday',
      isRead: true,
      avatar: 'https://i.pravatar.cc/150?img=3',
      link: '/profile'
    }
  ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };

  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;
  // Initialize dark mode state based on localStorage value
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(false);
      document.documentElement.classList.add("dark");
    } else {
      setIsDarkMode(true);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    document.documentElement.classList.toggle("dark");
    const newTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setIsDarkMode((prev) => !prev);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <>
      <header className="w-full bg-white dark:bg-black shadow-sm sticky  top-0 pl-4 z-[4] pr-4 border-b-[2px] dark:border-b-[#292828]">
        <div className="flex items-center justify-between py-2.5">
          <Link to='/' className="flex items-center gap-2 ">
            <span className='h-12'>
              <Logo dark={isDarkMode} />
            </span>
          </Link>

          <div className="hidden w-1/2 md:flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
            <FaSearch className="text-gray-500 dark:text-gray-100" />
            <input
              type="text"
              placeholder="Search"
              className="bg-transparent ml-2 w-full outline-none"
            />
          </div>

          {/* Mobile Search */}

          {/* Navigation Icons */}
          <div className="flex gap-1">
            <span className="md:hidden text-2xl text-gray-600 p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:text-black rounded-xl cursor-pointer">
              <FaSearch size={22} />
            </span>
            {user && <div className="relative w-full h-full" ref={dropdownRef}>
              <button
                onClick={toggleDropdown}
                className="text-2xl text-gray-600 p-2 hover:bg-gray-100 dark:text-gray-100 dark:hover:text-black rounded-xl cursor-pointer"
                aria-label="Notifications"
              >
                {unreadCount > 0 ? <BsBellFill size={22} /> : <FaBell size={22} />}
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              <NotificationDropdown setIsOpen={setIsOpen} isOpen={isOpen} toggleDropdown={toggleDropdown} notifications={notifications} setNotifications={setNotifications} unreadCount={unreadCount} />
            </div>}
            {isDarkMode ? (
              <span onClick={toggleDarkMode} className="text-2xl dark:hover:text-black text-black dark:text-gray-100 p-2 hover:bg-gray-100 rounded-xl cursor-pointer">
                <FaMoon size={22} />
              </span>
            ) : (
              <span onClick={toggleDarkMode} className="text-2xl text-gray-600 dark:text-gray-100 p-2 hover:bg-gray-100 dark:hover:text-black rounded-xl cursor-pointer">
                <MdSunny size={22} />
              </span>
            )}
            {user ? <button onClick={() => setShowMobileNav(true)} className="text-2xl text-gray-600 dark:text-gray-100 p-2 hover:bg-gray-100 dark:hover:text-black rounded-xl cursor-pointer">
              <FaUser size={22} />
            </button> : <div className='flex gap-2 items-center'>
              <Link to='/login' style={{ padding: "0.3rem 1rem" }} className="text-white bg-black dark:text-gray-100 p-2 ml-1.5 hover:bg-gray-900  select-none rounded-[0.2rem] cursor-pointer">
                Login
              </Link>
              <Link to='/signup' style={{ padding: "0.3rem 1rem" }} className="dark:text-black dark:hover:bg-gray-200 select-none  bg-transparent text-black hover:bg-gray-100 dark:bg-gray-100 rounded-[0.2rem] cursor-pointer">
                Signup
              </Link>
            </div>
            }
          </div>
        </div>
      </header>
      {user && <MobileNavResponsive user={user} setShowMobileNav={setShowMobileNav} showMobileNav={showMobileNav} toggleDarkMode={toggleDarkMode} isDarkMode={isDarkMode} logout={logout} />}
    </>
  );
}

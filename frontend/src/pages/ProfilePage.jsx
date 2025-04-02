import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";
import PostCard from "../components/PostCard";
import ProfileEdit from "../components/profileEdit/ProfileEdit";
import { useClickOutside } from "../hooks/useClickOutside";

export default function ProfilePage({ user }) {
  const [activeTab, setActiveTab] = useState("Posts");
  const tabs = ["Posts", "Media", "Replies", "Likes"];
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('http://localhost:5000/api/users');
      const data = await response.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);


  return (
    <div className="border-gray-300 h-full w-full relative">
      {/* Header */}
      <button className="py-2 pr-2 flex gap-1 items-center ">
        <IoMdArrowBack className="text-xl" /> back
      </button>

      {/* Profile Banner */}
      <div className="relative w-full h-48 bg-gray-200 rounded-sm">
        <div className="absolute -bottom-14 left-4 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white">
          <FaUserCircle className="text-gray-400 text-6xl" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 border-b border-gray-300 mt-5">
        <div className="flex justify-end">
          <button className="px-4 py-2 border bg-black text-white border-gray-400 rounded-full text-sm font-medium hover:bg-gray-800 dark:text-black dark:bg-white hover:dark:bg-gray-200 dark:border-black" onClick={() => setIsEditProfileModalOpen(true)}>Edit Profile</button>
        </div>
        <h2 className="text-xl font-bold dark:text-white text-black">{user?.name ? user.name : "Guest"}</h2>
        <p className="text-gray-500 dark:text-white">@johndoe</p>
        <p className="text-gray-600 dark:text-white mt-2">Frontend Developer | Tech Enthusiast</p>
        <div className="mt-2 flex gap-4 text-gray-600 dark:text-gray-300 text-sm">
          <span><strong>890</strong> Following</span>
          <span><strong>2.3K</strong> Followers</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-around border-gray-300">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`w-full py-3 text-gray-500 dark:text-gray-300 text-center text-sm font-medium ${activeTab === tab ? "border-b-4 border-green-500 rounded-sm text-blue-500" : "text-gray-600"
              }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="py-4">
        {activeTab === "Posts" && posts.slice(0, 3).map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
        {activeTab === "Replies" && <p className="text-gray-500 dark:text-gray-300">User&apos;s replies will appear here.</p>}
        {activeTab === "Media" && <p className="text-gray-500 dark:text-gray-300">User&apos;s media posts will appear here.</p>}
        {activeTab === "Likes" && <p className="text-gray-500 dark:text-gray-300">User&apos;s liked posts will appear here.</p>}
      </div>
      {isEditProfileModalOpen &&
        <ProfileEdit setIsEditProfileModalOpen={setIsEditProfileModalOpen} isEditProfileModalOpen={isEditProfileModalOpen} />}
    </div>
  );
}
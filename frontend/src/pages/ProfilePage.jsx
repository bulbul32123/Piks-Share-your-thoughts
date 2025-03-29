import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoMdArrowBack } from "react-icons/io";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Posts");
  const tabs = ["Posts", "Media", "Replies", "Likes"];

  return (
    <div className="mx-auto border-gray-300 h-full w-full pl-16 pr-16">
      {/* Header */}
      <div className="flex items-center gap-4 px-4 py-3 border-b border-gray-300">
        <IoMdArrowBack className="text-xl cursor-pointer" />
      </div>

      {/* Profile Banner */}
      <div className="relative w-full h-48 bg-gray-200">
        <div className="absolute -bottom-14 left-4 w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-white">
          <FaUserCircle className="text-gray-400 text-6xl" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 pb-4 border-b border-gray-300 mt-5">
        <div className="flex justify-end">
          <button className="px-4 py-2 border bg-black text-white border-gray-400 rounded-full text-sm font-medium hover:bg-gray-800 dark:text-black dark:bg-white hover:dark:bg-gray-200 dark:border-black">Edit Profile</button>
        </div>
        <h2 className="text-xl font-bold dark:text-white text-black">John Doe</h2>
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
      <div className="p-4 0 text-center">
        {activeTab === "Posts" && <p className="text-gray-500 dark:text-gray-300" >User&apos;s posts will appear here.</p>}
        {activeTab === "Replies" && <p className="text-gray-500 dark:text-gray-300">User&apos;s replies will appear here.</p>}
        {activeTab === "Media" && <p className="text-gray-500 dark:text-gray-300">User&apos;s media posts will appear here.</p>}
        {activeTab === "Likes" && <p className="text-gray-500 dark:text-gray-300">User&apos;s liked posts will appear here.</p>}
      </div>
    </div>
  );
}
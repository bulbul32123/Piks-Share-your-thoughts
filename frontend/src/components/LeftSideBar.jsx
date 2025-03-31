import { FaUserFriends } from "react-icons/fa";
import { FaHistory } from "react-icons/fa";
import { BsBookmarkFill } from "react-icons/bs";
import { RiImageEditFill } from "react-icons/ri";
import { LuLayoutList } from "react-icons/lu";
import { useState } from "react";
import { Link } from "react-router-dom";
import WritePostModal from "./WritePostModal";

export default function LeftSidebar() {
  const [isWritePostModalOpen, setIsWritePostModalOpen] = useState(false);

  const sidebarData = [
    {
      id: 1,
      name: "Friends",
      icon: <FaUserFriends size={27} />,
      link: "friends"
    },
    {
      id: 2,
      name: "Saves",
      icon: <BsBookmarkFill size={27} />,
      link: "saves"
    },
    {
      id: 3,
      name: "My Posts",
      icon: <LuLayoutList size={27} />,
      link: "myposts"
    },
    {
      id: 4,
      name: "History",
      icon: <FaHistory size={27} />,
      link: "history"
    },
  ]

  return (
    <>
      <div className="sticky top-[4rem] left-0 block border-r-[2px] max-sm:hidden dark:border-r-[#292828] z-[2] h-screen w-16 md:w-60 pb-2 pt-10 md:px-2.5 md:pr-2 bg-white dark:bg-black">
        <Link to="/profile" className="mb-3 px-3 block">
          <div className="flex items-center gap-3">
            <img src="/pic.jpg" className="w-10 h-auto md:w-12 md:h-12 object-cover rounded-full object-center" alt="" />
            <div>
              <p className="font-medium hover:underline max-md:hidden">John Doe</p>
            </div>
          </div>
        </Link>
        <div className="flex gap-2 flex-col  pb-4 mx-auto">
          {sidebarData.map((link) => (

            <Link to={`/${link.link}`} className="py-1 md:py-4 md:hover:bg-gray-100 md:dark:hover:bg-[#1a1a1a] px-3 block rounded-r-xl" key={link.id}>
              <div className="flex items-center gap-3 mx-auto">
                <span className="max-md:bg-white max-md:hover:bg-gray-100 dark:bg-black  max-md:dark:hover:bg-[#1a1a1a] max-md:dark:text-white max-md:text-black max-md:pl-2 max-md:p-3 max-md:text-sm max-md:rounded-xl">{link.icon}</span>
                <div>
                  <p className="font-medium text-lg dark:text-gray-200 max-md:hidden">{link.name}</p>
                </div>
              </div>
            </Link>
          ))
          }
          <button
            onClick={() => setIsWritePostModalOpen(true)}
            className="max-md:hidden flex md:w-full rounded-full py-2.5 mt-3 bg-black dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black text-white justify-center items-center font-bold text-lg"
          >
            Write a Post
          </button>
          <button
            onClick={() => setIsWritePostModalOpen(true)}
            className="md:hidden bg-black hover:bg-gray-800 dark:bg-gray-200 dark:hover:bg-gray-300 dark:text-black text-white py-2 px-2 max-md:ml-3 rounded-xl mx-auto"
          >
            <RiImageEditFill size={27} />
          </button>
        </div>

      </div>
      {/* Post Modal */}
      <WritePostModal
        isOpen={isWritePostModalOpen}
        onClose={() => setIsWritePostModalOpen(false)}
      />
    </>
  );
}
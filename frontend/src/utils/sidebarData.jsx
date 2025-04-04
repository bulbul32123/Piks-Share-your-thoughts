import { LuLayoutList } from 'react-icons/lu';
import { BsBookmarkFill } from 'react-icons/bs';
import { FaUserFriends } from "react-icons/fa";

export const sidebarData = [
    {
      id: 1,
      name: "Friends",
      icon: <FaUserFriends size={27} />,
      link: `friends`
    },
    {
      id: 2,
      name: "Saves",
      icon: <BsBookmarkFill size={27} />,
      link: `saves`
    },
    {
      id: 3,
      name: "All Activities",
      icon: <LuLayoutList size={27} />,
      link: `recent-activities/posts`
    },
  ]
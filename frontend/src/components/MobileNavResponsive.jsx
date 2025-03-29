import { useState } from 'react'
import { MdKeyboardArrowRight } from "react-icons/md";
import { FaBell, FaHistory, FaUserAstronaut, FaUserFriends } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Link } from 'react-router-dom';
import { MdSunny } from "react-icons/md";
import { FaMoon } from "react-icons/fa";
import { LuLayoutList } from 'react-icons/lu';
import { BsBookmarkFill } from 'react-icons/bs';
import { constant } from '../utils/constant';


export default function MobileNavResponsive({ user, setShowMobileNav, showMobileNav, toggleDarkMode, isDarkMode, logout }) {

    const userImg = false
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
            {showMobileNav && (
                <>
                    <div className="fixed w-full top-0 inset-0  z-10 bg-black/[0.4] dark:bg-white/[0.18]" onClick={() => setShowMobileNav(false)}></div>
                    <div className={`fixed h-full top-0 z-[200] bg-white text-black dark:bg-black dark:text-white right-0 p-2 md:p-3  duration-200 ease-linear`}>
                        <div className="relative flex h-full w-52 md:w-72 flex-col py-4 pb-3">
                            <div className="flex flex-col px-2 md:px-4 overflow-y-auto ScrollBarNone">
                                <div className="w-full flex justify-between">
                                    <div className=""></div>
                                    <button onClick={() => setShowMobileNav(false)}>Close</button>
                                </div>
                                <div className="w-full flex mt-5">
                                    <div className="flex text-xl flex-col gap-5 w-full" >

                                        <Link to='/profile' className='flex justify-between items-center gap-2 hover:underline pb-4' onClick={() => setShowMobileNav(false)}>
                                            <div className="flex items-center gap-3">
                                                {userImg ? "User Img" : <FaUserAstronaut size={23} />}
                                                <p className='max-md:text-lg'>Hi, {user?.name ? user.name : "Guest"}</p>
                                            </div>
                                            <span><MdKeyboardArrowRight size={25} /></span>
                                        </Link>
                                        <Link to="/notifications" onClick={() => setShowMobileNav(false)} className='flex justify-between items-center gap-2 hover:underline ' >
                                            <div className="flex gap-2 items-center">
                                                <FaBell size={25} />
                                                <p className='max-md:text-base'>Notifications (2)</p>
                                            </div>
                                            <span><MdKeyboardArrowRight size={25} /></span>
                                        </Link>

                                        <hr className='mb-3' />
                                        {sidebarData.map((item) => (
                                            <Link href={`/${item.link}`} onClick={() => setShowMobileNav(false)} className='flex gap-3 my-2 items-center hover:underline text-base md:text-lg font-medium' key={item.id}>
                                                {item.icon}
                                                <p className=''>{item.name}</p>
                                            </Link>
                                        ))
                                        }
                                        <div className='flex justify-between items-center gap-2 ' >
                                            {isDarkMode ? (
                                                <span onClick={toggleDarkMode} className="flex items-center gap-2 dark:hover:text-black text-gray-600 dark:text-gray-100 p-2 bg-gray-100  hover:bg-gray-200 rounded-lg cursor-pointer max-md:text-base">
                                                    <FaMoon size={22} />
                                                    On Dark Mode
                                                </span>
                                            ) : (
                                                <span onClick={toggleDarkMode} className="flex items-center gap-2 text-gray-600 dark:text-gray-100 dark:bg-[#1a1a1a] p-2 dark:hover:bg-gray-100 dark:hover:text-black rounded-lg cursor-pointer max-md:text-base">
                                                    <MdSunny size={22} />
                                                    On Light Mode
                                                </span>
                                            )}
                                        </div>
                                        <hr className='mb-3' />
                                        <div className="flex gap-3 items-center w-full">
                                            <button onClick={() => { setShowMobileNav(false); logout() }} className='bg-black flex gap-1 items-center justify-center dark:bg-white text-white dark:text-black p-2 rounded-lg w-full'><span><IoLogOut size={20} /></span> Logout</button>

                                        </div>

                                        <hr className='mt-4' />
                                        <p className="text-sm text-gray-600 font-light dark:text-gray-300 flex flex-wrap gap-2 px-3 py-2">
                                            {constant.map((item, index) => (
                                                <span className="hover:underline cursor-pointer" key={index}>
                                                    {item}
                                                </span>
                                            ))}
                                            © 2025 Pics.</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </>
            )}
        </>
    )
}



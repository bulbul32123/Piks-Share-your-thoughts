import { Link } from "react-router-dom";
import { userData } from "../utils/UserData";
import { constant } from "../utils/constant";


export default function RightSidebar() {

    return (
        <div className="hidden sticky top-[0rem] right-0 pb-2 pt-10 lg:block z-[2] border-l-[2px] dark:border-l-[#292828] h-full w-60 lg:w-72 bg-white dark:bg-black">

            <div className="mb-3 px-3 block border-b-[1px] dark:border-b-[#292828] pb-2">
                <h4 className="font-bold">Friend requests</h4>
                <div className="flex gap-1 flex-col">
                    {userData.slice(5, 7).map((user, id) => (
                        <div className="flex items-center gap-3 mt-2 hover:bg-gray-100 dark:hover:bg-[#1a1a1a] px-1.5 py-1.5" key={id}>
                            <img src={user.profilePicture} className="w-10 h-auto md:w-12 md:h-12 object-cover rounded-full object-center" alt={user.name} />
                            <div className="flex flex-col gap-1">
                                <p className="font-medium dark:text-gray-100 max-lg:text-sm">{user.name}</p>
                                <div className="flex gap-2">
                                    <button className="py-1 rounded-lg px-4 bg-black text-white dark:bg-gray-200 dark:text-black max-lg:text-sm">Accept</button>
                                    <button className="py-1 px-4 rounded-lg text-white bg-red-500 dark:text-black max-xl:text-sm">Deny</button>
                                </div>
                            </div>
                        </div>
                    ))
                    }
                    <button className="hover:underline flex justify-end pr-2 dark:text-gray-100">See all</button>
                </div>
            </div>

            <div className="px-3 pb-2 border-b-[1px] dark:border-b-[#292828]">
                <h4 className="font-bold text-lg">Your Friends</h4>
                <div className="flex gap-1 flex-col mt-2">
                    {userData.slice(0, 5).map((link, index) => (
                        <Link to="/profile" className="block  hover:bg-gray-100 dark:hover:bg-[#1a1a1a] px-1.5 py-1.5" key={index}>
                            <div className="flex items-center gap-3">
                                <img src={link.profilePicture} className="w-10 h-auto md:w-12 md:h-12 object-cover rounded-full object-center" alt={link.name} />
                                <div>
                                    <p className="font-medium hover:underline max-md:hidden">{link.name}</p>
                                </div>
                            </div>
                        </Link>
                    ))
                    }
                    <button className="hover:underline flex justify-end pr-2">See all</button>
                </div>
            </div>


            <p className="text-sm text-gray-400 font-light dark:text-gray-300 flex flex-wrap gap-2 px-3 py-3">
                {constant.map((item, index) => (
                    <span className="hover:underline cursor-pointer" key={index}>
                        {item}
                    </span>
                ))}
                © 2025 Pics.</p>
        </div>
    );
}




// <pre> tag implementation but not working as expected.
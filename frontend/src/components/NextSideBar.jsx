import { Link } from 'react-router-dom'
import NextSideBarBtn from './NextSideBarBtn'


export default function NextSideBar({ setIsSideBarOpenStates, isSideBarOpen, setShowMobileNav, data }) {
    
    return (
        <div className={`absolute ${isSideBarOpen ? "translate-x-0" : "translate-x-[30rem] opacity-0"} transition-all duration-500 ease top-0 h-full w-full bg-white dark:bg-black dark:text-white z-20`}>
            <div className="flex flex-col mt-4 mb-2">
                <NextSideBarBtn setIsSideBarOpenStates={setIsSideBarOpenStates} setShowMobileNav={setShowMobileNav} />

                <div className="flex flex-col gap-4 my-8 pl-3">
                    <h4 className='font-bold text-2xl mb-2'>{data.title}</h4>
                    {data?.lists?.map((link, index) => (
                        <Link href={`/${link?.name}`} key={index} className='text-gray-500 dark:text-gray-100 font-medium text-lg hover:underline hover:text-black'>{link?.name}</Link>
                    ))

                    }
                </div>
            </div>
            <hr />
        </div>
    )
}

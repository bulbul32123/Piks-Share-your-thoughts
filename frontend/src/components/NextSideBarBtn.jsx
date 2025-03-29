import { IoClose } from 'react-icons/io5'
import { MdKeyboardArrowRight } from 'react-icons/md'

export default function NextSideBarBtn({ setShowMobileNav, setIsSideBarOpenStates }) {
    return (
        <div className="w-full bg-white dark:bg-black dark:text-white flex justify-between items-center z-20">
            <button className='flex ' onClick={() => setIsSideBarOpenStates(prev => ({
                ...prev,
                openProfile: false,
                openNotifications: false,
            }))} ><MdKeyboardArrowRight size={25} className='rotate-180' />Back</button>
            <button onClick={() => {
                setShowMobileNav(false), setIsSideBarOpenStates(prev => ({
                    ...prev,
                    openProfile: false,
                    openNotifications: false,
                }))
            }} className='p-2 rounded-full bg-white dark:bg-black dark:text-white hover:bg-slate-200 transition-all duration-200 ease-in-out'><IoClose size={20} /></button>
        </div>
    )
}

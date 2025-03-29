import { IoMdClose } from "react-icons/io";


export default function PostModelHeader({ onClose }) {
    return (
        <div className="border-b dark:border-gray-700">
            <div className="px-4 py-3 flex justify-between items-center">
                <h2 className="text-xl font-bold text-center flex-1 dark:text-white">Create Post</h2>
                <button
                    onClick={onClose}
                    className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
                >
                    <IoMdClose size={24} className="dark:text-white" />
                </button>
            </div>
        </div>
    )
}

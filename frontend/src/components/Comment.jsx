import { IoIosArrowDown } from "react-icons/io";
import { AiFillLike } from "react-icons/ai";
import { useState } from "react";


export default function Comment({ comment }) {
    const [showReplies, setShowReplies] = useState(false);



    return (
        <div className="flex flex-col">
            <div className="flex gap-2">
                <img
                    src={comment.profilePic}
                    alt={comment.author}
                    className="w-10 h-10 rounded-full object-cover"
                />
                <div className="flex-1">
                    <div className="flex items-center gap-2">
                        <h4 className="font-medium text-sm dark:text-gray-200">{comment.author}</h4>
                        <span className="text-xs text-gray-500 dark:text-gray-400">{comment.date}</span>
                    </div>
                    <p className="text-sm mt-1 dark:text-gray-300">{comment.content}</p>
                    <div className="flex gap-4 mt-2">
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            <span className="w-4 h-4">
                                <AiFillLike size={16} />
                            </span>
                            {comment.likes}
                        </button>
                        <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                            Reply
                        </button>
                    </div>
                </div>
            </div>

            {comment.replies && comment.replies.length > 0 && (
                <div className="ml-5 mt-2">
                    <button
                        onClick={() => setShowReplies(!showReplies)}
                        className="text-blue-500 flex items-center gap-1 hover:underline text-sm font-medium mb-3 ml-5"
                    >
                        <span
                            className={`transition-transform ${showReplies ? 'rotate-180' : ''}`}
                        >
                            <IoIosArrowDown size={16} />
                        </span>
                        {comment.replies.length} {comment.replies.length === 1 ? 'reply' : 'replies'}
                    </button>

                    {showReplies && (
                        <div className="flex flex-col">
                            {comment.replies.map((reply, index) => (
                                <div key={reply.id} className="relative">
                                    <div className="absolute left-0 top-3 -translate-y-full h-full border-l-2 border-gray-300 dark:border-gray-700"></div>
                                    <div className="absolute left-0 top-4 w-8 border-t-2 border-gray-300 dark:border-gray-700"></div>

                                    <div className="flex gap-3 ml-11 mb-2">
                                        <img
                                            src={reply.profilePic}
                                            alt={reply.author}
                                            className="w-8 h-8 rounded-full object-cover"
                                        />
                                        <div className="flex-1">
                                            <div className="flex items-center gap-2">
                                                <h4 className="font-medium text-sm dark:text-gray-200">{reply.author}</h4>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{reply.date}</span>
                                            </div>
                                            <p className="text-sm mt-1 dark:text-gray-300">{reply.content}</p>
                                            <div className="flex gap-4 mt-2">
                                                <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                                    <span className="w-4 h-4">
                                                        <AiFillLike size={16} />
                                                    </span>
                                                    {reply.likes}
                                                </button>
                                                <button className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300">
                                                    Reply
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                    {index === comment.replies.length - 1 && (
                                        <div className="absolute left-0 -top-1 h-5 border-l-2 border-gray-300 dark:border-gray-700"></div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}






// Profile page, login, signup, etc. nav bar 
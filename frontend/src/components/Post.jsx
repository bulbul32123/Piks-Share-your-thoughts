import { FaRegThumbsUp } from 'react-icons/fa';
import { FaThumbsUp } from "react-icons/fa"
import { CiBookmark } from "react-icons/ci";
import { MdShare } from "react-icons/md";
import { FaBookmark } from "react-icons/fa6";
import { BiCommentDetail } from "react-icons/bi";
import ShareModal from './ShareModal';

export default function Post({ post, isLike, setIsLike, isSave, setIsSave, isReadMore, setIsReadMore, setIsImageViewerOpen, setIsCommentsViewerOpen, isPostOpen, isShareModalOpen, setIsShareModalOpen }) {

    const handleOpenImageViewer = () => {
        if (!isPostOpen) {
            setIsImageViewerOpen(true)
        } else {
            setIsCommentsViewerOpen(true)
        }
    }
    const mood = post.mood

    return (
        <div className="border-[2px] dark:border-[#292828] rounded-lg shadow p-4 mb-4 w-full h-full">
            <div className="flex items-center gap-3">
                <div className={`${isPostOpen && "hidden"} mb-4 flex items-center gap-3`}>
                    <img src={post.profilePic} className="w-10 h-auto md:w-12 md:h-12 object-cover rounded-full object-center" alt={post.author} />
                    <div className="flex flex-col">
                        <p className="font-medium hover:underline pr-1">{post.author} <span className='font-normal text-sm animate-pulse transition-all duration-200
  p-1 rounded-md' style={{backgroundColor: post.color}}>{mood}</span></p>
                        <p className="text-sm text-gray-700 dark:text-gray-400 font-light">{post.date}</p>
                    </div>
                </div>
            </div>

            <pre className="mb-4 font-medium font-sans">{post?.content?.length > 200 && !isReadMore ?
                <p>
                    {
                        post?.content?.slice(0, 200) + "..."
                    }
                    <button className="text-blue-500 hover:underline text-sm font-light pl-2" onClick={() => setIsReadMore(!isReadMore)}>Read More</button>
                </p> :
                <p>{post?.content} {isReadMore && <button className="text-blue-500 underline text-sm font-light pl-2" onClick={() => setIsReadMore(!isReadMore)}>Read less</button>}
                </p>
            }</pre>

            <div className="w-full h-full">
                <div className="flex justify-center items-center w-full h-full">
                    <img src={post?.postimg} className={`w-full object-cover rounded-xl object-center ${isPostOpen ? "cursor-default h-full" : "cursor-pointer max-h-[27rem]"}`} alt={post?.content} onClick={handleOpenImageViewer} />
                </div>
            </div>

            <div className="flex justify-between gap-4 text-gray-600 dark:text-gray-200 mt-2 mx-2">
                <div className="flex gap-4">

                    <button className="flex items-center gap-2 px-2 py-1 rounded hover:text-green-500 " onClick={() => setIsLike(!isLike)}>
                        {isLike ? (
                            <FaThumbsUp size={20} />
                        ) : (
                            <FaRegThumbsUp size={20} />
                        )}
                        {post.likes}
                    </button>


                    <button className="flex items-center gap-2 px-2 py-1 rounded hover:text-blue-500" onClick={() => setIsCommentsViewerOpen(true)}>
                        <BiCommentDetail size={20} /> {post.comments}
                    </button>

                    <button
                        className="flex items-center py-1 rounded hover:text-blue-500"
                        onClick={() => setIsShareModalOpen(true)}
                    >
                        <MdShare size={20} />
                    </button>
                </div>

                <button className="flex items-center gap-2 px-2 py-1 rounded hover:text-green-500 " onClick={() => setIsSave(!isSave)}>
                    {!isSave ? (
                        <CiBookmark size={20} />
                    ) : (
                        <FaBookmark size={20} />
                    )}
                </button>

            </div>

            <ShareModal
                isOpen={isShareModalOpen}
                onClose={() => setIsShareModalOpen(false)}
                postUrl={window.location.href}
            />
        </div>
    )
}

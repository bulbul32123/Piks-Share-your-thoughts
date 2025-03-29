
export default function ImageViewer({ post, isImageViewerOpen, setIsImageViewerOpen }) {
    return (
        <div className={`relative z-10 ${isImageViewerOpen ? 'block' : 'hidden'}`}>
            <div className="fixed inset-0 bg-gray-500/75 transition-opacity" aria-hidden="true"></div>

            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <button className="absolute top-2 right-3 p-4 text-white" onClick={() => setIsImageViewerOpen(false)}>Close</button>
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">

                    <div className="relative transform overflow-hidden  bg-white text-left shadow-xl my-5 transition-all">
                        <img src={post?.postimg} alt={post.author} className="w-full max-h-[30rem] md:max-h-[38rem] object-cover" />
                    </div>
                </div>
            </div>
        </div>
    )
}

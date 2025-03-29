import { useEffect, useRef, useState } from "react";
import Post from "./Post";
import SortDropDown from "./SortDropDown";
import Comment from "./Comment";
import CommentBox from "./CommentBox";
import { useClickOutside } from "../hooks/useClickOutside";


export default function CommentsViewer({ post, isLike, setIsLike, isSave, setIsSave, isReadMore, setIsReadMore, setIsImageViewerOpen, setIsCommentsViewerOpen, isCommentsViewerOpen, isShareModalOpen, setIsShareModalOpen }) {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [comment, setComment] = useState('');
    const ress = useClickOutside(setIsDropdownOpen, isDropdownOpen)

    const commentViewerRef = useRef(null);
    const textareaRef = useRef(null);

    const comments = [
        {
            id: 2,
            author: 'Jane Smith',
            profilePic: '/user3.jpg',
            content: 'Very informative, I learned a lot from this.',
            date: '1 day ago',
            likes: 15,
            replies: [
                {
                    id: 21,
                    author: 'Alex Johnson',
                    profilePic: '/user4.jpg',
                    content: 'Totally agree with your point!',
                    date: '2 days ago',
                    replies: [
                        {
                            id: 34,
                            author: 'Jane',
                            profilePic: '/user3.jpg',
                            content: 'Totally agree with your point!',
                            date: '2 days ago',
                            likes: 5,
                        },
                        // More replies...
                    ],
                    likes: 5,
                },
                // More replies...
            ],
        },
        {
            id: 3,
            author: 'Mickael',
            profilePic: '/user6.jpg',
            date: "1 Week ago",
            likes: 1,
            content: 'I love this post!',
            replies: [{
                id: 13434,
                author: "Alex Johnson",
                profilePic: "/user4.jpg",
                content: "Also Me",
                date: "2 days ago",
                likes: 2,
            },],
            postimg: "/postimg4.jpeg",
        },
        {
            id: 7,
            author: 'Ritu',
            content: 'Life of a Programmer',
            profilePic: '/user3.jpg',
            date: "1 month ago",
            likes: 22,
            replies: [{
                id: 2,
                author: "Sarah Williams",
                profilePic: "/user5.jpg",
                content: "Great perspective on this!",
                date: "1 day ago",
                likes: 3,
            },
            {
                id: 1,
                author: "Alex Johnson",
                profilePic: "/user4.jpg",
                content: "Hmmmm",
                date: "2 days ago",
                likes: 3,
            },
            {
                id: 2,
                author: "Johnson Dev",
                profilePic: "/user6.jpg",
                content: "Not Sure",
                date: "3 days ago",
                likes: 2,
            },
            {
                id: 231,
                author: "Web devs",
                profilePic: "/user2.jpg",
                content: "Me too",
                date: "4 days ago",
                likes: 2,
            },
            {
                id: 23431,
                author: "Web developer",
                profilePic: "/user3.jpg",
                content: "Not me",
                date: "5 days ago",
                likes: 1,
            },
            {
                id: 24331,
                author: "can't",
                profilePic: "/user2.jpg",
                content: "Me too",
                date: "4 days ago",
                likes: 2,
            },
            ],
            postimg: "/postimg2.jpg",
        },
        {
            id: 4,
            author: 'Rana',
            content: 'Good Job!',
            profilePic: '/user7.jpg',
            date: "3 weeks ago",
            likes: 4,
            replies: [],
            postimg: "/postimg3.jpg",
        },
        {
            id: 5,
            author: 'Yohanna',
            content: 'That was a great post!',
            profilePic: '/user4.jpg',
            date: "3 days ago",
            likes: 12,
            replies: [{
                id: 231,
                author: "Web devs",
                profilePic: "/user2.jpg",
                content: "Me too",
                date: "4 days ago",
                likes: 2,
            },
            {
                id: 23431,
                author: "Web developer",
                profilePic: "/user3.jpg",
                content: "Not me",
                date: "5 days ago",
                likes: 1,
            },],
            postimg: "/postimg5.jpg",
        },
        // Add more comments as needed
    ];


    const sortOptions = [
        { id: 1, label: 'Most Recent' },
        { id: 2, label: 'Most Liked' },
        { id: 3, label: 'Oldest First' }
    ];

    // Auto-resize textarea
    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`; // Max height of 200px
        }
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
        adjustTextareaHeight();
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            // Handle comment submission here
            console.log('Comment submitted:', comment);
            setComment('');
            // Reset textarea height
            if (textareaRef.current) {
                textareaRef.current.style.height = 'auto';
            }
        }
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (isShareModalOpen) {
                return; // Don't handle CommentViewer clicks when ShareModal is open
            }
            if (commentViewerRef.current &&
                !commentViewerRef.current.contains(event.target)) {
                setIsCommentsViewerOpen(false);
            }
        }

        if (isCommentsViewerOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isCommentsViewerOpen, setIsCommentsViewerOpen, isShareModalOpen]);

    // Handle clicking outside emoji picker

    return (
        <div className={`relative z-10 ${isCommentsViewerOpen ? 'block' : 'hidden'}`}>
            {/* Overlay - Outside the ref */}
            <div
                className="fixed inset-0 z-[10] bg-gray-500/75 transition-opacity"
                onClick={(e) => {
                    e.stopPropagation();
                    if (!isShareModalOpen) { // Only close if ShareModal is not open
                        setIsCommentsViewerOpen(false);
                    }
                }}
            ></div>

            {/* Content Container */}
            <div className="fixed left-0 z-[11] top-0 w-full h-full">
                <div className="flex justify-center items-center h-full py-6">
                    {/* Comment Viewer Content - Apply ref here */}
                    <div
                        ref={commentViewerRef}
                        className="w-full md:w-[40rem] bg-white dark:bg-black h-full pt-6 pb-40 rounded-xl relative"
                    >
                        <div className="flex w-full justify-between items-start px-5 pb-5">
                            <div className="flex gap-3 w-full ">
                                <img src={post.profilePic} className="w-10 h-auto md:w-12 md:h-12 object-cover rounded-full object-center" alt={post.author} />
                                <div className="flex flex-col">
                                    <p className="font-medium hover:underline ">{post.author}</p>
                                    <p className="text-sm text-gray-700 dark:text-gray-400 font-light">{post.date}</p>
                                </div>
                            </div>
                            <button className="text-black dark:text-gray-300" onClick={() => setIsCommentsViewerOpen(false)}>Close</button>
                        </div>
                        <div className="w-full h-full overflow-y-auto px-4">
                            <div className="">
                                <Post post={post} isLike={isLike} setIsLike={setIsLike} isSave={isSave} setIsSave={setIsSave} isReadMore={isReadMore} setIsReadMore={setIsReadMore} setIsImageViewerOpen={setIsImageViewerOpen} setIsCommentsViewerOpen={setIsCommentsViewerOpen} isPostOpen={true} isShareModalOpen={isShareModalOpen} setIsShareModalOpen={setIsShareModalOpen} />
                            </div>

                            <div className="mt-3 px-1">
                                <div className="flex justify-between items-center">
                                    <h4>{post.comments} Comments</h4>
                                    <SortDropDown ref={ress} lists={sortOptions} isDropdownOpen={isDropdownOpen} setIsDropdownOpen={setIsDropdownOpen} />
                                </div>
                                <div className="mt-8 flex flex-col gap-6 mb-10">
                                    {comments.map(comment => (
                                        <Comment key={comment.id} comment={comment} />
                                    ))}
                                </div>
                            </div>

                        </div>
                        <CommentBox comment={comment} handleCommentChange={handleCommentChange} handleCommentSubmit={handleCommentSubmit} textareaRef={textareaRef} />
                    </div>
                </div>
            </div>
        </div>
    )
}



// Comment Section of the post detail






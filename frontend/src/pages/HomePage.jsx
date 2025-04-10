import { useEffect, useState } from 'react';
import PostCard from '../components/PostCard';

export default function HomePage({setIsWritePostModalOpen }) {

    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setPosts(data); 
        };
        fetchPosts();
    }, []);

  

    return (
            <div className="h-full w-full bg-transparent">
                <div className="flex gap-4 items-center w-full dark:bg-[#1a1a1a] pb-7 pt-2">
                    <div className="">
                        <img src="/pic.jpg" alt="logo" className="w-10 h-10 rounded-full" />
                    </div>
                    <div className="w-full md:flex items-center bg-gray-100 dark:bg-gray-700 p-2 rounded-lg">
                        <input
                            type="text"
                            placeholder="Write a Post!"
                            onClick={() => setIsWritePostModalOpen(true)}
                            className="bg-transparent ml-2 w-full outline-none"
                        />
                    </div>
                </div>
                <div className="">
                    {posts.map(post => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </div>
            </div>
    );
}
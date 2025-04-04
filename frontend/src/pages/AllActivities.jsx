import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PostCard from "../components/PostCard";

export default function AllActivities() {
    const { user, type } = useParams();
    const [sort, setSort] = useState("recent");
    const [sortOpen, setSortOpen] = useState(false);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch('http://localhost:5000/api/users');
            const data = await response.json();
            setPosts(data);
        };
        fetchPosts();
    }, []);



    const tabs = [
        {
            name: "posts",
        },
        {
            name: "comments",
        },
        {
            name: "likes",
        },
        {
            name: "medias",
        },

    ]
    return (
        <div className="w-full h-full flex flex-col">
            <div className="flex justify-between flex-col w-full">
                <h1 className="text-2xl font-bold">Recent Activities</h1>
                <div className="flex gap-4 items-center py-4 pr-2 mt-3">
                    {tabs.map((tab, index) => (
                        <Link to={`/${user}/recent-activities/${tab.name}`} className={`py-1.5 px-4 font-light rounded-3xl border-[1.5px] text-sm text-gray-200 cursor-pointer dark:border-light border-black capitalize ${type === tab.name && "bg-white !text-black"}`} key={index}>{tab.name}</Link>
                    ))}
                </div>
                {type === "posts" &&
                    <div className="relative">
                        <div className="flex relative w-full mb-2 justify-end z-20">
                            <button className="text-sm text-gray-200 cursor-pointer dark:border-light border-black capitalize" onClick={() => setSortOpen(!sortOpen)}>Sort by: {sort}</button>
                            <div className={`flex flex-col bg-white dark:bg-dark dark:!text-white !text-black py-3 top-8 right-0 rounded-lg gap-2 absolute w-[9rem] h-[9.8rem] mb-4 ${sortOpen ? "block" : "hidden"}`}>
                                <span onClick={() => { setSort("recent"); setSortOpen(false) }} className={`text-sm py-1 px-3 cursor-pointer dark:border-light capitalize ${sort === "recent" && "bg-white !text-black"}`}>Recent</span>
                                <span onClick={() => { setSort("oldest"); setSortOpen(false) }} className={`text-sm py-1 px-3 cursor-pointer dark:border-light border-black capitalize ${sort === "oldest" && "bg-white !text-black"}`}>Oldest</span>
                                <span onClick={() => { setSort("most Likes"); setSortOpen(false) }} className={`text-sm py-1 px-3 cursor-pointer dark:border-light border-black capitalize ${sort === "most Likes" && "bg-white !text-black"}`}>Most likes</span>
                                <span onClick={() => { setSort("most Comments"); setSortOpen(false) }} className={`text-sm py-1 px-3 cursor-pointer dark:border-light border-black capitalize ${sort === "most Comments" && "bg-white !text-black"}`}>Most comments</span>
                            </div>
                        </div>
                        <div className=" relative">
                            {
                                posts.slice(0, 3).map((post) => (
                                    <PostCard key={post.id} post={post} />
                                ))
                            }
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

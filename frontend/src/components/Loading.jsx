import Logo from "./Logo";

export const Loading = () => {
    return (
        <div className="flex items-center justify-center bg-white dark:bg-black fixed z-50 top-0 left-0 h-screen w-screen">
            <div className="flex flex-col">
                <Logo dark={true} size={true}/>
            <div className=" mt-2 ml-2">
                <span className="text-black dark:text-white text-2xl font-bold">PiKs</span>
            </div>
            </div>
        </div>
    );
};

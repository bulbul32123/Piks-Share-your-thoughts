
export default function SortDropDown({ ref, lists, isDropdownOpen, setIsDropdownOpen }) {
    return (
        <div className="relative" ref={ref}>
            <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="text-black dark:text-gray-300 flex items-center gap-2"
            >
                Sort by
                <svg
                    className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700">
                    {lists?.map((option) => (
                        <button
                            key={option.id}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                            onClick={() => {
                                // Add sort logic here
                                setIsDropdownOpen(false);
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}

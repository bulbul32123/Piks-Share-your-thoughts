import { BsEmojiSmile } from "react-icons/bs";
import { FaImage, FaRobot } from "react-icons/fa";
import { MdColorLens } from "react-icons/md";

export default function PostOptions({ fileInputRef, handleFileSelect, setShowFormatting, showFormatting, setShowColorPicker, showColorPicker, setPostText, postText, textareaRef }) {
    return (
        <div className="px-4 border-t dark:border-gray-700">
            <div className="pb-2 pt-1">
                <div className="flex items-center justify-between">
                    <p className="font-medium text-sm dark:text-white">Add to your post</p>
                    <div className="flex gap-2">
                        <button
                            onClick={() => fileInputRef.current.click()}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            title="Photo/Video"
                        >
                            <FaImage className="text-green-500" size={20} />
                        </button>

                        <button
                            onClick={() => {
                                setShowFormatting(!showFormatting);
                                setShowColorPicker(false);
                            }}
                            className={`p-2 rounded-full transition ${showFormatting ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            title="Emoji"
                            data-emoji-button="true"
                        >
                            <BsEmojiSmile className={showFormatting ? 'text-blue-500' : 'text-yellow-500'} size={20} />
                        </button>

                        <button
                            onClick={() => {
                                setShowColorPicker(!showColorPicker);
                                setShowFormatting(false);
                            }}
                            className={`p-2 rounded-full transition ${showColorPicker ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700'
                                }`}
                            title="Background Color"
                        >
                            <MdColorLens className={showColorPicker ? 'text-blue-500' : 'text-pink-500'} size={22} />
                        </button>

                        {/* AI Helper Button - an alternative way to trigger AI */}
                        <button
                            onClick={() => {
                                const aiText = "#Ai Tell me an interesting fact";
                                setPostText(prevText => prevText + (prevText.length > 0 && !prevText.endsWith(' ') ? ' ' : '') + aiText);
                                // Focus on textarea after adding command
                                setTimeout(() => {
                                    if (textareaRef.current) {
                                        textareaRef.current.focus();
                                        const position = postText.length + aiText.length;
                                        textareaRef.current.selectionStart = position;
                                        textareaRef.current.selectionEnd = position;
                                    }
                                }, 0);
                            }}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                            title="AI Assistant"
                        >
                            <FaRobot className="text-blue-500" size={20} />
                        </button>
                    </div>
                </div>
            </div>
            <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                multiple
                accept="image/*,video/*"
                className="hidden"
            />
        </div>
    )
}

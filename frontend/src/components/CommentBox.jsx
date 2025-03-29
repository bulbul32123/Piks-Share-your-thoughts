import { useEffect, useRef, useState } from 'react';
import { IoIosHappy, IoIosSend, IoMdImage } from 'react-icons/io';
import EmojiPicker from 'emoji-picker-react';

export default function CommentBox({ comment, handleCommentChange, handleCommentSubmit, textareaRef }) {
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);
    const emojiButtonRef = useRef(null);
    const emojiPickerRef = useRef(null);

    // Handle emoji selection
    const handleEmojiSelect = (emojiObject) => {
        const textarea = textareaRef.current;
        const start = textarea.selectionStart;
        const end = textarea.selectionEnd;
        const text = textarea.value;
        const newText = text.substring(0, start) + emojiObject.emoji + text.substring(end);

        // Update the textarea value directly
        textarea.value = newText;

        // Trigger the onChange event manually
        const event = {
            target: {
                value: newText
            }
        };
        handleCommentChange(event);

        // Set cursor position after emoji
        setTimeout(() => {
            textarea.selectionStart = textarea.selectionEnd = start + emojiObject.emoji.length;
            textarea.focus();
        }, 0);
    };

    // Handle clicking outside emoji picker
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (emojiPickerRef.current &&
                !emojiPickerRef.current.contains(event.target) &&
                !emojiButtonRef.current.contains(event.target)) {
                setShowEmojiPicker(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="absolute bottom-0 left-0 right-0 bg-white dark:bg-black border-t dark:border-gray-800 p-4">
            <form onSubmit={handleCommentSubmit} className="flex gap-3">
                <img
                    src="/pic.jpg"
                    className="w-10 h-10 rounded-full object-cover"
                    alt="User avatar"
                />
                <div className="flex-1">
                    <div className="relative bg-gray-100 dark:bg-gray-800 rounded-2xl p-2">
                        <textarea
                            ref={textareaRef}
                            value={comment}
                            onChange={handleCommentChange}
                            placeholder="Write a comment..."
                            rows="1"
                            className="w-full bg-transparent outline-none resize-none text-sm dark:text-gray-200 min-h-[20px] max-h-[200px] pt-2 px-3 "
                            style={{
                                overflow: 'hidden',
                            }}
                        />
                        <div className="flex items-center justify-between px-2 pt-1">
                            <div className="relative">
                                <button
                                    type="button"
                                    ref={emojiButtonRef}
                                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <IoIosHappy size={20} />
                                </button>
                                {showEmojiPicker && (
                                    <div
                                        ref={emojiPickerRef}
                                        className="absolute bottom-20 left-0 z-50"
                                    >
                                        <div className="shadow-lg rounded-lg">
                                            <EmojiPicker
                                                onEmojiClick={handleEmojiSelect}
                                                theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                                                searchDisabled
                                                skinTonesDisabled
                                                width={300}
                                                height={400}
                                            />
                                        </div>
                                    </div>
                                )}
                                <button
                                    type="button"
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
                                >
                                    <IoMdImage size={20} />
                                </button>
                            </div>

                            <button
                                type="submit"
                                className={`text-blue-500 hover:text-blue-600 font-semibold p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 ${comment.trim() ? 'opacity-100' : 'opacity-50'}`}
                                disabled={!comment.trim()}
                            >
                                <IoIosSend size={20} />
                            </button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
}

import { useState, useRef, useEffect } from 'react'
import { FaRegCalendarAlt } from 'react-icons/fa';
import { HiLockClosed, HiGlobeAlt, HiUserGroup } from 'react-icons/hi';
import { FaRobot } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import ColorPicker from './ColorPicker';
import PostOptions from './PostOptions';
import ImagePreviews from './ImagePreviews';
import ScheduleSelector from './ScheduleSelector';
import PrivacyOptions from './PrivacyOptions';
import PostModelHeader from './PostModelHeader';
import { useClickOutside } from '../../hooks/useClickOutside';
import { usePreventScroll } from '../../hooks/usePreventScroll';

const MAX_CHARS = 1000;
const bgColors = [
  { text: "None", color: "", label: "None" },
  { text: "#333333", color: "#FFD700", status: "😊 Happy", label: "Yellow" },
  { text: "#000000", color: "#FFEBEE", status: "❤️ Love", label: "Pink" },
  { text: "#000000", color: "#E8F5E9", status: "💪 Confident", label: "Green" },
  { text: "#ffffff", color: "#5000f0", status: "😲 Surprised ", label: "Purple" },
  { text: "#333333", color: "#87CEEB", status: "😌 Calm", label: "Light Blue" },
  { text: "#FFFFFF", color: "#2C3E50", status: "😨 Fearful", label: "Dark Gray" },
  { text: "#000000", color: "#E9F3FF", status: "Sad 😢", label: "Blue" },
];

const WritePostModal = ({ isOpen, onClose, aiResponse, setAiResponse, setShowAiResponse, isLoadingAiResponse, showAiResponse, setIsWritePostModalOpen, fetchAiResponse }) => {
  const [postText, setPostText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [privacy, setPrivacy] = useState('public');
  const [showPrivacyOptions, setShowPrivacyOptions] = useState(false);
  const [selectedBgColor, setSelectedBgColor] = useState({});
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showFormatting, setShowFormatting] = useState(false);
  const [hashtags, setHashtags] = useState([]);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduledTime, setScheduledTime] = useState('');
  const [characterCount, setCharacterCount] = useState(0);

  // AI chat feature states
  const [aiQuestion, setAiQuestion] = useState('');

  const fileInputRef = useRef(null);
  const dragAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);


  // Preview images
  const filePreviewUrls = selectedFiles.map(file => URL.createObjectURL(file));

  // Auto-resize textarea function
  const autoResizeTextarea = () => {
    if (textareaRef.current) {
      // Reset height to auto to get the correct scrollHeight
      textareaRef.current.style.height = 'auto';
      // Set the height based on content
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent newline in textarea

      const trimmedText = postText.trim();
      if (trimmedText.startsWith("#AI")) {
        const question = trimmedText.replace("#AI", "").trim();
        console.log("Question:", question);

        if (!question) {
          alert("Please write a question after #AI.");
          return;
        }

        setAiQuestion(question);
        fetchAiResponse(question);
      }
    }
  };



  // Insert AI response into textarea
  const insertAiResponse = () => {
    if (!aiResponse) return;
    console.log("Inserting AI response:", aiResponse);

    // Replace the #Ai command with the response
    const newText = postText.replace(/#Ai\s+.+$/, aiResponse);
    setPostText(newText);

    // Reset AI states
    setAiQuestion('');
    setAiResponse('');
    setShowAiResponse(false);
  };


  // Handle emoji selection
  const onEmojiClick = (emojiData) => {
    if (textareaRef.current) {
      const emoji = emojiData.emoji;
      const textarea = textareaRef.current;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText = postText.substring(0, start) + emoji + postText.substring(end);
      setPostText(newText);

      // Set cursor position after emoji
      setTimeout(() => {
        textarea.focus();
        textarea.selectionStart = textarea.selectionEnd = start + emoji.length;
      }, 0);
    } else {
      // If textarea ref not available, append to the end
      setPostText(prev => prev + emojiData.emoji);
    }
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emojiPickerRef.current && !emojiPickerRef.current.contains(event.target) &&
        showFormatting && !event.target.closest("[data-emoji-button]")) {
        setShowFormatting(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showFormatting]);


  // In your main effect that watches postText, call the debounced function
  useEffect(() => {
    // Update character count
    setCharacterCount(postText.length);

    // Auto-resize textarea when content changes
    autoResizeTextarea();

    // Use debounced check for AI command

    // Extract hashtags from text
    const regex = /#(\w+)/g;
    const matches = postText.match(regex) || [];
    setHashtags(matches);

    // Setup drag and drop
    const dragArea = dragAreaRef.current;
    if (dragArea) {
      const handleDragOver = (e) => {
        e.preventDefault();
        dragArea.classList.add('bg-blue-50', 'dark:bg-blue-900/20');
      };

      const handleDragLeave = () => {
        dragArea.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');
      };

      const handleDrop = (e) => {
        e.preventDefault();
        dragArea.classList.remove('bg-blue-50', 'dark:bg-blue-900/20');

        if (e.dataTransfer.files) {
          const filesArray = Array.from(e.dataTransfer.files);
          const imageFiles = filesArray.filter(file =>
            file.type.startsWith('image/') || file.type.startsWith('video/')
          );
          setSelectedFiles(prev => [...prev, ...imageFiles]);
        }
      };

      dragArea.addEventListener('dragover', handleDragOver);
      dragArea.addEventListener('dragleave', handleDragLeave);
      dragArea.addEventListener('drop', handleDrop);

      return () => {
        dragArea.removeEventListener('dragover', handleDragOver);
        dragArea.removeEventListener('dragleave', handleDragLeave);
        dragArea.removeEventListener('drop', handleDrop);
      };
    }
  }, [postText]);

  // Initialize textarea height on mount
  useEffect(() => {
    if (isOpen && textareaRef.current) {
      // Set a small delay to ensure the textarea is rendered
      setTimeout(() => {
        autoResizeTextarea();
      }, 0);
    }
  }, [isOpen]);

  const handleFileSelect = (e) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setSelectedFiles(prev => [...prev, ...filesArray]);
    }
  };

  const removeFile = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Gather all data for the post
    const postData = {
      text: postText,
      privacy: privacy,
      media: selectedFiles,
      selectedBgColor: selectedBgColor,
      hashtags: hashtags,
      scheduledTime: scheduledTime || null
    };

    // Here you would send the data to your backend
    console.log('Post data:', postData);

    // Reset form
    setPostText('');
    setSelectedFiles([]);
    setPrivacy('public');
    setSelectedBgColor({});
    setHashtags([]);
    setScheduledTime('');
    setAiQuestion('');
    setAiResponse('');
    setShowAiResponse(false);

    // Close modal
    onClose();
  };

  const privacyOptions = [
    { value: 'public', label: 'Public', icon: <HiGlobeAlt className="text-green-500" /> },
    { value: 'friends', label: 'Friends only', icon: <HiUserGroup className="text-blue-500" /> },
    { value: 'private', label: 'Only me', icon: <HiLockClosed className="text-gray-500" /> }
  ];
  const ref = useClickOutside(setIsWritePostModalOpen, isOpen)
  usePreventScroll(isOpen)
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-hidden ">
      <div className="bg-white relative dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col animate-scale-in my-8" ref={ref}>
        {/* Header */}
        <PostModelHeader onClose={onClose} />

        {/* User info */}
        <div className="px-4 py-1 flex items-center gap-3">
          <img src="/pic.jpg" className="w-10 h-10 rounded-full" alt="User" />
          <div className="flex-1">
            <p className="font-medium dark:text-white">John Doe</p>

            {/* Privacy selector */}
            <div className="relative">
              <button
                onClick={() => setShowPrivacyOptions(!showPrivacyOptions)}
                className="flex items-center gap-1 text-xs px-2 py-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 dark:text-white"
              >
                {privacyOptions.find(option => option.value === privacy).icon}
                <span>{privacyOptions.find(option => option.value === privacy).label}</span>
              </button>

              {showPrivacyOptions && (
                <PrivacyOptions privacyOptions={privacyOptions} setPrivacy={setPrivacy} setShowPrivacyOptions={setShowPrivacyOptions} />
              )}
            </div>
          </div>

          {/* Schedule post */}
          <button
            onClick={() => setShowSchedule(!showSchedule)}
            className={`p-2 rounded-full transition ${scheduledTime ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400'}`}
            title="Schedule post"
          >
            <FaRegCalendarAlt size={18} />
          </button>
        </div>

        {/* Schedule selector */}
        {showSchedule && (
          <ScheduleSelector scheduledTime={scheduledTime} setScheduledTime={setScheduledTime} />
        )}

        {/* Main scrollable content area */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          <div ref={dragAreaRef} className={`px-4 pt-2 transition-colors flex-1 overflow-hidden flex flex-col`}>
            <div
              className={`rounded-lg ${selectedBgColor.color ? 'p-3' : 'p-1'} flex-1 overflow-hidden flex flex-col !text-[#000000]`}
              style={{ backgroundColor: selectedBgColor.color }}
            >
              {/* Single scrollable container for both text and images */}
              <div className="flex-1 overflow-y-auto">
                {/* Auto-expanding textarea */}
                <textarea
                  ref={textareaRef}
                  placeholder="What's on your mind, John? Try typing #Ai followed by a question!"
                  value={postText}
                  onKeyDown={handleKeyDown}
                  onChange={(e) => setPostText(e.target.value)}
                  className={`w-full border-none outline-none resize-none ${selectedBgColor.color ? 'bg-transparent' : 'dark:bg-gray-800'
                    } dark:text-white`}
                  maxLength={MAX_CHARS}
                  style={{ minHeight: '50px', overflow: 'hidden', color: selectedBgColor.text }}
                />

                {/* AI Response UI */}
                {showAiResponse && (
                  <div className="mt-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center gap-2 mb-2">
                      <FaRobot className="text-blue-600 dark:text-blue-400" size={18} />
                      <h3 className="font-medium text-blue-800 dark:text-blue-300">AI Response</h3>
                    </div>

                    {isLoadingAiResponse ? (
                      <div className="flex flex-col items-center justify-center py-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">Generating response...</p>
                      </div>
                    ) : (
                      <>
                        <div className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-line">
                          {aiResponse}
                        </div>
                        <div className="mt-3 flex justify-end">
                          <button
                            onClick={insertAiResponse}
                            className="px-3 py-1 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition"
                          >
                            Insert Response
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}

                {/* AI Helper Tip - only show when no AI response is being displayed */}
                {!showAiResponse && !aiQuestion && (
                  <div className="mt-2 text-center py-2 text-xs text-blue-500 dark:text-blue-400 italic flex items-center justify-center gap-1">
                    <FaRobot size={14} />
                    <span>Type #Ai followed by a question to get AI assistance</span>
                  </div>
                )}

                {/* Image previews directly below text */}
                {filePreviewUrls.length > 0 && (
                  <ImagePreviews filePreviewUrls={filePreviewUrls} removeFile={removeFile} />
                )}

                {/* Drag & drop area */}
                {filePreviewUrls.length === 0 && !showAiResponse && (
                  <div className="mt-2 text-center py-2 text-xs text-gray-500 dark:text-gray-400 italic">
                    Drag and drop images here
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Hashtags - Outside the scrollable area */}
          <div className="px-4 pb-2 flex justify-end items-start">
            {/* Character count */}
            <div className="flex justify-end">
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {characterCount}/{MAX_CHARS}
                <div className="w-14 h-1 bg-gray-200 dark:bg-gray-700 rounded-full mt-1 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${characterCount > MAX_CHARS * 0.8 ? 'bg-red-500' : 'bg-blue-500'}`}
                    style={{ width: `${(characterCount / MAX_CHARS) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Emoji picker */}
        {showFormatting && (
          <div className="px-4 pb-2 absolute bottom-24 -right-6" ref={emojiPickerRef}>
            <div className="emoji-picker-container relative">
              <EmojiPicker
                onEmojiClick={onEmojiClick}
                autoFocusSearch={false}
                lazyLoadEmojis={true}
                searchPlaceHolder="Search emojis..."
                width=""
                height="20rem"
                searchDisabled={true} // Disable search bar
                skinTonesDisabled={true} // Disable skin tone selection if not needed
                suggestedEmojisMode={false}
                theme={document.documentElement.classList.contains('dark') ? 'dark' : 'light'}
                emojiStyle="facebook"
              />
            </div>
          </div>
        )}

        {/* Color picker */}
        {showColorPicker && (
          <ColorPicker setSelectedBgColor={setSelectedBgColor} setShowColorPicker={setShowColorPicker} selectedBgColor={selectedBgColor} bgColors={bgColors} />
        )}

        {/* Add to post options */}
        <PostOptions fileInputRef={fileInputRef} handleFileSelect={handleFileSelect} setShowFormatting={setShowFormatting} showFormatting={showFormatting} setShowColorPicker={setShowColorPicker} showColorPicker={showColorPicker} setPostText={setPostText} postText={postText} textareaRef={textareaRef} />

        {/* Post button */}
        <div className="px-4 pb-3">
          <button
            onClick={handleSubmit}
            disabled={!postText.trim() && selectedFiles.length === 0}
            className={`w-full py-2 rounded-lg font-medium transition
                            ${(!postText.trim() && selectedFiles.length === 0)
                ? 'bg-gray-200 text-gray-500 dark:bg-gray-700 dark:text-gray-400 cursor-not-allowed'
                : 'bg-blue-500 text-white hover:bg-blue-600'
              }`}
          >
            {scheduledTime ? 'Schedule Post' : 'Post Now'}
          </button>
        </div>
      </div>
    </div>
  );
};


export default WritePostModal; 
import { useState, useRef, useEffect, useCallback } from 'react';
import { IoMdClose } from 'react-icons/io';
import { FaImage, FaRegCalendarAlt } from 'react-icons/fa';
import { BsEmojiSmile } from 'react-icons/bs';
import { HiLockClosed, HiGlobeAlt, HiUserGroup } from 'react-icons/hi';
import { MdColorLens } from 'react-icons/md';
import { FaRobot } from 'react-icons/fa';
import EmojiPicker from 'emoji-picker-react';
import axios from 'axios';
import PropTypes from 'prop-types';

// OpenAI API configuration
// For demo purposes, you can set the API key directly here (but don't commit with real key!)
// In production, use proper environment variable handling
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY || import.meta.env.REACT_APP_OPENAI_API_KEY || ""; // Try both prefixes
const OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
const OPENAI_MODEL = "gpt-3.5-turbo";

const WritePostModal = ({ isOpen, onClose }) => {
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
  const MAX_CHARS = 1000;

  // AI chat feature states
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [isLoadingAiResponse, setIsLoadingAiResponse] = useState(false);
  const [showAiResponse, setShowAiResponse] = useState(false);

  const [debouncedQuestion, setDebouncedQuestion] = useState('');

  const fileInputRef = useRef(null);
  const dragAreaRef = useRef(null);
  const textareaRef = useRef(null);
  const emojiPickerRef = useRef(null);

  // Background color options
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

  // Helper function for mock responses when API is unavailable
  const generateMockResponse = async (question) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock response based on question content
    let response;
    if (question.toLowerCase().includes('weather')) {
      response = "Today's weather is sunny with a high of 75°F. Perfect day to go outside!";
    } else if (question.toLowerCase().includes('recipe')) {
      response = "Here's a quick pasta recipe:\n- 8oz pasta\n- 2 cloves garlic\n- 2 tbsp olive oil\n- Salt and pepper to taste\n\nCook pasta according to package. Sauté garlic in oil. Combine and season.";
    } else if (question.toLowerCase().includes('joke')) {
      response = "Why don't scientists trust atoms? Because they make up everything!";
    } else if (question.toLowerCase().includes('fact')) {
      response = "Did you know? Honey never spoils. Archaeologists have found pots of honey in ancient Egyptian tombs that are over 3,000 years old and still perfectly good to eat.";
    } else {
      response = `I've analyzed your question about "${question}" and here's what I found: This is a fascinating topic! Based on current research, there are multiple perspectives to consider. Some experts suggest approaching it by first understanding the fundamentals, while others recommend a more practical approach.`;
    }

    return response;
  };

  // Fetch response from ChatGPT API
  const fetchAiResponse = async (question) => {
    console.log("Fetching response for:", question);
    setIsLoadingAiResponse(true);
    setShowAiResponse(true);

    try {
      // Check if API key is available
      if (!OPENAI_API_KEY) {
        console.warn("OpenAI API key not configured - falling back to mock responses");
        const mockResponse = await generateMockResponse(question);
        setAiResponse(mockResponse);
        return;
      }

      // Real API call to OpenAI
      const response = await axios.post(
        OPENAI_API_URL,
        {
          model: OPENAI_MODEL,
          messages: [
            { role: "system", content: "You are a helpful assistant providing concise answers. Keep responses under 150 words when possible." },
            { role: "user", content: question }
          ],
          max_tokens: 300,
          temperature: 0.7,
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`
          }
        }
      );

      // Extract response from ChatGPT
      const aiResponse = response.data.choices[0]?.message?.content ||
        "Sorry, I couldn't generate a response. Please try again.";

      console.log("ChatGPT response received:", aiResponse.substring(0, 50) + "...");
      setAiResponse(aiResponse);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);

      if (error.response) {
        // The request was made and the server responded with a status code outside of 2xx range
        console.error("API response status:", error.response.status);
        console.error("API response data:", error.response.data);

        if (error.response.status === 401) {
          setAiResponse("Authentication error: Please check your API key.");
        } else if (error.response.status === 429) {
          setAiResponse("Rate limit exceeded: Too many requests to the OpenAI API. Please try again later.");
        } else {
          setAiResponse(`Error from OpenAI API: ${error.response.data.error?.message || "Unknown error"}`);
        }
      } else if (error.request) {
        // The request was made but no response was received
        setAiResponse("Network error: Couldn't reach the OpenAI API. Please check your internet connection.");
      } else {
        // Something happened in setting up the request
        setAiResponse("An error occurred while setting up the request to OpenAI.");
      }

      // Fall back to mock response if appropriate
      if (!OPENAI_API_KEY) {
        try {
          const mockResponse = await generateMockResponse(question);
          setAiResponse(mockResponse);
        } catch (mockError) {
          console.error("Error generating mock response:", mockError);
        }
      }
    } finally {
      setIsLoadingAiResponse(false);
    }
  };

  // Insert AI response into textarea
  const insertAiResponse = () => {
    if (!aiResponse) return;

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

  // Add a debounced version of checkForAiCommand
  const debouncedCheckForAiCommand = useCallback(
    (text) => {
      const aiCommandRegex = /#Ai\s+(.+)/i;
      const match = text.match(aiCommandRegex);

      if (match && match[1] && match[1].trim().length > 0) {
        const question = match[1].trim();
        console.log("Setting debounced question:", question);

        // Set the question for debouncing
        setDebouncedQuestion(question);
      } else {
        // Reset AI states if the pattern is no longer in the text
        if (aiQuestion) {
          setAiQuestion('');
          setAiResponse('');
          setShowAiResponse(false);
          setDebouncedQuestion('');
        }
      }
    },
    [aiQuestion]
  );

  // Use the debounced question to trigger API calls
  useEffect(() => {
    if (debouncedQuestion && debouncedQuestion !== aiQuestion && !isLoadingAiResponse) {
      setAiQuestion(debouncedQuestion);
      fetchAiResponse(debouncedQuestion);
    }
  }, [debouncedQuestion, aiQuestion, isLoadingAiResponse]);

  // In your main effect that watches postText, call the debounced function
  useEffect(() => {
    // Update character count
    setCharacterCount(postText.length);

    // Auto-resize textarea when content changes
    autoResizeTextarea();

    // Use debounced check for AI command
    debouncedCheckForAiCommand(postText);

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
  }, [postText, debouncedCheckForAiCommand]);

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

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4 overflow-hidden ">
      <div className="bg-white relative dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-xl max-h-[80vh] flex flex-col animate-scale-in my-8">
        {/* Header */}
        <div className="border-b dark:border-gray-700">
          <div className="px-4 py-3 flex justify-between items-center">
            <h2 className="text-xl font-bold text-center flex-1 dark:text-white">Create Post</h2>
            <button
              onClick={onClose}
              className="p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
            >
              <IoMdClose size={24} className="dark:text-white" />
            </button>
          </div>
        </div>

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
                <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 rounded-lg shadow-lg border dark:border-gray-700 z-10">
                  {privacyOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => {
                        setPrivacy(option.value);
                        setShowPrivacyOptions(false);
                      }}
                      className="flex items-center gap-2 w-full px-3 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 text-left dark:text-white"
                    >
                      {option.icon}
                      <span>{option.label}</span>
                    </button>
                  ))}
                </div>
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
          <div className="px-4 pb-3">
            <div className="p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Schedule for later
              </label>
              <input
                type="datetime-local"
                value={scheduledTime}
                onChange={(e) => setScheduledTime(e.target.value)}
                className="w-full p-2 border dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 dark:text-white"
              />
              {scheduledTime && (
                <div className="flex justify-between mt-2">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your post will be published at the scheduled time
                  </p>
                  <button
                    onClick={() => setScheduledTime('')}
                    className="text-xs text-red-500 hover:text-red-700"
                  >
                    Clear
                  </button>
                </div>
              )}
            </div>
          </div>
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
                  <div className="mt-3">
                    <div className={`grid gap-2 ${filePreviewUrls.length === 1 ? 'grid-cols-1' :
                      filePreviewUrls.length === 2 ? 'grid-cols-2' :
                        filePreviewUrls.length >= 3 ? 'grid-cols-3' : ''
                      }`}>
                      {filePreviewUrls.map((url, index) => (
                        <div key={index} className="relative rounded-lg overflow-hidden group">
                          <img src={url} alt="Preview" className="w-full h-full object-cover" />
                          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center">
                            <button
                              onClick={() => removeFile(index)}
                              className="opacity-0 group-hover:opacity-100 rounded-full bg-black bg-opacity-60 p-2"
                            >
                              <IoMdClose size={16} className="text-white" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Drag & drop area */}
                {filePreviewUrls.length === 0 && !showAiResponse && (
                  <div className="mt-2 text-center py-2 text-xs text-gray-500 dark:text-gray-400 italic">
                    Drag and drop images or videos here
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
                theme="dark"
                emojiStyle="facebook"
              />
            </div>
          </div>
        )}

        {/* Color picker */}
        {showColorPicker && (
          <div className="px-4 pb-2">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md">
              <div className="flex gap-2 flex-wrap">
                {bgColors.map((option) => (
                  <button
                    key={option.color}
                    onClick={() => {
                      setSelectedBgColor(option);
                      setShowColorPicker(false);
                    }}
                    className={`w-8 h-8 rounded-full border-2 ${selectedBgColor.color === option.color ? 'border-blue-500' : 'border-gray-300'
                      }`}
                    style={{ backgroundColor: option.color || 'transparent' }}
                    title={option.label}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Add to post options */}
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

        {/* Developer note about API key - updated to handle both mock and real API states */}
        {!isLoadingAiResponse && showAiResponse && (
          <div className="mt-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs text-blue-700 dark:text-blue-400">
              <strong>AI Assistant:</strong> {!OPENAI_API_KEY ?
                "I&apos;m currently using mock responses. For real ChatGPT integration, add your OpenAI API key to the OPENAI_API_KEY constant." :
                "I&apos;m powered by OpenAI&apos;s ChatGPT. Your messages are sent to OpenAI for processing."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

WritePostModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default WritePostModal; 
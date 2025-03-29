import { useState, useRef, useEffect } from 'react';
import { MdShare, MdContentCopy, MdCheck } from 'react-icons/md';
import { FaFacebook, FaTwitter, FaWhatsapp, FaTelegram } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { useClickOutside } from '../hooks/useClickOutside';
import { usePreventScroll } from '../hooks/usePreventScroll';

export default function ShareModal({ isOpen, onClose, postUrl }) {
    const [copied, setCopied] = useState(false);
    const modalRef = useClickOutside(onClose, isOpen);
    usePreventScroll(isOpen);

    // Calculate scrollbar width on mount
    useEffect(() => {
        if (isOpen) {
            const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
            document.documentElement.style.setProperty('--scrollbar-width', `${scrollbarWidth}px`);
        }
    }, [isOpen]);

    const shareOptions = [
        {
            name: 'Facebook',
            icon: <FaFacebook size={24} />,
            color: 'text-blue-600',
            action: () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`, '_blank')
        },
        {
            name: 'Twitter',
            icon: <FaTwitter size={24} />,
            color: 'text-blue-400',
            action: () => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}`, '_blank')
        },
        {
            name: 'WhatsApp',
            icon: <FaWhatsapp size={24} />,
            color: 'text-green-500',
            action: () => window.open(`https://wa.me/?text=${encodeURIComponent(postUrl)}`, '_blank')
        },
        {
            name: 'Telegram',
            icon: <FaTelegram size={24} />,
            color: 'text-blue-400',
            action: () => window.open(`https://t.me/share/url?url=${encodeURIComponent(postUrl)}`, '_blank')
        }
    ];

    const handleCopyLink = async () => {
        try {
            await navigator.clipboard.writeText(postUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center"
            data-modal="share"
            style={{ position: 'fixed' }}
        >
            <div
                className="fixed inset-0 bg-gray-500/40 transition-opacity"
                onClick={(e) => {
                    e.stopPropagation();
                    onClose();
                }}
            />
            <div
                ref={modalRef}
                className="relative bg-white dark:bg-black rounded-xl w-full max-w-md mx-4 shadow-xl"
                onClick={(e) => e.stopPropagation()}
                data-modal="share-content"
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b dark:border-gray-700">
                    <h2 className="text-xl font-semibold dark:text-gray-200">Share</h2>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            onClose();
                        }}
                        className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                        ✕
                    </button>
                </div>

                {/* Content */}
                <div className="p-4">
                    {/* Share Options */}
                    <div className="grid grid-cols-4 gap-3 mb-6">
                        {shareOptions.map((option, index) => (
                            <button
                                key={index}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    option.action();
                                }}
                                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-[#292828]"
                            >
                                <span className={option.color}>{option.icon}</span>
                                <span className="text-sm dark:text-gray-200">{option.name}</span>
                            </button>
                        ))}
                    </div>

                    {/* Copy Link Section */}
                    <div className="flex items-center gap-2 p-3 bg-gray-100 dark:bg-gray-700 rounded-lg">
                        <input
                            type="text"
                            value={postUrl}
                            readOnly
                            onClick={(e) => e.stopPropagation()}
                            className="flex-1 bg-transparent outline-none text-sm dark:text-gray-200"
                        />
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                handleCopyLink();
                            }}
                            className="flex items-center gap-2 px-3 py-1.5 bg-black text-white dark:bg-white dark:text-black rounded-lg  transition-colors"
                        >
                            {copied ? (
                                <>
                                    <MdCheck size={20} />
                                    <span>Copied!</span>
                                </>
                            ) : (
                                <>
                                    <MdContentCopy size={20} />
                                    <span>Copy</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

ShareModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    postUrl: PropTypes.string.isRequired
}; 
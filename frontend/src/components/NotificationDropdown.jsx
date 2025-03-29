import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiCheckCircle, FiClock, FiFilter, FiHeart, FiMessageSquare, FiStar, FiUserPlus, FiBell } from 'react-icons/fi';
import { IoMdNotificationsOff } from 'react-icons/io';

const NotificationDropdown = ({ isOpen, notifications, setNotifications, unreadCount }) => {
    const [filter, setFilter] = useState('all');
    const [timeFrame, setTimeFrame] = useState('all');

    // Categories for filtering
    const categories = [
        { id: 'all', label: 'All' },
        { id: 'comment', label: 'Comments', icon: <FiMessageSquare className="text-green-500" /> },
        { id: 'like', label: 'Likes', icon: <FiHeart className="text-red-500" /> },
        { id: 'follow', label: 'Follows', icon: <FiUserPlus className="text-blue-500" /> }
    ];

    // Time frames for filtering
    const timeFrames = [
        { id: 'all', label: 'All time' },
        { id: 'today', label: 'Today' },
        { id: 'week', label: 'This week' }
    ];

    // Categorize notifications (in a real app, this would come from the backend)
    const categorizedNotifications = notifications.map(notification => {
        let category = 'comment';
        let priority = 'normal';

        // Determine category based on title
        if (notification.title.includes('liked')) category = 'like';
        if (notification.title.includes('follower')) category = 'follow';

        // Set priority for demo (in a real app this would be data-driven)
        if (notification.id === 1) priority = 'high';
        if (notification.id === 5) priority = 'low';

        return { ...notification, category, priority };
    });

    // Filter by category and time frame
    const filteredNotifications = categorizedNotifications
        .filter(notification => filter === 'all' || notification.category === filter)
        .filter(notification => {
            if (timeFrame === 'all') return true;
            if (timeFrame === 'today' && notification.time.includes('hours ago')) return true;
            if (timeFrame === 'week' && !notification.time.includes('month')) return true;
            return false;
        });

    const markAsRead = (id) => {
        setNotifications(notifications?.map(notification =>
            notification.id === id ? { ...notification, isRead: true } : notification
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications?.map(notification => ({ ...notification, isRead: true })));
    };

    const snoozeNotification = (e, id) => {
        e.preventDefault();
        e.stopPropagation();
        // In a real app, this would update the backend
        // For demo, we'll just mark it as read
        markAsRead(id);
    };

    const getPriorityIndicator = (priority) => {
        switch (priority) {
            case 'high':
                return <FiStar className="text-amber-500 animate-pulse" title="High priority" />;
            case 'low':
                return <FiClock className="text-gray-400" title="Low priority" />;
            default:
                return null;
        }
    };

    const getCategoryIcon = (category) => {
        switch (category) {
            case 'like': return <FiHeart className="text-red-500" />;
            case 'follow': return <FiUserPlus className="text-blue-500" />;
            case 'comment': return <FiMessageSquare className="text-green-500" />;
            default: return <FiBell className="text-gray-500" />;
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-[#1a1a1a] rounded-lg shadow-xl border dark:border-gray-700 overflow-hidden">
            {/* Header with title and actions */}
            <div className="flex justify-between items-center p-3 border-b dark:border-gray-700">
                <div className="flex items-center gap-2">
                    <h3 className="font-medium text-gray-800 dark:text-white">Notifications</h3>
                    {unreadCount > 0 && (
                        <span className="px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 text-xs">
                            {unreadCount} new
                        </span>
                    )}
                </div>

                <div className="flex gap-2">
                    {unreadCount > 0 && (
                        <button
                            onClick={markAllAsRead}
                            className="text-xs px-2 py-1 rounded bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-800/40 transition"
                        >
                            Mark all as read
                        </button>
                    )}
                </div>
            </div>

            {/* Filter tabs */}
            <div className="flex flex-col border-b dark:border-gray-700 p-2 bg-gray-50 dark:bg-gray-800/40">
                <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-1 scrollbar-hide">
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                        <FiFilter size={14} />
                    </span>
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => setFilter(category.id)}
                            className={`text-xs px-2.5 py-1 rounded-full flex items-center gap-1 transition whitespace-nowrap
                                ${filter === category.id
                                    ? 'bg-blue-100 text-blue-600 dark:bg-blue-900/70 dark:text-blue-300'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            {category.icon && <span>{category.icon}</span>}
                            {category.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
                    <span className="ml-1 text-gray-500 dark:text-gray-400">
                        <FiClock size={14} />
                    </span>
                    {timeFrames.map(frame => (
                        <button
                            key={frame.id}
                            onClick={() => setTimeFrame(frame.id)}
                            className={`text-xs px-2.5 py-1 rounded-full transition whitespace-nowrap
                                ${timeFrame === frame.id
                                    ? 'bg-indigo-100 text-indigo-600 dark:bg-indigo-900/70 dark:text-indigo-300'
                                    : 'bg-white text-gray-700 hover:bg-gray-100 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'}`}
                        >
                            {frame.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Notification list */}
            <div className="max-h-[25rem] overflow-y-auto">
                {filteredNotifications.length > 0 ? (
                    <div>
                        {filteredNotifications.map((notification) => (
                            <Link
                                to={notification.link}
                                key={notification.id}
                                onClick={() => markAsRead(notification.id)}
                                className="block"
                            >
                                <div className={`flex p-3 hover:bg-gray-100 dark:hover:bg-gray-800 transition cursor-pointer relative
                                    ${!notification.isRead ? 'bg-blue-50/60 dark:bg-blue-900/10' : ''}`}
                                >
                                    <div className="mr-3 relative">
                                        <img
                                            src={notification.avatar}
                                            alt=""
                                            className="w-12 h-12 rounded-full border dark:border-gray-700"
                                        />
                                        <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-white dark:bg-gray-800 shadow-sm">
                                            {getCategoryIcon(notification.category)}
                                        </div>
                                    </div>

                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <div className="flex items-center gap-1">
                                                <p className={`text-sm dark:text-white ${!notification.isRead ? 'font-semibold' : ''}`}>
                                                    {notification.title}
                                                </p>
                                                {getPriorityIndicator(notification.priority)}
                                            </div>
                                            <p className="text-xs text-gray-400 dark:text-gray-500 whitespace-nowrap ml-2">{notification.time}</p>
                                        </div>

                                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">{notification.message}</p>

                                        {/* Interactive buttons */}
                                        <div className="flex justify-between mt-2">
                                            <div className="flex gap-1">
                                                {notification.category === 'comment' && (
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                        className="text-xs px-2 py-0.5 rounded bg-blue-50 text-blue-600 hover:bg-blue-100 dark:bg-blue-900/30 dark:text-blue-300 dark:hover:bg-blue-800/30"
                                                    >
                                                        Reply
                                                    </button>
                                                )}

                                                {notification.category === 'follow' && (
                                                    <button
                                                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                                                        className="text-xs px-2 py-0.5 rounded bg-green-50 text-green-600 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-300 dark:hover:bg-green-800/30"
                                                    >
                                                        Follow back
                                                    </button>
                                                )}
                                            </div>

                                            <button
                                                onClick={(e) => snoozeNotification(e, notification.id)}
                                                className="text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 flex items-center gap-1"
                                                title="Snooze notification"
                                            >
                                                <IoMdNotificationsOff size={14} />
                                                <span>Snooze</span>
                                            </button>
                                        </div>
                                    </div>

                                    {!notification.isRead && (
                                        <div className="h-2.5 w-2.5 bg-blue-500 dark:bg-blue-400 rounded-full absolute top-4 right-3"></div>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        <div className="inline-flex rounded-full bg-gray-100 dark:bg-gray-700 p-3 mb-4">
                            <FiCheckCircle className="h-6 w-6 text-gray-500 dark:text-gray-400" />
                        </div>
                        <p>No {filter !== 'all' ? filter : ''} notifications{timeFrame !== 'all' ? ` ${timeFrame}` : ''}</p>
                    </div>
                )}
            </div>

            {/* Footer */}
            <div className="p-3 text-center border-t dark:border-gray-700 bg-gray-50 dark:bg-gray-800/30">
                <Link to="/notifications" className="text-sm text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300">
                    View all notifications
                </Link>
            </div>
        </div>
    );
};

export default NotificationDropdown; 
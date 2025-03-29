

export default function ScheduleSelector({ scheduledTime, setScheduledTime }) {
    return (
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
    )
}

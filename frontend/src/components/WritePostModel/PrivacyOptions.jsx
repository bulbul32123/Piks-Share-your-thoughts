

export default function PrivacyOptions({ privacyOptions, setPrivacy, setShowPrivacyOptions }) {
  return (
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
  )
}

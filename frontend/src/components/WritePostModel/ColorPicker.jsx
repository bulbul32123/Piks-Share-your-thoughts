

export default function ColorPicker({ setSelectedBgColor, setShowColorPicker, selectedBgColor, bgColors }) {
    return (
        <div className="px-4 pb-2">
            <div className="p-2 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                <div className="flex gap-2 flex-wrap">
                    {bgColors?.map((option) => (
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
    )
}

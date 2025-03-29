
import { IoMdClose } from 'react-icons/io'

export default function ImagePreviews({ filePreviewUrls, removeFile }) {
    return (
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
    )
}

const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

exports.uploadImage = async (req, res) => {
    let tempFilePath = null;

    try {
        console.log('Upload request received:', req.file ? req.file.originalname : 'no file');

        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image file provided' });
        }

        console.log('File details:', {
            name: req.file.originalname,
            size: `${(req.file.size / 1024).toFixed(2)} KB`,
            type: req.file.mimetype,
            path: req.file.path
        });

        const maxSize = 5 * 1024 * 1024; 
        if (req.file.size > maxSize) {
            return res.status(400).json({
                success: false,
                message: `File size exceeds 5MB limit (${(req.file.size / 1024 / 1024).toFixed(2)} MB)`
            });
        }

        if (!fs.existsSync(req.file.path)) {
            return res.status(400).json({
                success: false,
                message: 'File not found on server'
            });
        }

        tempFilePath = req.file.path;

        console.log('Cloudinary credentials status:', {
            cloudName: process.env.CLOUDINARY_CLOUD_NAME ? 'set' : 'missing',
            apiKey: process.env.CLOUDINARY_API_KEY ? 'set' : 'missing',
            apiSecret: process.env.CLOUDINARY_API_SECRET ? 'set' : 'missing'
        });

        if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
            return res.status(500).json({
                success: false,
                message: 'Server configuration error: Missing Cloudinary credentials'
            });
        }
        console.log('Attempting Cloudinary upload...');

        const uploadOptions = {
            folder: 'tshirt-store/products',
            resource_type: 'auto',
            quality: 'auto'
        };

        const result = await cloudinary.uploader.upload(req.file.path, uploadOptions);

        console.log('Cloudinary upload successful:', {
            url: result.secure_url,
            publicId: result.public_id
        });

        try {
            fs.unlinkSync(req.file.path);
            console.log('Temporary file removed');
        } catch (unlinkError) {
            console.error('Warning: Could not remove temp file:', unlinkError.message);
        }

        return res.status(200).json({
            success: true,
            message: 'Image uploaded successfully',
            url: result.secure_url,
            public_id: result.public_id
        });

    } catch (error) {
        console.error('ERROR IN UPLOAD PROCESS:', error);

        if (tempFilePath && fs.existsSync(tempFilePath)) {
            try {
                fs.unlinkSync(tempFilePath);
            } catch (unlinkError) {
                console.error('Warning: Failed to clean up temp file:', unlinkError.message);
            }
        }

        return res.status(500).json({
            success: false,
            message: 'Failed to upload image',
            error: error.message,
            details: error.http_code ? `Cloudinary HTTP Error ${error.http_code}` : 'Server error'
        });
    }
}; 
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   content: {
    type: String,
    required: [true, 'Content is required'],
   },
   postBg: {
    type: Object,
    text: String,
    bgColor: String,
    status: String,
    label: String,
    mood: String,
   },
   image: {
    type: String,
   },
   likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'User'
   },
   comments: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Comment'
   },
   shares: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'User'
   },
   createdAt: {
    type: Date,
    default: Date.now
   },

    updatedAt: {
        type: Date,
        default: Date.now
    }
});



const { Post } = mongoose.model('Post', postSchema);

module.exports = Post; 
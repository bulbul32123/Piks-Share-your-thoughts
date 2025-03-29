const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
   userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
   },
   content: {
    type: String,
    required: [true, 'Content is required'],
   },
   postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
   },
   likes: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'User'
   },
   replies: {
    type: [mongoose.Schema.Types.ObjectId],
    default: [],
    ref: 'Comment'
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



const { Comment } = mongoose.model('Comment', commentSchema);

module.exports = Comment; 
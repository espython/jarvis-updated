import mongoose from 'mongoose';

/**
 * Initialize the post schema
 */
const commentSchema = new mongoose.Schema({
  commentText: {
    type: String,
    required: true,
  },
  likes: {
    type: Number,
  },
  share: {
    type: Number,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
});

const Comment = mongoose.model('comments', commentSchema);

export default Comment;

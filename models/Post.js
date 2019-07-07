import mongoose from 'mongoose';

/**
 * Initialize the post schema
 */
const postSchema = new mongoose.Schema({
  post: {
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

const Post = mongoose.model('posts', postSchema);

export default Post;

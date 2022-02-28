import mongoose from "mongoose";

const Schema = mongoose.Schema;

const BlogPostSchema = new Schema({
  title: String,
  body: String,
  image: String,
  datePosted: {
    type: Date,
    default: new Date().toDateString()
  },
  user: {
    type: String,
    default: 'N/A',
  }
});

const BlogPost = mongoose.model('BlogPost', BlogPostSchema);

export default BlogPost;
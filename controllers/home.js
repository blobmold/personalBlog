import BlogPost from '../models/BlogPost.js';

export default async (req, res) => {
  const blogpost = await BlogPost.find({});
  res.render('index', {
    blogpost: blogpost.reverse(),
  });
} 

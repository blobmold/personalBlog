import BlogPost from "../models/BlogPost.js";

export default async (req, res) => {
  await BlogPost.create(req.body);
  res.redirect('/');
}
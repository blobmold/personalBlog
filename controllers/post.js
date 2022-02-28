import BlogPost from "../models/BlogPost.js";

export default async (req, res) => {
    const blogpost = await BlogPost.findById(req.params.id)
    res.render('post', {
        blogpost
    });
};
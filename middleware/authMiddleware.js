import User from "../models/User.js";

export default async (req, res, next) => {
    let user = await User.findById(req.session.userId);
    if(!user) {
        return res.redirect('/')
    }
    next();
}
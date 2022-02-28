import User from "../models/User.js";

export default async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/');
    } catch(err) {
        console.log(err)
        res.redirect('/auth/register')
    }
}
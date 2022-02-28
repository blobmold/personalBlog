import User from "../models/User.js";

export default async (req, res) => {
    try {
        await User.create(req.body);
        res.redirect('/');
    } catch(err) {
        const validationErrors = Object.keys(err.errors).map(key => err.errors[key].message);
        req.session.validationErrors = validationErrors;
        res.redirect('/auth/register');
    }
}
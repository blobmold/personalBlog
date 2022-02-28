import bcrypt from "bcrypt";
import User from "../models/User.js";

export default (req, res) => {
	const { username, password } = req.body;

	User.findOne({username}, (err, user) => {
		if (user) {
			bcrypt.compare(password, user.password, (err, same) => {
				if (same) {
					req.session.userId = user._id
					res.redirect("/");
				} else {
					res.redirect("/auth/login");
				}
			});
		} else {
			res.redirect("/auth/login");
		}
	});
};

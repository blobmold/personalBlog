import BlogPost from "../models/BlogPost.js";
import User from "../models/User.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async (req, res) => {
  let image = await req.files.image;
  await image.mv(path.resolve(__dirname, "../public/assets/img", image.name));
  let user = await User.findById(req.session.userId);
  await BlogPost.create({
    ...req.body,
    image: '/assets/img/' + image.name,
    user: user.username
  })
  res.redirect("/");
};

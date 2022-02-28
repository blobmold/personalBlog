import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";

mongoose.connect("mongodb://localhost/newBlog");

const app = express();

app.set("view engine", "ejs");

// middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// routing
import homeController from "./controllers/home.js";
import aboutController from "./controllers/about.js";
import contactController from "./controllers/contact.js";
import newPostController from "./controllers/newPost.js";
import storePostController from "./controllers/storePost.js";

app.get("/", homeController);
app.get("/about", aboutController);
app.get("/contact", contactController);
app.get("/posts/new", newPostController);

app.post("/posts/store", storePostController);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import fileUpload from "express-fileupload";
import expressSession from "express-session";

const app = express();

mongoose.connect("mongodb://localhost/newBlog");

app.set("view engine", "ejs");

// middleware
import validationMiddleware from "./middleware/validationMiddlware.js"
import redirectIfAuthenticatedMiddleware from "./middleware/redirectIfAuthenticatedMiddleware.js";
import authMiddleware from "./middleware/authMiddleware.js";

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
app.use(
    expressSession({
        secret: "balroc is cool",
        resave: true,
        saveUninitialized: true,
    })
);

global.loggedIn = null;

app.use('*', (req, res, next) => {
    loggedIn = req.session.userId;
    next();
})

// routing
import homeController from "./controllers/home.js";
import newPostController from "./controllers/newPost.js";
import storePostController from "./controllers/storePost.js";
import postController from "./controllers/post.js";
import registerController from "./controllers/register.js";
import loginController from "./controllers/login.js";
import storeUserController from "./controllers/storeUser.js";
import loginUserController from "./controllers/loginUser.js";
import logoutController from "./controllers/logout.js";

app.get("/", homeController);
app.get("/posts/new", authMiddleware, newPostController);
app.get("/posts/:id", postController);
app.get("/auth/register", redirectIfAuthenticatedMiddleware, registerController);
app.get("/auth/login", redirectIfAuthenticatedMiddleware, loginController);
app.get("/auth/logout", logoutController);

app.post("/posts/store", validationMiddleware, authMiddleware, storePostController);
app.post("/users/register", redirectIfAuthenticatedMiddleware, storeUserController);
app.post("/users/login", redirectIfAuthenticatedMiddleware, loginUserController);

// 404
app.use((req, res) => res.render('404'));

// 500
app.use((err, req, res, next) => {
    res.status(500);
    res.render('500');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server running on http://localhost:${PORT}`));

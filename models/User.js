import mongoose from "mongoose";
import bcrypt from "bcrypt";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre("save", function (next) {
    bcrypt.hash(user.password, 10, (error, hash) => {
        this.password = hash;
        next();
    });
});

const User = mongoose.model("User", UserSchema);

export default User;

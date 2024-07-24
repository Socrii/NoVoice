import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";
import { jwt } from "jsonwebtoken";
// Schema definition for a writer (user)
const userSchema = new mongoose.Schema({
    name: {   
        type: String,
        required: true,
        minLength: [3, "Name must contain at least 3 characters!"],
        maxLength: [32, "Name must contain at most 32 characters!"],
    },
    email: {
        type: String,
        required: true,
        validate: [validator.isEmail, "Please provide a valid email!"],
        unique: true
    },
    phone: {
        type: Number,
        required: true,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        }
    },
    education: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        required: true,
        enum: ["Reader", "Author"], // restricting roles
    },
    password: {
        type: String,
        required: true,
        minLength: [8, "Password must contain at least 8 characters!"],
        maxLength: [32, "Password must contain at most 32 characters!"],
        select: false // password should not be selected by default
    },
    createdOn: {
        type: Date,
        default: Date.now,
    },
});

// hashing the password 
userSchema.pre("save", async function(next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// here we compare the actual to the received one 
userSchema.methods.comparePassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};
// jwt tokken genr.
userSchema.method.getJWTToken= function()
{
    return jwt.sign({id:this._id},process.env.JWT_SECRET_KEY,{expiresIn:process.env.JWT_EXPIRES});
}
export const User = mongoose.model("User", userSchema);

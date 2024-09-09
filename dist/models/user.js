import mongoose, { Schema } from "mongoose";
const UserSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true },
    phone: { type: String },
}, { timestamps: true });
const User = mongoose.model("User", UserSchema);
export default User;

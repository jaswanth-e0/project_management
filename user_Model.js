const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    fullName: { type: String, required: [true,"full name is required"] },
    email: { type: String, required: [true,"Email is required"], unique: true },
    password: { type: String, required:[true,"password is required"] },
    role: { type: String, enum: ["Admin", "User"], default: "User" },
    isActive: { type: String, enum: ["Active", "Inactive"],default: "Active", },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User_Model", userSchema);

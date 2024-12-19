const mongoose = require("mongoose");

const userSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true },
        qualification: { type: String },
        profileImage: { type: String, default: "default.png" },
    },
    {
        versionKey: false,
    }
);
const UserModule = mongoose.model("user", userSchema);

module.exports = { UserModule };
const mongoose = require("mongoose");

const registrationSchema = new mongoose.Schema({
    hackathonId: { type: mongoose.Schema.Types.ObjectId, ref: "Hackathon", required: true },
    userId: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }], 
    hackathonName: { type: String, required: true },
    registrationDate: { type: Date, default: Date.now },
});

const Registration = mongoose.model("Registration", registrationSchema);
module.exports = Registration;

const mongoose = require("mongoose");

require("./userModel"); 

const HackathonSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "user" }, 
});

const Hackathon = mongoose.model("Hackathon", HackathonSchema);

module.exports = Hackathon;

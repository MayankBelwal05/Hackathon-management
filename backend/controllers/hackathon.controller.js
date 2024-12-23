const Hackathon = require("../models/hackathon.model");
const User = require("../models/userModel");
const Registration = require("../models/registration.model");


const createHackathon = async (req, res) => {
  const { name, description, startDate, endDate } = req.body;
  const userId = req.userId;

  try {
    const hackathon = new Hackathon({
      name,
      description,
      startDate,
      endDate,
      createdBy: userId, 
    });

    await hackathon.save();
    res.status(201).json(hackathon);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().populate("createdBy", "name");
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getCreatedHackathons = async (req, res) => {
  const userId = req.userId;
  
  try {
    const hackathons = await Hackathon.find({ createdBy: userId })
      .populate("createdBy", "name");
    res.status(200).json(hackathons);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const getParticipatedHackathons = async (req, res) => {
  console.log("clicked on button");

  try {
    const userId = req.userId; 

    if (!userId) {
      return res.status(400).json({ message: "User not authenticated" });
    }

   
    const participatedHackathons = await Registration.find({
      userId: { $in: [userId] }  
    }).populate("hackathonId");

    res.json(participatedHackathons.map((registration) => registration.hackathonId));
  } catch (error) {
    console.error("Error fetching participated hackathons:", error);
    res.status(500).json({ message: "Error fetching participated hackathons." });
  }
};



const hackathonRegister = async (req, res) => {
  try {
    const { hackathonId, userId, hackathonName } = req.body;

   
    if (!hackathonId || !userId || !hackathonName) {
      return res.status(400).json({ message: "All fields are required." });
    }

   
    let registration = await Registration.findOne({ hackathonId });

    if (registration) {
      if (!registration.userId.includes(userId)) {
        registration.userId.push(userId);
        await registration.save();
        return res.status(200).json({ message: "User added to registration.", registration });
      } else {
        return res.status(400).json({ message: "User already registered." });
      }
    }

  
    registration = new Registration({
      hackathonId,
      hackathonName,
      userId: [userId], 
    });

    await registration.save();
    res.status(201).json({ message: "Successfully registered!", registration });
  } catch (error) {
    console.error("Error registering for hackathon:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};


module.exports = { createHackathon, getAllHackathons, getCreatedHackathons, getParticipatedHackathons, hackathonRegister };

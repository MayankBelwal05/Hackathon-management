const express = require("express");
const { createHackathon,getCreatedHackathons,getParticipatedHackathons, getAllHackathons, hackathonRegister } = require("../controllers/hackathon.controller");
const { auth } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create",createHackathon);
router.get("/getAll", getAllHackathons);
router.post("/hackathonregister",hackathonRegister),

router.get("/created", getCreatedHackathons);
router.get("/participated", getParticipatedHackathons);



module.exports = router;

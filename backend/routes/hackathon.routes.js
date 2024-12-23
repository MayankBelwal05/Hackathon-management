const express = require("express");
const { createHackathon,getCreatedHackathons,getParticipatedHackathons, getAllHackathons, hackathonRegister } = require("../controllers/hackathon.controller");
const { auth } = require("../middlewares/authmiddleware");
const router = express.Router();

router.post("/create", auth,createHackathon);
router.get("/getAll", getAllHackathons);
router.post("/hackathonregister",hackathonRegister),

router.get("/created",auth, getCreatedHackathons);
router.get("/participated",auth, getParticipatedHackathons);



module.exports = router;

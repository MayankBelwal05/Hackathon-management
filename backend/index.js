const express = require("express")
require("dotenv").config()
const { connection } = require("./config/db")
const { userRouter } = require("./routes/userRouters.js")
const {auth} = require("./middlewares/authmiddleware")
const cors = require("cors")
const router = require("./routes/hackathon.routes.js")

// initialising app
const app = express() 

//middlewares
app.use(express.json());
app.use(express.text());
app.use(cors());


//routes
app.use("/users", userRouter);
 app.use("/hackathon", router);

app.get("/", (req, res) => {
	res.json({ msg: "Check : Backend is running sucessfully and working fine" })
})


app.get("/admin",auth ,(req, res) => {
	res.json({ msg: "this is Admin page" })
})

//listening to the port
app.listen(process.env.PORT, async () => {
	try {
		await connection
		console.log("Connect to mongoDB")
		console.log("Server is running at port 8080")
	}
	catch (err) {
		console.log(err)
	}
})
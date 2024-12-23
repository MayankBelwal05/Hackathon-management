const jwt = require("jsonwebtoken");

const auth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
 
  if (token) {
    try {
      const decoded = jwt.verify(token, "masai"); 
      req.userId = decoded.userId; 
      next(); 
    } catch (error) {
      res.status(401).send({ msg: "Invalid token", error: error.message });
    }
  } else {
    res.status(401).send({ msg: "You are not authorized" });
  }
};

module.exports = { auth };

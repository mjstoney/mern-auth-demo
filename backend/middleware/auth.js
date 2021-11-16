const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log("Token:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userID = decoded.userID;
    if (req.body.userID && req.body.userID !== userID) {
      throw "Invalid user ID.";
    } else {
      next();
    }
  } catch (err) {
    res.status(401).json({
      message: "Invalid request!",
    });
  }
};

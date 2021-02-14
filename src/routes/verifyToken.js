const jwt = require("jsonwebtoken");

module.exports = function (req, res, next) {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("Not logged in");

  try {
    const loggedIn = jwt.verify(token, process.env.TOKEN_SEC);
    req.user = loggedIn;
    next();
  } catch (err) {
    res.status(400).send("Invalid token");
  }
};

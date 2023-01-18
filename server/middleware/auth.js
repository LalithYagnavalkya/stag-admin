const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    console.log(req.headers);
    console.log(JSON.stringify({ token }));
    if (token) {
      token = token.split(" ")[1];
      let user = jwt.verify(token, process.env.JWT_SECRET);
      req.userId = user.id;
    } else {
      res.status(401).json({ message: "Unauthorized User" });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ message: "Unauthorized User" });
  }
};

module.exports = auth;

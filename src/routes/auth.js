const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../model/User");

const { registerValidate, loginValidate } = require("../validate");

router.post("/register", async (req, res) => {
  //validate data
  const { error } = registerValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check existing user
  const exists = await User.findOne({ email: req.body.email });
  if (exists) return res.status(400).send("Email already registered");

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(req.body.password, salt);

  //register user
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashPass,
  });
  try {
    const savedUser = await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

router.post("/login", async (req, res) => {
  // validate data
  const { error } = loginValidate(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  // check if user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.send({
      auth: false,
      token: undefined,
      message: "Email is not registered",
    });

  // authenticate
  const authorised = await bcrypt.compare(req.body.password, user.password);
  if (!authorised)
    return res.send({
      auth: false,
      token: undefined,
      message: "Incorrect email or password",
    });

  // create token
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SEC, {
    expiresIn: 60*60,
  });
  res
    .header("auth-token", token)
    .send({ auth: true, token: token, message: "verified" });
});

module.exports = router;

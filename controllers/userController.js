const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    req.status(400);
    throw new Error("All fields are mandatory");
  }
  const userAvail = await User.findOne({ email });
  if (userAvail) {
    res.status(400);
    throw new Error("User already registered");
  }
  //hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  //   console.log("Hashed Password is ", hashedPassword);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User Created ${user}`);
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not Valid");
  }
  res.json({ message: "Register the user" });
});

//@desc Login a user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const user = await User.findOne({ email });
  //compare password with hashedpassword
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECERT,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});
//@desc Current user info
//@route POST /api/users/login
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "Current the user" });
});

module.exports = {
  registerUser,
  loginUser,
  currentUser,
};

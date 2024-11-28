const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const userExist = await User.findOne({ username });
    if (userExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    return res.status(200).json({ message: "User Created Successfully" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

const Login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const userExist = await User.findOne({ username });
    if (!userExist) {
      return res.status(404).json({ message: "User Not Found" });
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      userExist.password
    );
    if (isPasswordCorrect) {
      const payload = {
        username,
      };
      const token = jwt.sign(payload, "demo");
      return res.status(200).json({ jwt: token });
    }
    return res.status(404).json({ message: "Incorrect Password" });
  } catch (err) {
    return res.status(500).json(err);
  }
};

module.exports = { Register, Login };

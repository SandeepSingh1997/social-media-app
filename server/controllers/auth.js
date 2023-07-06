import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import _ from "lodash";

/*Register user*/
export const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      picturePath,
      friends,
      location,
      occupation,
    } = req.body;

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: passwordHash,
      picturePath,
      friends,
      location,
      occupation,
      viewedProfile: 10,
      impressions: 100,
    });
    const savedUser = await newUser.save();
    _.unset(savedUser, "password");
    res.status(201).json(savedUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.message });
  }
};

/*Login user*/
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ msg: "Either email or password is not provided" });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ msg: "No user found" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    _.unset(user, "password");
    return res.status(200).json({ user, token });
  } catch (err) {
    console.log(`Can't login due to : ${err}`);
    res.status(500).json({ msg: err.message });
  }
};

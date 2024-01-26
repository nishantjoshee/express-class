const Users = require("../models/userSchema");
require("dotenv").config();
const Cryptr = require("cryptr");
const cryptr = new Cryptr(process.env.SECRET_KEY);
const { sign } = require("jsonwebtoken");

exports.signUp = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const result = await Users.create({
      name: name,
      email: email,
      password: password,
      role: role,
    });
    res.status(201).json(result);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.logIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await Users.findOne({
      email: email,
    });
    if (user) {
      const decryptedPassword = cryptr.decrypt(user.password);
      if (decryptedPassword == password) {
        const jwtToken = sign(
          {
            role: user.role,
            id: user._id,
          },
          process.env.SECRET_KEY
        );
        res.status(200).json({
          jwtToken: jwtToken,
          role: user.role,
        });
      } else {
        throw new Error("Incorrect Password");
      }
    } else {
      throw new Error("User not found");
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

const mongoose = require("mongoose");
const Cryptr = require("cryptr");
require("dotenv").config();

const crypter = new Cryptr(process.env.SECRET_KEY);

const userSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, required: true },
  password: {
    type: String,
    required: true,
    set: (value) => crypter.encrypt(value),
  },
});

module.exports = mongoose.model("users", userSchema);

const express = require("express");
const { signUp, logIn } = require("../controllers/userController");
const router = express.Router();

router.route("/signup").post(signUp);
router.route("/login").post(logIn);

module.exports = router;

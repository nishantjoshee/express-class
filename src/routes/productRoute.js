const express = require("express");
const { createProduct } = require("../controllers/productController");
const router = express.Router();
const { jwtProtection } = require("../middlewares/jwtProtection");

router.route("/create-product").post(jwtProtection("admin"), createProduct);

module.exports = router;

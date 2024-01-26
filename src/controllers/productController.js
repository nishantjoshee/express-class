const Products = require("../models/productSchema");
const mongoose = require("mongoose");

exports.createProduct = async (req, res) => {
  const { name, description, price } = req.body;
  const result = await Products.create({
    name,
    description,
    price,
  });
  res.status(200).json(result);
};

const express = require("express");

const app = express();
const mongoose = require("mongoose");
const userRouter = require("./src/routes/userRoute");
const productRouter = require("./src/routes/productRoute");
require("dotenv").config();

//middleware
app.use((req, res, next) => {
  console.log(req.headers.authorization);
  next();
});

app.use(express.json());

app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);

app.get("/", (req, res) => {
  return res.json({
    message: "Welcome to WFT",
  });
});

mongoose
  .connect(process.env.DB_CONN_STRING)
  .then(() => console.log("db connected"))
  .catch((err) => console.log("error connecting to the database"));

app.listen(5656, () => {
  console.log("Server is running");
});

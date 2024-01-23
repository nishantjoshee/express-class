const express = require("express");

const app = express();

const userRouter  = require("./routes/userRoute")


//middleware 
app.use((req, res, next) => {
    console.log(req.headers.authorization);
    next();
});

app.use("/api/v1/users", userRouter)



app.get("/", (req, res) => {
    return res.json({
        message : "Welcome to WFT"
    });
});


app.listen(5656, () => {
    console.log("Server is running")
});




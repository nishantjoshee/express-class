const express = require("express");
const router = express.Router();


router.route("/create").post((req, res) => {
    res.json({
        message : "Successful"
    })
});



module.exports = router;
const router = require("express").Router();
var bodyParser = require("body-parser");
var fs = require("fs");

router.post("/", async (req, res) => {
    try {
        if (!req.files) {
            res.send({
                status: false,
                message: "No file uploaded",
            });
        } else {
            let avatar = req.files.avatar;
            avatar.mv("./uploads/" + avatar.name);
            res.send({
                status: true,
                message: "File is uploaded",
                data: {
                    name: avatar.name,
                    mimetype: avatar.mimetype,
                    size: avatar.size,
                },
            });
        }
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = router;

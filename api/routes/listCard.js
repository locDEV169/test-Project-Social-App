const router = require("express").Router();
const { Card } = require("../models/model");
var bodyParser = require("body-parser");
var fs = require("fs");

router.post("/add", async (req, res) => {
    const newCard = new Card(req.body);
    console.log(req.body.avatar, req.body.name, req.body.description);
    if (
        req.body.avatar === null ||
        req.body.avatar === "" ||
        req.body.avatar === undefined ||
        req.body.name === null ||
        req.body.name === undefined ||
        req.body.name === "" ||
        req.body.description === null ||
        req.body.description === undefined ||
        req.body.description === ""
    ) {
        res.status(400).send({
            message: "Check field input",
        });
    } else {
        await newCard
            .save()
            .then((data) => {
                // res.status(201)
                res.send({
                    message: "Card created successfully!!",
                    newCard: data,
                });
            })
            .catch((err) => {
                res.status(500).send({
                    message:
                        err.message ||
                        "Some error occurred while creating user",
                });
            });
    }
});

//Get all card
router.get("/", async (req, res) => {
    const keyword = { status: 1 };

    if (req.query.name) {
        keyword.name = req.query.name;
    }

    if (req.query.description) {
        keyword.description = req.query.description;
    }
    try {
        const getAllCard = await Card.find(keyword);
        console.log(getAllCard);
        return res.status(200).json({
            message: "user data gotten successfully",
            data: getAllCard,
        });
    } catch (error) {
        return res.status(500).json({
            status: "fail",
        });
    }
});

//Get detail card
router.get("/:id", async (req, res) => {
    try {
        const card = await Card.findById(req.params.id);
        res.status(200).json(card);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update card
router.put("/:id", async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
            },
            { new: true }
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/heart/:id", async (req, res) => {
    try {
        const hearts = await Card.findById(req.params.id);
        console.log(hearts.heart);
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: { heart: hearts.heart + 1 },
            },
            { new: true }
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await Card.findByIdAndDelete(req.params.id);
        res.status(200).json("The card has been deleted...");
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/delete/:id", async (req, res) => {
    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: { status: 2 },
            },
            { new: true }
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put("/revert/:id", async (req, res) => {
    const card = await Card.findById(req.params.id);

    try {
        const updatedCard = await Card.findByIdAndUpdate(
            req.params.id,
            {
                $set: req.body,
                status: card.status === 2 ? 1 : 2,
            },
            { new: true }
        );
        res.status(200).json(updatedCard);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post("/upload", async (req, res) => {
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

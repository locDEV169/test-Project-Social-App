const router = require("express").Router();
const { Comment } = require("../models/model");

router.post("/add", async (req, res) => {
  const newComment = new Comment(req.body);
  console.log(newComment);
  await newComment
    .save()
    .then((data) => {
      res.send({
        message: "Card created successfully!!",
        newComment: data,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating user",
      });
    });
});

router.get("/", async (req, res) => {
  try {
    const getAllComment = await Comment.find();
    return res.status(200).json({
      message: "user data gotten successfully",
      data: getAllComment,
    });
  } catch (error) {
    return res.status(500).json({
      status: "fail",
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/card/:cardId", async (req, res) => {
  try {
    const comment = await Comment.find({ cardId: req.params.cardId });
    res.status(200).json(comment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json("The card has been deleted...");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;

const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const CommentModel = require("../Model/Comment.Model");
const { HotelDataModel } = require("../Model/HotelData.Model");
const { UserModel } = require("../Model/User.model");
const CommentRoutes = express.Router();
const jwt = require("jsonwebtoken");

CommentRoutes.get("/productcommment/:id", async (req, res) => {
  const payload = req.params.id;
  try {
    const product = await CommentModel.find({hotelId:payload});
    console.log(product);
    res.send({ data: product,total:product.length });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

CommentRoutes.post("/add", authenticate, async (req, res) => {
  const token = req.headers.authorization;
  const decoded = jwt.verify(token, process.env.key);
  const x = decoded.userId;
  const payload = req.body;
  const data = await UserModel.find({ _id: x });
  console.log(data[0].name);
  const hotelData = await HotelDataModel.find({ _id: payload.hotelId });
  console.log(hotelData);
  const date = new Date();
  const img =
    "https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png";
  try {
    const comments = await CommentModel.create({
      comment: payload.comment,
      rating: payload.rating,
      image: img,
      hotelId: payload.hotelId,
      date: date,
      username: data[0].name,
      userId: x,
    });
    console.log(comments);
    return res.status(201).send(comments);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

CommentRoutes.get("/:id", async (req, res) => {
  const payload = req.params.id;
  try {
    const product = await CommentModel.find({ postId: payload });
    console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

module.exports = { CommentRoutes };

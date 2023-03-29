const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");
const CommentModel = require("../Model/Comment.Model");
const { HotelDataModel } = require("../Model/HotelData.Model");
const { UserModel } = require("../Model/User.model");
const CommentRoutes = express.Router();
const jwt = require("jsonwebtoken");



CommentRoutes.post("/add",authenticate, async (req, res) => {
  const token=req.headers.authorization;
  const decoded=jwt.verify(token, process.env.key)
  const Id=decoded.userId
  console.log(Id)
  const payload = req.body;
  const data = await UserModel.find({ _id: Id });
  const hotelData = await HotelDataModel.find({ _id: payload.hotelId });
  try {
    const comments = await CommentModel.create({
      comment: payload.comment,
      rating: payload.rating,
      image:"https://upload.wikimedia.org/wikipedia/commons/e/e0/Userimage.png",
      hotelId: payload.hotelId,
      username: data[0].username,
      userId: Id,
      vendorId: hotelData[0].userId,
    });

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

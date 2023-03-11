const express = require("express");
const CommentModel = require("../Model/Comment.Model");
const CommentRoutes = express.Router();

CommentRoutes.post("/add/:id", async (req, res) => {
    const Id = req.params.id;
    const payload = req.body;
    
    try {
      const cart = await CommentModel.create({
        comment :payload.comment,
        rating: payload.rating,   
        postId :Id,
        userId:"5666777887"
      });
  
      return res.status(201).send(cart);
    } catch (e) {
      res.status(500).send(e.message);
    }
  });


  CommentRoutes.get("/:id", async (req, res) => {
    const payload = req.params.id;
    try {
      const product = await CommentModel.find({ postId: payload});
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
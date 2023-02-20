const express = require("express");
const { authenticate } = require("../middleware/authentication.middleware");

const { CartModel } = require("../Model/Cart.Model");
const { HotelModel } = require("../Model/Hotel.model");

const cartRouter = express.Router();
const { UserModel } = require("../Model/User.model");

cartRouter.get("/", authenticate, async (req, res) => {
  const payload = req.body;
  // console.log(payload.userId);

  try {
    const product = await CartModel.find({ userId: payload.userId });
   // console.log(product);
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

cartRouter.post("/add", authenticate, async (req, res) => {
  const userId = req.body.userId;
  try {
    const userid = await CartModel.find({ userId:userId });
    console.log(userid)
   
    const cart = await CartModel.create({
      name: req.body.name,
      image: req.body.image,
      price: req.body.price,
      quantity: req.body.quantity,
      type: req.body.type,
      bookingDate: req.body.bookingDate,
      checkoutDate: req.body.checkoutDate,
      numberofPerson: req.body.numberofPerson,
      userId: userId,
      productId:req.body.productId,
      finalPrice:req.body.quantity*req.body.price
    });
    return res.status(201).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});


cartRouter.patch("/update/:id",authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
 
  const hotel = await CartModel.findOne({ _id: Id });
  
  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req,hotelId)
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

cartRouter.delete("/delete/:id",authenticate, async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
 
  const hotel = await CartModel.findOne({ _id: Id });
  
  const hotelId = hotel.userId.toString();
  // console.log(hotelId)
  const userId_making_req = req.body.userId;

  console.log(userId_making_req,hotelId)
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await CartModel.findByIdAndDelete({ _id: Id }, payload);
      res.send({ msg: "Deleted Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

module.exports = { cartRouter };

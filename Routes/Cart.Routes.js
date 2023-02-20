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
  const data = req.body;
  try {
    const userdata = await UserModel.findOne({ _id: userId });
    const hotelData = await HotelModel.findOne({ hotelName: data.hotelName });
    // console.log(hotelData);
     const cart = await CartModel.create({
      hotelName: req.body.hotelName,
      userId: userId,
      userName: userdata.name,
      userNumber: userdata.phone,
      userEmail: userdata.email,
      roomType: data.roomType,
      bookingDate:data.bookingDate,
      checkOutDate:data.bookingDate,
      numberofRooms:data.numberofRooms,
      numberofPerson:data.numberofPerson,
      hotelId:hotelData._id,
    });
    // console.log(cart);
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

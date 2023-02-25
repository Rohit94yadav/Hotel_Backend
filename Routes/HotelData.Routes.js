const express = require("express");
const hotelDataRoutes = express.Router();

const { HotelModel } = require("../Model/Hotel.model");

const { HotelDataModel } = require("../Model/HotelData.Model");

require("dotenv").config();

const { authenticate } = require("../middleware/authentication.middleware");

const { UserModel } = require("../Model/User.model");

hotelDataRoutes.use(authenticate);

hotelDataRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await HotelDataModel.find({ userId: payload.userId });
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

// hotelDataRoutes.patch("/update/:id", async (req, res) => {
//   const Id = req.params.id;
//   const payload = req.body;

//   const hotel = await HotelModel.findOne({ _id: Id });

//   const hotelId = hotel.created_by;
//   console.log(hotelId);
//   const userId_making_req = req.body.created_by;
//   try {
//     if (userId_making_req !== hotelId) {
//       res.send({ msg: "You are not authorized" });
//     } else {
//       await HotelModel.findByIdAndUpdate({ _id: Id }, payload);
//       res.send({ msg: "updated Sucessfully" });
//     }
//   } catch (err) {
//     console.log(err);
//     res.send({ err: "Something went wrong" });
//   }
// });

hotelDataRoutes.post("/add", async (req, res) => {
  const payload = req.body;
  const Id = req.params;
  const data = await HotelModel.find({ _id: payload.hotelId });
  // const y = payload.alltypes;
  // const fun = [];
  // for (let i = 0; i < y.length; i++) {
  //   fun.push(y[i]);
  // }
  newHobby = { type: payload.type};

  try {
    const cart = await HotelDataModel.create({
      hotelId: payload.hotelId,
      name: data[0].name,
      image_url: data[0].image_url,
      email: data[0].email,
      quantity: data[0].quantity,
      phone: data[0].phone,
      address: data[0].address,
      city: data[0].city,
      pinCode: data[0].pinCode,
      rating: data[0].rating,
      ownerName: data[0].ownerName,
      contactName: data[0].contactName,
      date: payload.date,
      alltypes: [
        {type:newHobby} ]      
    });

    return res.status(201).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

hotelDataRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;
 
  try {
    
      await HotelDataModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});


hotelDataRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await HotelDataModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await HotelDataModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});

module.exports = {
  hotelDataRoutes,
};

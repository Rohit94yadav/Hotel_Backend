const express = require("express");
const hotelDataRoutes = express.Router();

const { HotelModel } = require("../Model/Hotel.model");

const { HotelDataModel } = require("../Model/HotelData.Model");

require("dotenv").config();

const { authenticate } = require("../middleware/authentication.middleware");
const { record } = require("../middleware/logger.middleware");
const {
  AutheriseRole,
  AutheriseRolevendor,
  User_admin_vendor

} = require("../middleware/AutheriseRole.middleware");



hotelDataRoutes.get(
  "/",
  record,
  authenticate,
  User_admin_vendor,
  async (req, res) => {
    const sort = req.query.sort;
    const filter = req.query.filter || "";
    const city = req.query.city || "";
    const rating = +req.query.rating || 0;
   

    let sortBy;
    if (sort == "low") {
      sortBy = { rating: 1 };
    } else if (sort == "high") {
      sortBy = { rating: -1 };
    } else if (sort == "phigh") {
      sortBy = { priceperNight: -1 };
    } else if (sort == "plow") {
      sortBy = { priceperNight: 1 };
    } else {
      sortBy = { _id: 1 };
    }
    const data = await HotelDataModel.find();
    console.log(data.isApprovedByAdmin);

    if (data.length > 0) {
      try {
        if (filter.length > 0) {
          const products = await HotelDataModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy)
            .where("name")
            .in(filter)
            .where("city")
            .in(city);
          const count = await HotelDataModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy)
            .where("priceperNight")
            .gte(rating)
            .sort(sortBy)
            .where("name")
            .in(filter)
            .where("city")
            .in(city)
            .count();

          res.send({ data: products, total: count });
        } else {
          const count = await HotelDataModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy)

            .count();
          const products = await HotelDataModel.find()
            .where("rating")
            .gte(rating)
            .sort(sortBy);

          res.send({ data: products, total: count });
        }
      } catch (err) {
        res.send({ msg: "Could not get Hotel" });
      }
    } else {
      res.send({ msg: "Hotel Empty" });
    }
  }
);

hotelDataRoutes.get(
  "/:id",
  authenticate,
  User_admin_vendor,
  async (req, res) => {
    const id = req.params.id;
    try {
      const product = await HotelDataModel.findById(id);
      res.send(product);
    } catch (error) {
      res.status(404).send({ msg: "something went wrong" });
    }
  }
);

hotelDataRoutes.patch(
  "/update/offer/:id",
  authenticate,
  record,
  AutheriseRole,
  async (req, res) => {
    const Id = req.params.id;

    try {
      const data = await HotelDataModel.findById(Id);
      data.alltypes.forEach((item) => {
        if (item._id.toString() == req.query.hotelId) {
          item.off = req.body.off;
        }
      });
      await data.save();
      res.send(data.alltypes);
    } catch (err) {
      console.log(err);
      res.send({ err: "Something went wrong" });
    }
  }
);

// %%%%%%%%%%%%%%%%%%%%  (vendor See his data)  %%%%%%%%%%%%%%%%%%%%%%%

hotelDataRoutes.get("/all/:id", authenticate,AutheriseRolevendor, async (req, res) => {
  const Id = req.params.id;
  console.log(typeof payload);

  try {
    const product = await HotelDataModel.find({ userId: Id });
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

hotelDataRoutes.post("/add",authenticate,AutheriseRolevendor, async (req, res) => {
  const payload = req.body;
  const data = await HotelModel.find({ _id: payload.hotelId });
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
        {
          type: payload.type,
          numberofitem: payload.numberofitem,
          price: payload.price,
          facilites: payload.facilites,
          availableitem: payload.availableitem,
          discountprice: payload.discountprice,
          description: payload.description,
          off: 0,
        },
      ],
    });

    return res.status(201).send(cart);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

hotelDataRoutes.patch("/update/:id",record, authenticate,AutheriseRolevendor, async (req, res) => {
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

hotelDataRoutes.delete("/delete/:id",authenticate,AutheriseRolevendor, async (req, res) => {
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

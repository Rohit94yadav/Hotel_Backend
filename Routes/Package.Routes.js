const express = require("express");
const packageRoutes = express.Router();

const { authenticate } = require("../middleware/authentication.middleware");
const { PackageModel } = require("../Model/Package.Model");


packageRoutes.use(authenticate);

packageRoutes.get("/", async (req, res) => {
  const payload = req.body;
  try {
    const product = await PackageModel.find({ userId: payload.userId });
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

packageRoutes.get("/allpackage", async (req, res) => {
    const payload = req.body;
    try {
      const product = await PackageModel.find();
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

packageRoutes.post("/add", async (req, res) => {
  const payload = req.body;

  try {
    const title = await PackageModel.findOne({ placeName: payload.placeName });
    if (title) {
      res
        .status(200)
        .send({
          msg: "This Place is allready Present So please change the Name of Place",
          error: true,
        });
    } else {
      const hotel = new PackageModel(payload);
      await hotel.save();
      res.send({ msg: "Tourist Data is created" });
    }
  } catch (error) {
    res.status(400).send({ msg: "something went wrong", error });
    console.log(error);
  }
});

packageRoutes.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload = req.body;

  const hotel = await PackageModel.findOne({ _id: Id });

  const hotelId = hotel.created_by;
  console.log(hotelId);
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not authorized" });
    } else {
      await PackageModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
    }
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

packageRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  const note = await PackageModel.findOne({ _id: Id });
  const hotelId = note.created_by;
  const userId_making_req = req.body.created_by;
  try {
    if (userId_making_req !== hotelId) {
      res.send({ msg: "You are not Recognized" });
    } else {
      await PackageModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Data");
    }
  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});



module.exports = {
  packageRoutes,
};

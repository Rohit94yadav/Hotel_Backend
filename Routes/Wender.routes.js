const express = require("express");
require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const saltRounds = +process.env.saltRounds;

const { WenderModel } = require("../Model/Wender.model");

const wenderRouter = express.Router();

wenderRouter.post("/register", async (req, res) => {
  const payload = req.body;

  try {
    const email = await WenderModel.findOne({ email: payload.email });
    if (email) {
      res
        .status(200)
        .send({
          msg: "Email is already Present Please try to again Email",
          error: true,
        });
    } else {
      bcrypt.hash(payload.password, saltRounds, async (err, hash) => {
        if (err) {
          throw err;
        } else {
          payload.password = hash;
          const user = new WenderModel(payload);
          await user.save();
          res.redirect("http://127.0.0.1:5500/Routes/hi.html");
        }
      });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went wrong while register user", error });
    console.log(error);
  }
});

wenderRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await WenderModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          throw err;
        } else {
          if (result) {
            jwt.sign(
              {
                userId: user._id,
                userName: user.name,
                Email: user.email,
                userType: user.userType,
              },
              
              process.env.key,
              (err, token) => {
                if (err) {
                  throw err;
                } else {
                  res.status(200).send({
                    msg: "logged in success",
                    token,
                    username: user.name,
                    error: false,
                  });
                }
              }
            );
          } else {
            res.send({ msg: "wrong credential", error: true });
          }
        }
      });
    } else {
      res.send({ msg: "User Not found", error: true });
    }
  } catch (error) {
    res
      .status(400)
      .send({ msg: "something went wrong while login user", error });
    console.log(error);
  }
});

wenderRouter.get("/", async (req, res) => {
  try {
    const product = await WenderModel.find();
    res.send({ data: product });
  } catch (error) {
    console.log("error", error);
    res.status(500).send({
      error: true,
      msg: "something went wrong",
    });
  }
});

wenderRouter.patch("/update/:id", async (req, res) => {
  const Id = req.params.id;
  const payload=req.body 
 try {
      await WenderModel.findByIdAndUpdate({ _id: Id }, payload);
      res.send({ msg: "updated Sucessfully" });
   
  } catch (err) {
    console.log(err);
    res.send({ err: "Something went wrong" });
  }
});

hotelRoutes.delete("/delete/:id", async (req, res) => {
  const Id = req.params.id;
  try {
      await HotelModel.findByIdAndDelete({ _id: Id });
      res.send("Deleted the Hotel Data");

  } catch (err) {
    console.log(err);
    res.send({ msg: "Something went wrong" });
  }
});


module.exports = { wenderRouter };

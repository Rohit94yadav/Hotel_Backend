const express = require("express");
const cors=require("cors")
const { connection } = require("./configs/db");

const { AgentRouter } = require("./Routes/Agent.routes");

const { hotelRoutes } = require("./Routes/Hotel.routes");
const { UserRouter } = require("./Routes/User.routes");
const { AllhotelRoutes } = require("./Routes/AllHotel.Routes");
const { cartRouter } = require("./Routes/Cart.Routes");
const { tourPlaceRoutes } = require("./Routes/TouristPlace.Routes");
const { TourTravelRoutes } = require("./Routes/TourTravel.Routes");
const { packageRoutes } = require("./Routes/Package.Routes");
const { AdminRegisterRoutes } = require("./Routes/AdminRegister.Routes");
const {  AdminApprovedRoutes } = require("./Routes/AdminAprovedHotel.Routes");
const { AdminApprovelRejectedRouter } = require("./Routes/AdminRejected.Routes");
const { VendorRoutes } = require("./Routes/Vendor.Routes");
const { hotelDataRoutes } = require("./Routes/HotelData.Routes");
const fs = require("fs");
const { parse } = require("path");
const { BookingRouter } = require("./Routes/Booking.Routes");
const { record } = require("./middleware/logger.middleware");
const { CommentRoutes } = require("./Routes/Comment.routes");
// const { authenticate } = require("./middleware/authentication.middleware");


require("dotenv").config();

const app = express();

app.use(cors({
  origin:"*"
}));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});



// hotelDataRoutes.use(authenticate);

app.use("/agent", AgentRouter);
app.use("/user",UserRouter)
app.use("/admin",AdminRegisterRoutes)
app.use("/vendor",VendorRoutes)





app.use("/hotel",hotelRoutes);
app.use("/nonaproved",AdminApprovedRoutes)

app.use("/package",packageRoutes)
app.use("/rejectaproved",AdminApprovelRejectedRouter)

app.use("/cart",cartRouter)

app.use("/touristplace",tourPlaceRoutes)

app.use("/tourtravel",TourTravelRoutes)
app.use("/comment",CommentRoutes)






app.use("/allhotel",hotelDataRoutes)

app.use("/book",BookingRouter)


// app.use("/val",AllhotelRoutes)

app.listen(process.env.port, async () => {
  try {
    await connection;
    console.log("connect to db");
  } catch (err) {
    console.log("Error while connecting to DB");
    console.log(err);
  }
  console.log(`Server running at ${process.env.port}`);
});


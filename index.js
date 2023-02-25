const express = require("express");

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


require("dotenv").config();

const app = express();

// app.use(cors({
//   origin:"*"
// }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});

function recordMiddleware(req, res, next) {
  const recordData = req.body; 
  console.log(`Record data: ${JSON.stringify(recordData)}`);
  next(); // call the next middleware function in the chain
}

// Use the recordMiddleware function for all requests
app.use(recordMiddleware);



app.use("/agent", AgentRouter);


app.use("/user",UserRouter)

// app.use("/allhotel",AllhotelRoutes)


app.use("/hotel",hotelRoutes);

app.use("/nonaproved",AdminApprovedRoutes)

app.use("/rejectaproved",AdminApprovelRejectedRouter)

app.use("/cart",cartRouter)

app.use("/touristplace",tourPlaceRoutes)

app.use("/tourtravel",TourTravelRoutes)

app.use("/package",packageRoutes)

app.use("/admin",AdminRegisterRoutes)

app.use("/new",VendorRoutes)

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


const express = require("express");

const { connection } = require("./configs/db");

const { wenderRouter } = require("./Routes/Wender.routes");

const { hotelRoutes } = require("./Routes/Hotel.routes");
const { UserRouter } = require("./Routes/User.routes");
const { AllhotelRoutes } = require("./Routes/AllHotel.Routes");
const { cartRouter } = require("./Routes/Cart.Routes");
const { tourPlaceRoutes } = require("./Routes/TouristPlace.Routes");
const { TourTravelRoutes } = require("./Routes/TourTravel.Routes");






require("dotenv").config();

const app = express();

// app.use(cors({
//   origin:"*"
// }));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome");
});


app.use("/vendor", wenderRouter);

app.use("/user",UserRouter)

app.use("/allhotel",AllhotelRoutes)

app.use("/hotel",hotelRoutes);

app.use("/cart",cartRouter)

app.use("/touristplace",tourPlaceRoutes)

app.use("/tourtravel",TourTravelRoutes)


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


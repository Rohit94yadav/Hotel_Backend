const {mongoose} = require("mongoose");

const hotelSchema = mongoose.Schema({
    hotelName: { type: String, required: true, unique: true },
    image_url: [{ type: String, required: true }],
    email: { type: String, required: true},
    phoneNumber:{ type: Number, required: true},
    address:{ type: String, required: true},
    city:{ type: String, required: true},
    pinCode:{ type: Number, required: true},
    rating:{ type: Number, required: true},
    facilites:{ type: String, required: true},
    allRooms:[
      {
        roomType:{ type: String, required: true},
        numberofRooms:{ type: Number, required: true},
        priceperNight:{ type: Number, required: true},
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "wender",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
  const HotelModel = mongoose.model("hotel_data", hotelSchema);

  module.exports = {
    HotelModel,
  };
const { mongoose } = require("mongoose");

const hotelSchema = mongoose.Schema(
  {
    hotelName: { type: String,  unique: true },
    image_url: [{ type: String, }],
    email: { type: String, },
    phoneNumber: { type: Number, },
    address: { type: String, },
    city: { type: String, },
    pinCode: { type: Number, },
    rating: { type: Number, },
    facilites: { type: String, },
    ownerName: { type: String, },
    contactName: { type: String },
    isApprovedByAdmin:{type:String, default:"false"},
    allRooms: [
      {
        roomType: { type: String, },
        numberofRooms: { type: Number, },
        priceperNight: { type: Number, },
      },
    ]
  },
  {
    versionKey: false,
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

const HotelModel = mongoose.model("hotel_data", hotelSchema);

module.exports = {
  HotelModel,
};

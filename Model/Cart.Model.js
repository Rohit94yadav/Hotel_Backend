const mongoose = require("mongoose");

const cartSchema = new mongoose.Schema(
  {
    hotelName: { type: String, required: true },
    userName:{ type: String, required: true },
    userNumber:{ type: Number, required: true },
    userEmail:{ type: String, required: true },
    roomType:{ type: String, required: true },
    bookingDate:{ type: Number, required: true },
    numberofRooms:{type: Number, required: true },
    numberofPerson:{ type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
      required: true,
    }
  },
  {
    versionKey: false,
    timestamps: true,
  }
);


const CartModel = mongoose.model("cart", cartSchema);

module.exports={
  CartModel
}
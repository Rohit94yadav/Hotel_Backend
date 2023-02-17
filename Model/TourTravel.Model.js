const {mongoose} = require("mongoose");

const TourTravelSchema = mongoose.Schema({
    companyName: { type: String, required: true, unique: true },
    image_url: [{ type: String, required: true }],
    email: { type: String, required: true},
    contact:{ type: Number, required: true},
    address:{ type: String, required: true},
    city:{ type: String, required: true},
    pinCode:{ type: Number, required: true},
    rating:{ type: Number, required: true},
    facilites:{ type: String, required: true},
    package:[
      {
        Typevehicle:{ type: String, required: true},
        person:{ type: Number, required: true},
        price:{ type: Number, required: true},
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
  
  const TourModel = mongoose.model("tourtravel_data", TourTravelSchema);

  module.exports = {
    TourModel,
  };
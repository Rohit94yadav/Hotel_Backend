const {mongoose} = require("mongoose");

const TouristPlaceSchema = mongoose.Schema({
  
    placeName: { type: String, required: true, unique: true },
    image_url: [{ type: String, required: true }],
    address:{ type: String, required: true},
    city:{ type: String, required: true},
    pinCode:{ type: Number, required: true},
    rating:{ type: Number, required: true},
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
  
  const TouristModel = mongoose.model("Tourist_data", TouristPlaceSchema);

  module.exports = {
    TouristModel,
  };
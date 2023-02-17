const {mongoose} = require("mongoose");

const packageSchema = mongoose.Schema({
    placeName: { type: String, required: true, unique: true },
    image_url: [{ type: String, required: true }],
    phoneNumber:{ type: Number,},
    city:{ type: String, required: true},
    rating:{ type: Number, required: true},
    duration:[
      {
        day:{ type: Number, required: true},
        night:{ type: Number, required: true},
        hotel:{ type: String, required: true},
        place:{ type: String, required: true}
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
  
  const PackageModel = mongoose.model("package", packageSchema);

  module.exports = {
    PackageModel,
  };
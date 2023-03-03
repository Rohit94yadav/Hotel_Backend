const { mongoose } = require("mongoose");

const hotelDataSchema = mongoose.Schema(
  {
    hotelId:{ type: String,  },
    name: { type: String,},
    image_url: [{ type: String, }],
    email: { type: String,  },
    phone: { type: Number,  },
    address: { type: String,  },
    city: { type: String,  },
    pinCode: { type: Number,  },
    rating: { type: Number,  },
    ownerName: { type: String,  },
    contactName: { type: String },
    date:{type: Number},

    alltypes:[
      {
        type:{ type: String,},
        numberofitem:{ type: Number },
        price:{ type: Number },
        facilites:{ type: String, },
        availableitem:{ type: Number },
        discountprice:{ type: Number },
        description:{type:String},
        off:{ type: Number}
      }
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
      
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
  const HotelDataModel = mongoose.model("data", hotelDataSchema);

  module.exports = {
    HotelDataModel,
  };
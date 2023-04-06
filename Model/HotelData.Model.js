const { mongoose } = require("mongoose");

const hotelDataSchema = mongoose.Schema(
  {
    name: { type: String,},
    image_url: [{ type: String, }],
    email: { type: String,  },
    phone: { type: Number,  },
    address: { type: String,  },
    city: { type: String,  },
    pinCode: { type: Number,  },
    rating:{ type: Number, default:0 },
    ownerName: { type: String,  },
    contactName: { type: String },
    date:{type: String,default:new Date()},
    alltypes:[
      {
        type:{ type: String,default:"basic" },
        numberofitem:{ type: Number,default:0 },
        price:{ type: Number,default:0 },
        facilites:{ type: String,default:"basic" },
        availableitem:{ type: Number,default:0 },
        discountprice:{ type: Number,default:0 },
        description:{type:String,default:"basic"},
        off:{ type: Number,default:0 },

      }
    ],
    AdminId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "admin",
    },
    hotelId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "hotel",
    },
    AgentId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "agent",
    },
    vendorId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "vendor",
    }
  },
  {
    versionKey: false,
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  }
  );
  
 const HotelDataModel = mongoose.model("hotel", hotelDataSchema);

  module.exports = {
    HotelDataModel,
  };
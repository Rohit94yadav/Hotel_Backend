
const fs = require("fs");
const { UserModel } = require("../Model/User.model");
const record = async(req, res, next) => {
  
    const user=await UserModel.findById(req.body.userId);
    if (
      (req.method == "POST") ||
      (req.method == "PATCH")
    ) {
      try {
        fs.appendFileSync(
          "./middleware/record.txt",
          `\n The document with id:${user._id} has been ${
            req.method == "PATCH" ? "Adding Data" : "POST"
          }${req.params.id} `
        );
        next();
      } catch (error) {
        console.log(error);
        res.status(400).send("something went wrong on record middleware");
      }
    } else {
      next();
    }
};
module.exports = { record };

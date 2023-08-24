const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    emailID: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    userType_Id: { type: mongoose.Schema.Types.ObjectId, ref: "UserTypes" },
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users", AppSchema, "Users");

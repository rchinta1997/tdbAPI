const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    VendorName: { type: String, required: true },
    MobileNumber: { type: Number, required: true },
    PhoneNumber: { type: String },
    PANNumber: { type: String },
    Address: { type: String },
    user_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Vendors", AppSchema, "Vendors");

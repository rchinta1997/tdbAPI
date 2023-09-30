const mongoose = require("mongoose");

const AppSchema = mongoose.Schema(
  {
    VendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors" },
    Outlet_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Outlets" },
    name: { type: String, required: true },
    emailID: { type: String, required: true },
    password: { type: String, required: true },
    mobileNumber: { type: String, required: true },    
    isActive: { type: Boolean, required: true, default: false },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OutletUsers", AppSchema, "OutletUsers");

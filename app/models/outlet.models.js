const mongoose = require("mongoose");

const outletSchema = mongoose.Schema(
  {
    Outlet_id: { type: Number },
    EmailAddress:{type:String,required:true},
    OutletName: { type: String, required: true },
    ContactPerson: { type: String, required: true },
    ContactMobileNumber: { type: String, required: true },
    Station_Id: { type: mongoose.Schema.Types.ObjectId, ref: "Stations" },
    Address: { type: String },
    Order_Timing: { type: Number },
    Min_Order: { type: Number },
    Opening_Time: { type: String },
    Closing_Time: { type: String },
    Delivery_Cost: { type: Number },
    Prepaid: { type: Boolean },
    City: { type: String },
    State: { type: String },
    Company_Name: { type: String },
    GST_NO: { type: String },
    FSSAI_NO: { type: String },
    FSSAI_Valid_Upto: { type: Date },
    Closing_Period_From: { type: Date },
    Closing_Period_To: { type: Date },
    WeeklyClosed: { type: Array },
    Logo_Id: { type: mongoose.Schema.Types.ObjectId, ref: "photos.files" },
    NutriDocument_Id: { type: mongoose.Schema.Types.ObjectId, ref: "photos.files" },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean},
    VendorId: { type: mongoose.Schema.Types.ObjectId, ref: "Vendors" }
  },
  { timestamps: true }
);

outletSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("Outlets", outletSchema, "Outlets");

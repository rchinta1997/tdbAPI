const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema(
  {
    Order_Id: { type: String, required: true },
    Irctc_Order_ID: { type: Number },
    Irctc_Push_Status: { type: Boolean },
    User_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
    Vendor_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Vendors",
    },
    Outlet_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Outlets",
    },
    Comment: { type: String },
    Booking_Date: { type: String, required: true },
    Delivery_Date: { type: String, required: true },
    Item_Value: { type: mongoose.Types.Decimal128 },
    Total_Amount: { type: mongoose.Types.Decimal128 },
    Total_Margin: { type: mongoose.Types.Decimal128 },
    GST: { type: mongoose.Types.Decimal128 },
    Discount_Amount: { type: mongoose.Types.Decimal128 },
    Amount_Payable: { type: mongoose.Types.Decimal128 },
    Train_No: { type: Number, required: true },
    Train_Name: { type: String },
    Station_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Stations",
    },
    
    Berth: { type: String },
    Coach: { type: String },
    Estimated_Arrival: { type: String },
    Estimated_Departure: { type: String },
    No_Of_Seats: { type: Number },
    Payment_Mode: { type: String },
    RazorPayOrderID: { type: String },
    Razor_Payment_Id: { type: String },
    Order_Status_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrderStatusMaster",
    },
    Refund_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Refunds",
    },
    Log_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Logs",
    },

    OrderSource_Id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "OrdersSource",
    },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// OrdersSchema.virtual("id").get(function () {
//   return this._id.toHexString();
// });

module.exports = mongoose.model("Orders", OrdersSchema, "Orders");

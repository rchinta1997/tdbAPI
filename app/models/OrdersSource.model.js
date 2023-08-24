const mongoose = require("mongoose");

const OrdersSourceSchema = mongoose.Schema(
  {
    OrderSource:{type:String,required:true},
    isActive: { type: Boolean, required: true, default: true },
    isDelete: { type: Boolean, required: true, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("OrdersSource", OrdersSourceSchema, "OrdersSource");

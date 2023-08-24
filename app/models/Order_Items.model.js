const mongoose = require("mongoose");

const OrderItemsSchema = mongoose.Schema(
  {
    Order_ID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Orders",
    },
    Item_ID: { type: mongoose.Schema.Types.ObjectId, ref: "MenuItems" },
    Quantity: { type: Number },
    Amount: { type: String },
    isDelete: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

OrderItemsSchema.virtual("id").get(function () {
  return this._id.toHexString();
});

module.exports = mongoose.model("OrderItems", OrderItemsSchema, "OrderItems");

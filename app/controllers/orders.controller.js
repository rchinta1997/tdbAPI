const OrderService = require("../Services/orders.service");
const OrderServiceInstance = new OrderService();

module.exports = {
  createOrder,
  getAllOrders
};

async function createOrder(req, res) {
  try {
    const createdCord = await OrderServiceInstance.createOrder(req, res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllOrders(req, res) {
  try {
    const createdCord = await OrderServiceInstance.getAllOrders();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

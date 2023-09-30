const OrderService = require("../Services/orders.service");
const OrderServiceInstance = new OrderService();

module.exports = {
  createOrder,
  getAllOrders,
  getOrdersByVendorId,
  getAllOrderStatus,
  updateOrderStatus,
  getOrdersByDate
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

async function getOrdersByVendorId(req, res) { 
  try {
    const createdCord = await OrderServiceInstance.getOrdersByVendorId(req.params.vendorId);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllOrderStatus(req, res) { 
  try {
    const createdCord = await OrderServiceInstance.getAllOrderStatus();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}
  

async function updateOrderStatus(req, res) { 
  try {
    const createdCord = await OrderServiceInstance.updateOrderStatus(req,res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOrdersByDate(req, res) {
  try {
    const createdCord = await OrderServiceInstance.getOrdersByDate(req);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}




const MenuItemService = require("../Services/MenuItems.service");
const MenuItemServiceInstance = new MenuItemService();

module.exports = {
  createMenuItems,
  getMenuByOutlet,
  createBulkMenuItems
};

async function createMenuItems(req, res) {
  try {
    const createdCord = await MenuItemServiceInstance.createMenu(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createBulkMenuItems(req, res) {
  try {
    const createdCord = await MenuItemServiceInstance.createBulkMenuItems(req.params.outletId,
      req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getMenuByOutlet(req, res) {
  try {
    const createdCord = await MenuItemServiceInstance.getMenuByOutlet(
      req.params.outletId
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

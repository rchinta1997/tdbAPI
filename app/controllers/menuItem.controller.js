const MenuItemService = require("../Services/MenuItems.service");
const MenuItemServiceInstance = new MenuItemService();

module.exports = {
  createMenuItems,
  getMenuByOutlet,
  createBulkMenuItems,
  getFoodTypesCusineTypes,
  createMenuItem,
  getMenuItemsList
};

async function createMenuItems(req, res) {
  try {
    console.log("req.body",req.body);
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

async function getFoodTypesCusineTypes(req, res) {
  try {
    const resultData = await MenuItemServiceInstance.getFoodTypesCuisineTypes();
    console.log("Result Data",resultData);
    let response = {}
    return res.send(resultData);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createMenuItem(req, res) {
  try {
    console.log("req.body",req.body);
    const createdCord = await MenuItemServiceInstance.createMenuItem(req,res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getMenuItemsList(req, res) {
  console.log("Menue Items LIST");
  try {
    const items = await MenuItemServiceInstance.getMenuItemsList();
    return res.send(items);
  } catch (err) {
    res.status(500).send(err);
  }
}
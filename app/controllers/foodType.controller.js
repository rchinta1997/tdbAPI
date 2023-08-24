const FoodTypeService = require("../Services/foodType.service");
const FoodTypeServiceInstance = new FoodTypeService();

module.exports = {
  createFoodType,
  getFoodTypesMaster,
};

async function createFoodType(req, res) {
  try {
    const createdCord = await FoodTypeServiceInstance.createFoodType(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getFoodTypesMaster(req, res) {
  try {
    const createdCord = await FoodTypeServiceInstance.getFoodTypesMaster(
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

const CuisineTypeService = require("../Services/cuisineType.service");
const CuisineTypeServiceInstance = new CuisineTypeService();

module.exports = {
  createCuisineType,
  getCuisineMaster,
};

async function createCuisineType(req, res) {
  try {
    const createdCord = await CuisineTypeServiceInstance.createCuisineType(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getCuisineMaster(req, res) {
  try {
    const createdCord = await CuisineTypeServiceInstance.getCuisineMaster(
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

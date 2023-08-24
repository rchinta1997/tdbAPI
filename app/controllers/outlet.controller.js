const OutletService = require("../Services/outlet.service");
const OutletServiceInstance = new OutletService();

module.exports = {
  createOutlet,
  getAllOutlets,
  getOutletsByUserId,
  getOutletsDD,
  updateOutletData,
  getOutletsByStationCode
};

async function createOutlet(req, res) {
  try {
    const createdCord = await OutletServiceInstance.createOutlet(req,res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllOutlets(req, res) {
  try {
    const createdCord = await OutletServiceInstance.getAllOutlets();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOutletsByUserId(req, res) {
  try {
    const createdCord = await OutletServiceInstance.getOutletsByUserId(req.params.vendorId);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOutletsByStationCode(req, res) {
  try {
    const createdCord = await OutletServiceInstance.getOutletsByStationCode(req.params.stationCode);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getOutletsDD(req, res) {
  try {
    const createdCord = await OutletServiceInstance.getOutletsDD();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateOutletData(req, res) {
  try {
    const createdCord = await OutletServiceInstance.updateOutletData(
      req.params.outletId,
      req.body
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}
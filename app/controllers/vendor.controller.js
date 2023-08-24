const VendorService = require("../Services/vendors.service");
const VendorServiceInstance = new VendorService();

module.exports = {
  createVendor,
  getAllVendors,
  updateVendor,
  //getVendorsByStatus,
  //   getVendorDetailsByID,
  //   updateVendor,
};

async function createVendor(req, res) {
  try {
    if (req.body._id !== undefined) {
      return null;
      // let QueryToUpdate={'StationName':req.body.StationName}
      // const getData = await StationsServiceInstance.updateStationData(
      //   req.body._id ,QueryToUpdate
      // );
      // return res.send(getData);
    } else {
      const createdCord = await VendorServiceInstance.createVendor(req.body);
      return res.send(createdCord);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllVendors(req, res) {
  try {
    const createdCord = await VendorServiceInstance.getAllVendors();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateVendor(req, res) {
  try {
    const createdCord = await VendorServiceInstance.updateVendorData(
      req.params.vendorId,
      req.body
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

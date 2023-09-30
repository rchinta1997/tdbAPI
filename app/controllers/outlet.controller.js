const { copyFileSync } = require("fs");
const OutletService = require("../Services/outlet.service");
const OutletServiceInstance = new OutletService();

module.exports = {
  createOutlet,
  getAllOutlets,
  getOutletsByUserId,
  getOutletsDD,
  updateOutletData,
  getOutletsByStationCode,
  getOutletsByVendorId,
  createOutletWithoutDuplicateOutletName,
  duplicate_outlet_check
};

async function createOutlet(req, res) {
  try {
    console.log("========createOutlet===============")
    console.log("createOutlet",req.body);
    const createdCord = await OutletServiceInstance.createOutlet(req,res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function createOutletWithoutDuplicateOutletName(req, res) {
  try {
    console.log("========createOutlet===============")
    console.log("createOutlet",req.body);
    const createdCord = await OutletServiceInstance.createOutlet(req,res);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllOutlets(req, res) {
  try {
    console.log("==========getAllOutlets===============");
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

async function getOutletsByVendorId(req, res) {
  try {
    const createdCord = await OutletServiceInstance.getOutletsByVendorId(req.params.vendorId);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function duplicate_outlet_check(req, res) {
  try {
    const createdCord = await OutletServiceInstance.duplicate_outlet_check(req.params.vendorId);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}
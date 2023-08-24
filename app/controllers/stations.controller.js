const StationsService = require("../Services/stations.service");
const StationsServiceInstance = new StationsService();

module.exports = {
  createStation,
  getAllStations,
  getStationsByID,
  updateStation,
};

async function createStation(req, res) {
  try {
    if (req.body._id !== undefined) {
      let QueryToUpdate={'StationName':req.body.StationName}
      const getData = await StationsServiceInstance.updateStationData(
        req.body._id ,QueryToUpdate
      );
      return res.send(getData);
    } else {
      const createdCord = await StationsServiceInstance.createStation(req.body,req.user);
      return res.send(createdCord);
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getAllStations(req, res) {
  try {
    const createdCord = await StationsServiceInstance.getAllStations();
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getStationsByID(req, res) {
  try {
    const createdCord = await StationsServiceInstance.getStationsByID(
      req.params.stationId
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function updateStation(req, res) {
  try {
    const createdCord = await StationsServiceInstance.updateStationData(
      req.params.stationId,
      req.body
    );
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

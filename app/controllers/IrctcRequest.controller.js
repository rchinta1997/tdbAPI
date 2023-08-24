const IRCTCRequestService = require("../Services/IrctcRequest.service");
const IRCTCRequestServiceInstance = new IRCTCRequestService();

module.exports = {
  searchByPNR
};


async function searchByPNR(req, res) {
  try {
    const createdCord = await IRCTCRequestServiceInstance.searchByPNR(req.params.pnr);
    return res. send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

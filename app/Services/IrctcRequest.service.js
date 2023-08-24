const axios = require("axios");
const { response } = require("express");
const pnrResponse = require("../responses/pnrResponse.json");

class IrctcRequestService {
  constructor() {}

  async searchByPNR(pnr) {
    try {
      const res = await axios
        .get(process.env.REACT_APP_IRCTC_URL + `pnr/vendor?pnr=${pnr}`, {
          withCredentials: false,
        })
        .then((response) => {
          if (response.status === 200) {
            return { success: true, body: response.data.result };
            //return { success: true, body: pnrResponse.result };
          }
        })
        .catch((error) => {
          return { success: false, message: error.response.data.message};
        });
      return res;
    } catch (err) {
      return { success: false, error: err };
    }
  }
}

module.exports = IrctcRequestService;

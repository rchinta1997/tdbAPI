const UserService = require("../Services/user.service");
const UserServiceInstance = new UserService();

module.exports = { createUser, deleteUser, getUserById, authenticate, getConsumers };

async function createUser(req, res) {
  try {
    const createdCord = await UserServiceInstance.createUser(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function authenticate(req, res) {
  try {
    const createdCord = await UserServiceInstance.authenticate(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function deleteUser(req, res) {
  try {
    const createdCord = await UserServiceInstance.deleteUser(req.body);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

async function getUserById(req, res) {
  try {
    if (!req.user) return res.status(401).send("Unauthorized, Invalid Token");
    let id = req.params.userId;
    console.log(id);
    const createdCord = await UserServiceInstance.getUserByID(id);
    return res.send(createdCord);
  } catch (err) {
    res.status(500).send(err);
  }
}

  async function getConsumers(req,res){
    try {
      const createdCord = await UserServiceInstance.getConsumers();
      return res.send(createdCord);
    } catch (err) {
      res.status(500).send(err);
    } 
  }


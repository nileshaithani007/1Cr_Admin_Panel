const {
  getAllTechnologies,
  getAllActiveTechnologies,
  addTechnology,
  updateTechnology,
  deactivateTechnology,
  activateTechnology,
  GetTechnologyName,
} = require("../controllers/technology.controller");

const TechnologyRoute = require("express").Router();

TechnologyRoute.get("/getAllTechnology", getAllTechnologies);
TechnologyRoute.get("/getAllActiveTechnology", getAllActiveTechnologies);
TechnologyRoute.post("/createTechnology", addTechnology);
TechnologyRoute.post("/updateTechnology", updateTechnology);
TechnologyRoute.post("/deactivateTechnology", deactivateTechnology);
TechnologyRoute.post("/activateTechnology", activateTechnology);
TechnologyRoute.get("/get/technologyname", GetTechnologyName);

module.exports = TechnologyRoute;

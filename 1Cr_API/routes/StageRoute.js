const {
  getStages,
  createStageDetails,
  updateStageDetails,
} = require("../controllers/StageController");

const StageRoute = require("express").Router();

StageRoute.get("/getStages", getStages);
StageRoute.post("/createStage", createStageDetails);
StageRoute.post("/updateStage", updateStageDetails);

module.exports = StageRoute;

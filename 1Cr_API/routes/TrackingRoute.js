const {
  getAllTrackings,
  getAllActiveTrackings,
  addTracking,
  updateTracking,
  deactivateTracking,
  activateTracking,
} = require("../controllers/trackingController");

const TrackingRoute = require("express").Router();

TrackingRoute.get("/getAllTracking", getAllTrackings);
TrackingRoute.get("/getAllActiveTracking", getAllActiveTrackings);
TrackingRoute.post("/createTracking", addTracking);
TrackingRoute.post("/updateTracking", updateTracking);
TrackingRoute.post("/deactivateTracking", deactivateTracking);
TrackingRoute.post("/activateTracking", activateTracking);

module.exports = TrackingRoute;

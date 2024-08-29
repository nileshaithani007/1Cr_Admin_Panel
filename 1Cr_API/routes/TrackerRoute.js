const express = require('express');
const TrackerRouter = express.Router();

const Tracker = require('../controllers/TrackerController.js')

TrackerRouter.post("/create", Tracker.CreateTrackerData);
TrackerRouter.post("/get", Tracker.GetTrackerData);
TrackerRouter.put("/update", Tracker.UpdateTrackerData);
TrackerRouter.put("/delete", Tracker.DeactivateTrackerData);

module.exports = TrackerRouter;
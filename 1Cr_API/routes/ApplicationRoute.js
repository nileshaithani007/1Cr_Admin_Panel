const express = require("express");
const ApplicationRouter = express.Router();

const Application = require("../controllers/ApplicationController.js");

ApplicationRouter.post("/create", Application.CreateApplication);
ApplicationRouter.get("/get", Application.GetApplication);
ApplicationRouter.put("/update", Application.UpdateApplication);
ApplicationRouter.get("/get/applicationname", Application.GetApplicationName);

module.exports = ApplicationRouter;

const express = require("express");
const ProcessRouter = express.Router();

const Process = require("../controllers/ProcessController");

ProcessRouter.post("/create", Process.CreateProcess);
ProcessRouter.post("/get", Process.GetProcess);
ProcessRouter.get("/get/name", Process.GetProcessName);
// ApplicationRouter.put("/update", Application.UpdateApplication);

module.exports = ProcessRouter;

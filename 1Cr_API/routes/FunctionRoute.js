const express = require('express');
const FunctionRouter = express.Router();

const Function = require('../controllers/FunctionController.js')

FunctionRouter.post("/create", Function.CreateFunction);
FunctionRouter.get("/get", Function.GetFunction);
FunctionRouter.get("/getAllActiveFunction", Function.GetActiveFunction);
FunctionRouter.put("/update", Function.UpdateFunction);

module.exports = FunctionRouter;
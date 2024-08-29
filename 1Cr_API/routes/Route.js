const express = require('express');
const router = express.Router();

const Function = require('../controllers/FunctionController.js')


const Role = require("../controllers/RoleController.js");
const Process = require("../controllers/ProcessController");

router.post("/function/create", Function.CreateFunction);

// Process Master Route
router.post("/process/action", Process.spProcess);
 
// ---------------------------Role Master Route -----------------------------------
router.post("/Role/action", Role.spRoleController);
 

module.exports = router;

 

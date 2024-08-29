const { poolPromise } = require("../data/dbconfig.js");
const sql = require("mssql");
const { apiResponseHandler } = require("../utils/apiResponseHandler.js");
const {
  getAllStages,
  CheckStageByStageName,
  createStage,
  updateStage,
  addStage,
} = require("../Models/queryBuilder.js");

//========================get all User=================================

const getStages = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all devices
    const result = await pool.request().query(getAllStages);

    const payload = await apiResponseHandler("Success", 2007, result.recordset);
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    // console.log("ERROR: ", error);
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

//======================Create Stage=========================

const createStageDetails = async (req, res) => {
  const { stage_name } = req.body;
  console.log(req.body);

  if (!stage_name) {
    const payload = await apiResponseHandler("Failed", "Unable to fetch data");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    const pool = await poolPromise;

    // Check if the Transformation name exists
    const stageExists = await pool
      .request()
      .input("stage_name", sql.VarChar, stage_name)
      .query(CheckStageByStageName);

    console.log("===============>", stageExists);

    const existing = stageExists.recordset;
    console.log("Existing Stage: ", existing);

    if (existing.length > 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Stage Name already exists"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    const result = await pool
      .request()
      .input("stage_name", sql.VarChar, stage_name)
      .query(addStage);
    console.log("Here", result);
    const payload = await apiResponseHandler(
      "Success",
      "Stage added successfully",
      result
    );
    return res.status(201).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

const updateStageDetails = async (req, res) => {
  const { stage_name, stage_id } = req.body;
  console.log(req.body);

  if (!stage_name || !stage_id) {
    const payload = await apiResponseHandler("Failed", "Unable to fetch data");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    const pool = await poolPromise;

    // Check if the Transformation name exists
    const stageExists = await pool
      .request()
      .input("stage_name", sql.VarChar, stage_name)
      .query(CheckStageByStageName);

    const existing = stageExists.recordset;
    console.log("Existing Stage: ", existing);

    if (existing.length > 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Stage Name already exists"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    const result = await pool
      .request()
      .input("stage_name", sql.VarChar, stage_name)
      .query(updateStage);
    console.log("Here", result);
    const payload = await apiResponseHandler(
      "Success",
      "Stage added successfully",
      result
    );
    return res.status(201).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

module.exports = {
  getStages,
  createStageDetails,
  updateStageDetails,
};

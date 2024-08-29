const { poolPromise } = require("../data/dbconfig.js");
const {
  selectAllTechnologies,
  selectTechnologyByTechnologyName,
  InsertTechnology,
  UpdateTechnology,
  DeactivateTechnology,
  ActivateTechnology,
  selectAllActiveTechnologies,
} = require("../Models/queryBuilder.js");
const { apiResponseHandler } = require("../utils/apiResponseHandler.js");
const sql = require("mssql");

//========================create Technology=================================
const addTechnology = async (req, res) => {
  const { technology_name } = req.body;
  //   console.log(req.body);

  // Validation
  if (!technology_name) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the technology name already exists
    const result = await pool
      .request()
      .input("technology_name", sql.VarChar, technology_name)
      .query(selectTechnologyByTechnologyName);

    console.log("Result: ", result);

    const existingTechnology = result.recordset;

    if (existingTechnology.length > 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Technology Already Exists"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    // Add a new technology
    const addTechnologyResult = await pool
      .request()
      .input("technology_name", sql.VarChar, technology_name)
      .query(InsertTechnology);
    console.log(addTechnologyResult);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      addTechnologyResult
    );

    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({
      data: payload,
    });
  }
};

//=========================Get Technology Name===============

const GetTechnologyName = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `select tm.technology_id as value ,tm.technology_name as label from dbo.technology_master tm where tm.is_active=1`;
    const result = await pool.request().query(query);

    if (query) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(404).json({ message: "No process found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

//========================get all Technologies=================================

const getAllTechnologies = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all technologies
    const result = await pool.request().query(selectAllTechnologies);

    const payload = await apiResponseHandler(
      "Success",
      "Data Retrieved Successfully",
      result.recordset
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({
      data: payload,
    });
  }
};

//===================get All active technologies =================
const getAllActiveTechnologies = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all active technologies
    const result = await pool.request().query(selectAllActiveTechnologies);

    const payload = await apiResponseHandler(
      "Success",
      "Data Retrieved Successfully",
      result.recordset
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({
      data: payload,
    });
  }
};

//================update Technology =============================
const updateTechnology = async (req, res) => {
  const { technology_id, technology_name, is_active: isActive } = req.body;

  // Convert isActive to boolean
  let is_active = isActive === 1 ? true : isActive === 0 ? false : undefined;

  // Log the request body for debugging
  console.log("Request Body:", req.body);

  // Validation
  if (!technology_id || !technology_name || typeof is_active !== "boolean") {
    const payload = await apiResponseHandler(
      "Failed",
      "Validation Error: Missing or invalid fields"
    );
    return res.status(400).json({ data: payload });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the technology name already exists
    const result = await pool
      .request()
      .input("technology_name", sql.VarChar, technology_name)
      .query(selectTechnologyByTechnologyName);

    console.log("Technology Name Check Result:", result);

    const existingTechnology = result.recordset;

    // Check if a technology with the same name already exists
    if (
      existingTechnology.length > 0 &&
      existingTechnology[0].technology_id !== technology_id
    ) {
      const payload = await apiResponseHandler(
        "Failed",
        "Technology already exists"
      );
      return res.status(400).json({ data: payload });
    }

    // Update the technology
    const updateTechnologyResult = await pool
      .request()
      .input("technology_id", sql.Int, technology_id)
      .input("technology_name", sql.VarChar, technology_name)
      .input("is_active", sql.Bit, is_active ? 1 : 0)
      .query(UpdateTechnology);

    // Check if the update was successful
    if (updateTechnologyResult.rowsAffected[0] === 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Technology not found or update failed"
      );
      return res.status(404).json({ data: payload });
    }

    // Success response
    const payload = await apiResponseHandler(
      "Success",
      "Technology updated successfully",
      updateTechnologyResult
    );
    return res.status(200).json({ data: payload });
  } catch (error) {
    // Log the error and send a response
    console.error("Error updating technology:", error);
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({ data: payload });
  }
};

//=================== deactivate technology =================
const deactivateTechnology = async (req, res) => {
  const { technology_id } = req.body;
  console.log(req.body);

  // Validation
  if (!technology_id) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Deactivate the technology
    const deactivateTechnologyResult = await pool
      .request()
      .input("technology_id", sql.Int, technology_id)
      .query(DeactivateTechnology);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      deactivateTechnologyResult
    );

    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({
      data: payload,
    });
  }
};

//===============activate technology============================
const activateTechnology = async (req, res) => {
  const { technology_id } = req.body;
  console.log(req.body);

  // Validation
  if (!technology_id) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Activate the technology
    const activateTechnologyResult = await pool
      .request()
      .input("technology_id", sql.Int, technology_id)
      .query(ActivateTechnology);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      activateTechnologyResult
    );

    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({
      data: payload,
    });
  }
};

module.exports = {
  addTechnology,
  getAllTechnologies,
  getAllActiveTechnologies,
  updateTechnology,
  deactivateTechnology,
  activateTechnology,
  GetTechnologyName,
};

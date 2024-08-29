const { poolPromise } = require("../data/dbconfig.js");

const sql = require("mssql");
const { apiResponseHandler } = require("../utils/apiResponseHandler.js");
const {
  selectTrackingByTrackingName,
  InsertTracking,
  selectAllTrackings,
  selectAllActiveTrackings,
  UpdateTracking,
  DeactivateTracking,
  ActivateTracking,
} = require("../Models/queryBuilder.js");

//========================create Tracking=================================
const addTracking = async (req, res) => {
  const { tracking_name } = req.body;

  // Validation
  if (!tracking_name) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the tracking name already exists
    const result = await pool
      .request()
      .input("tracking_name", sql.VarChar, tracking_name)
      .query(selectTrackingByTrackingName);

    console.log("Result: ", result);

    const existingTracking = result.recordset;

    if (existingTracking.length > 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Tracking Already Exists"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    // Add a new tracking
    const addTrackingResult = await pool
      .request()
      .input("tracking_name", sql.VarChar, tracking_name)
      .query(InsertTracking);
    console.log(addTrackingResult);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      addTrackingResult
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

//========================get all Trackings=================================

const getAllTrackings = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all trackings
    const result = await pool.request().query(selectAllTrackings);

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

//===================get All active trackings =================
const getAllActiveTrackings = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all active trackings
    const result = await pool.request().query(selectAllActiveTrackings);

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

//================update Tracking =============================
const updateTracking = async (req, res) => {
  const { id, tracking_name, is_active } = req.body;

  // Log the request body for debugging
  console.log(req.body);
  // // Convert isActive to boolean
  // let is_active = isActive === 1 ? true : isActive === 0 ? false : undefined;

  // Validation
  if (!id || !tracking_name || typeof is_active !== "boolean") {
    const payload = await apiResponseHandler(
      "Failed",
      "Validation Error: Missing or invalid fields"
    );
    return res.status(400).json({ data: payload });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the tracking name already exists for a different ID
    const result = await pool
      .request()
      .input("tracking_name", sql.VarChar, tracking_name)
      .query(selectTrackingByTrackingName);

    console.log("Tracking Name Check Result: ", result);

    const existingTracking = result.recordset;

    // Check if a tracking with the same name exists but has a different ID
    if (existingTracking.length > 0 && existingTracking[0].id !== id) {
      const payload = await apiResponseHandler(
        "Failed",
        "Tracking name already exists for a different ID"
      );
      return res.status(400).json({ data: payload });
    }

    // Update the tracking
    const updateTrackingResult = await pool
      .request()
      .input("id", sql.Int, id)
      .input("tracking_name", sql.VarChar, tracking_name)
      .input("is_active", sql.Bit, is_active ? 1 : 0)
      .query(UpdateTracking);

    // Check if the update was successful
    if (updateTrackingResult.rowsAffected[0] === 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Tracking not found or update failed"
      );
      return res.status(404).json({ data: payload });
    }

    // Success response
    const payload = await apiResponseHandler(
      "Success",
      "Tracking updated successfully",
      updateTrackingResult
    );
    return res.status(200).json({ data: payload });
  } catch (error) {
    // Log the error and send a response
    console.error("Error updating tracking: ", error);
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({ data: payload });
  }
};

//=================== deactivate tracking =================
const deactivateTracking = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  // Validation
  if (!id) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Deactivate the tracking
    const deactivateTrackingResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(DeactivateTracking);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      deactivateTrackingResult
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

//===============activate tracking============================
const activateTracking = async (req, res) => {
  const { id } = req.body;
  console.log(req.body);

  // Validation
  if (!id) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Activate the tracking
    const activateTrackingResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(ActivateTracking);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      activateTrackingResult
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
  addTracking,
  getAllTrackings,
  getAllActiveTrackings,
  updateTracking,
  deactivateTracking,
  activateTracking,
};

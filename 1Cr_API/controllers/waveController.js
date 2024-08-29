const { poolPromise } = require("../data/dbconfig.js");

const sql = require("mssql");
const { apiResponseHandler } = require("../utils/apiResponseHandler.js");
const {
  InsertWave,
  selectAllWaves,
  selectAllActiveWaves,
  UpdateWave,
  DeactivateWave,
  ActivateWave,
  selectWaveByWaveNumber,
} = require("../Models/queryBuilder.js");

//========================create Wave=================================
const addWave = async (req, res) => {
  const { wave_number, wave_duration } = req.body;
  console.log(req.body);

  // Validation
  if (!wave_number || !wave_duration) {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the wave name already exists
    const result = await pool
      .request()
      .input("wave_number", sql.VarChar, wave_number)
      .query(selectWaveByWaveNumber);

    console.log("Result: ", result);

    const existingWave = result.recordset;

    if (existingWave.length > 0) {
      const payload = await apiResponseHandler("Failed", "Wave Already Exists");
      return res.status(400).json({
        data: payload,
      });
    }

    // Add a new wave
    const addWaveResult = await pool
      .request()
      .input("wave_number", sql.VarChar, wave_number)
      .input("wave_duration", sql.BigInt, wave_duration)
      .query(InsertWave);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      addWaveResult
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

//=========================Get Wave Name===============

const GetWaveNumber = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `select wm.id as value ,wm.wave_number as label from dbo.wave_master wm where wm.is_active=1`;
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

//========================get all Waves=================================

const getAllWaves = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Get all waves
    const result = await pool.request().query(selectAllWaves);

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

//===================get All active waves =================
const getAllActiveWaves = async (req, res) => {
  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    const result = await pool.request().query(selectAllActiveWaves);
    if (result) {
      return res.status(200).json(result.recordset);
    } else {
      return res.status(404).json({ message: "No wave found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

//================update Wave =============================
const updateWave = async (req, res) => {
  const { id, wave_number, wave_duration, is_active } = req.body;
  console.log(req.body);

  // // Convert isActive to boolean
  // let is_active = isActive === 1 ? true : isActive === 0 ? false : undefined;

  // Validation
  if (!id || !wave_number || !wave_duration || typeof is_active !== "boolean") {
    const payload = await apiResponseHandler("Failed", "Validation Error");
    return res.status(400).json({ data: payload });
  }

  try {
    // Get the pool from poolPromise
    const pool = await poolPromise;

    // Check if the wave number already exists for a different ID
    const result = await pool
      .request()
      .input("wave_number", sql.VarChar, wave_number)
      .query(selectWaveByWaveNumber);

    console.log("Result: ", result);

    const existingWave = result.recordset;

    if (existingWave.length > 0 && existingWave[0].id !== id) {
      const payload = await apiResponseHandler("Failed", "Wave Already Exists");
      return res.status(400).json({ data: payload });
    }

    // Update the wave
    const updateWaveResult = await pool
      .request()
      .input("id", sql.BigInt, id)
      .input("wave_number", sql.VarChar, wave_number)
      .input("wave_duration", sql.BigInt, wave_duration)
      .input("is_active", sql.Bit, is_active ? 1 : 0)
      .query(UpdateWave);

    if (updateWaveResult.rowsAffected[0] === 0) {
      const payload = await apiResponseHandler("Failed", "Wave Not Found");
      return res.status(404).json({ data: payload });
    }

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      updateWaveResult
    );

    return res.status(200).json({ data: payload });
  } catch (error) {
    console.error("Error updating wave: ", error);
    const payload = await apiResponseHandler("Failed", "Internal Server Error");
    return res.status(500).json({ data: payload });
  }
};

//=================== deactivate wave =================
const deactivateWave = async (req, res) => {
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

    // Deactivate the wave
    const deactivateWaveResult = await pool
      .request()
      .input("id", sql.BigInt, id)
      .query(DeactivateWave);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      deactivateWaveResult
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

//===============activate wave============================
const activateWave = async (req, res) => {
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

    // Activate the wave
    const activateWaveResult = await pool
      .request()
      .input("id", sql.Int, id)
      .query(ActivateWave);

    const payload = await apiResponseHandler(
      "Success",
      "Operation Successful",
      activateWaveResult
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
  addWave,
  GetWaveNumber,
  getAllWaves,
  getAllActiveWaves,
  updateWave,
  deactivateWave,
  activateWave,
};

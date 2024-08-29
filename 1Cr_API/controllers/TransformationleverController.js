const { poolPromise } = require("../data/dbconfig.js");
const sql = require("mssql");
const { apiResponseHandler } = require("../utils/apiResponseHandler.js");
const {
  addTransformationLever,
  getAllTransformationLever,
  fetchTransformationLeverById,
  updateTransformation,
  activatetransformation,
  deactivatetransformation,
  CheckTransformationName,
  getAllActiveTransformationLever,
} = require("../Models/queryBuilder.js");

//========================Create a transformation Lever=================================

const createTransformationLever = async (req, res) => {
  const { transformation_name } = req.body;
  console.log(req.body);

  if (!transformation_name) {
    const payload = await apiResponseHandler("Failed", 2008);
    return res.status(400).json({
      data: payload,
    });
  }

  try {
    const pool = await poolPromise;

    // Check if the Transformation name exists
    const result1 = await pool
      .request()
      .input("transformation_name", sql.VarChar, transformation_name)
      .query(CheckTransformationName);

    const existing = result1.recordset;
    console.log("Existing device: ", existing);

    if (existing.length > 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "Tranformation Name Already Exist"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    const result = await pool
      .request()
      .input("transformation_name", sql.VarChar, transformation_name)
      .query(addTransformationLever);
    console.log("Here", result);
    const payload = await apiResponseHandler(
      "Success",
      "Transformation Lever add successfully",
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

//=========================Get Transformation Name===============

const GetTransformationName = async (req, res) => {
  try {
    console.log("Get Transformation Name==================");
    const pool = await poolPromise;
    const query = `select tlm.lever_id as value ,tlm.lever_name as label from dbo.transformation_lever_master tlm where tlm.is_active=1`;
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

//========================Read all transformation Levers=================================

const getAllTransformationLeverDetails = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(getAllTransformationLever);

    const payload = await apiResponseHandler("Success", 2007, result.recordset);
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

//==========================Get All Active Transforms =========================
const getAllActiveTransformationLeverDetails = async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(getAllActiveTransformationLever);

    const payload = await apiResponseHandler(
      "Success",
      "Get all active Transformation Lever Successfully",
      result.recordset
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};
//========================Read a single transformation Lever by ID=================================

const getTransformationLeverById = async (req, res) => {
  const { transformation_id } = req.body;
  console.log(transformation_id);
  console.log(req);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("transformation_id", sql.BigInt, transformation_id)
      .query(fetchTransformationLeverById);

    const payload = await apiResponseHandler(
      "Success",
      "Transformation fetched successfully",
      result.recordset[0]
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

//========================Update a transformation Lever=================================

const updateTransformationLever = async (req, res) => {
  const { lever_id, lever_name, is_active: isActive } = req.body;
  console.log(req.body);

  // Convert isActive to boolean
  let is_active = isActive === 1 ? true : isActive === 0 ? false : undefined;

  // Validation
  if (!lever_id || !lever_name || typeof is_active !== "boolean") {
    const payload = await apiResponseHandler(
      "Failed",
      "Validation Error: Missing or invalid fields"
    );
    return res.status(400).json({ data: payload });
  }

  try {
    const pool = await poolPromise;

    // Check if the Transformation name exists
    const result1 = await pool
      .request()
      .input("lever_name", sql.VarChar, lever_name)
      .query(CheckTransformationName);

    const existing = result1.recordset;
    console.log("Existing device: ", existing);

    if (existing.length > 0 && existing[0].lever_id !== lever_id) {
      const payload = await apiResponseHandler(
        "Failed",
        "Tranformation Name Already Exist"
      );
      return res.status(400).json({
        data: payload,
      });
    }

    const updateTransformationResult = await pool
      .request()
      .input("lever_name", sql.VarChar, lever_name)
      .input("lever_id", sql.Int, lever_id)
      .input("is_active", sql.Bit, is_active ? 1 : 0)
      .query(updateTransformation);

    // Check if the update was successful
    if (updateTransformationResult.rowsAffected[0] === 0) {
      const payload = await apiResponseHandler(
        "Failed",
        "transformation not found or update failed"
      );
      return res.status(404).json({ data: payload });
    }

    const payload = await apiResponseHandler(
      "Success",
      "transformation Lever updated successfully"
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

//==Activate Transformation

const ActivateTransforamtion = async (req, res) => {
  const { transformation_id } = req.body;
  console.log(req.body);
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("transformation_id", sql.Int, transformation_id)
      .query(activatetransformation);

    const payload = await apiResponseHandler(
      "Success",
      "Transformation activated successfully ",
      result
    );
    return res.status(200).json({
      data: payload,
    });
  } catch (error) {
    const payload = await apiResponseHandler("Failed", 5000);
    return res.status(500).json({
      data: payload,
    });
  }
};

//==Deactive Transformation

const DeactivateTransforamtion = async (req, res) => {
  const { transformation_id } = req.body;
  console.log("Here");
  try {
    const pool = await poolPromise;
    const result = await pool
      .request()
      .input("transformation_id", sql.Int, transformation_id)
      .query(deactivatetransformation);

    const payload = await apiResponseHandler(
      "Success",
      "Transformation deactivated successfully ",
      result
    );
    return res.status(200).json({
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
  createTransformationLever,
  GetTransformationName,
  getAllTransformationLeverDetails,
  getAllActiveTransformationLeverDetails,
  getTransformationLeverById,
  updateTransformationLever,
  DeactivateTransforamtion,
  ActivateTransforamtion,
};

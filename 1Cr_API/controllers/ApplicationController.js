const { now } = require("moment-timezone");
const { poolPromise } = require("../data/dbconfig");
const sql = require("mssql");

const GetApplication = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `SELECT * from dbo.application_master;`;
    const result = await pool.request().query(query);

    if (query) {
      return res.status(200).json(result.recordset);
    } else {
      return res
        .status(404)
        .json({ message: "No application master data found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

//=========================Get Application Name===============

const GetApplicationName = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `select am.id as value ,am.application_name as label from dbo.application_master am where am.is_active=1`;
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

const CreateApplication = async (req, res) => {
  try {
    const { application_name, created_by } = req.body.data;

    if (application_name === undefined || created_by === undefined) {
      return res
        .status(400)
        .json({ message: "application_name and created_by are required" });
    }

    const pool = await poolPromise;

    const checkQuery = `SELECT COUNT(*) as count FROM dbo.application_master WHERE application_name = @application_name`;
    const checkResult = await pool
      .request()
      .input("application_name", sql.VarChar, application_name)
      .query(checkQuery);

    if (checkResult.recordset[0].count > 0) {
      return res.status(400).json({ message: "Application already exists" });
    }

    const insertQuery = `INSERT INTO dbo.application_master (application_name, created_by, is_active) VALUES (@application_name, @created_by, 1)`;
    const result = await pool
      .request()
      .input("application_name", sql.VarChar, application_name)
      .input("created_by", sql.BigInt, created_by)
      .query(insertQuery);

    return res.status(200).json({ message: "Application added successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const UpdateApplication = async (req, res) => {
  const { id, application_name, is_active, modified_by } = req.body;
  try {
    const pool = await poolPromise;

    const modifiedAt = new Date().toISOString().replace("T", " ").slice(0, 23);
    console.log(modifiedAt);

    const updateQuery = `
      UPDATE dbo.application_master
      SET 
       application_name = @application_name,
        is_active = @is_active,
        modified_by = @modified_by,
        modified_at = @modified_at
      WHERE id = @id
    `;
    const result = await pool
      .request()
      .input("id", sql.BigInt, id)
      .input("application_name", sql.VarChar, application_name)
      .input("is_active", sql.Bit, is_active)
      .input("modified_by", sql.BigInt, modified_by)
      .input("modified_at", sql.DateTime, modifiedAt)
      .query(updateQuery);

    if (result.rowsAffected[0] === 1) {
      res.status(201).json({ message: "Application updated successfully." });
    } else {
      res.status(404).json({ error: "Application not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = {
  GetApplication,
  GetApplicationName,
  CreateApplication,
  UpdateApplication,
};

const { now } = require("moment-timezone");
const { poolPromise } = require("../data/dbconfig");
const sql = require("mssql");
const {
  insertProcessQuery,
  checkProcessNameAlreadyExistQuery,
} = require("../Models/queryBuilder");
const { apiResponseHandler } = require("../utils/apiResponseHandler");

const GetProcess = async (req, res) => {
  const {
    page = 1,
    limit = 10,
    process_id,
    wave_id,
    function_id,
    startDate,
    endDate,
  } = req.body;

  console.log(req.body);

  try {
    const offset = (page - 1) * limit;
    const pool = await poolPromise;

    let query = `select pm.*,fm.function_name,fm.function_image,wm.wave_number from process_master pm 
left join function_master fm on pm.function_id = fm.id 
left join wave_master wm on pm.wave = wm.id where pm.is_active=1`;

    if (process_id) {
      query += ` 
AND pm.id = @process_id
`;
    }
    if (wave_id) {
      query += ` AND pm.wave = @wave_id`;
    }
    if (function_id) {
      query += ` AND pm.function_id = @function_id`;
    }
    if (startDate) {
      query += ` AND pm.start_date>= @startDate`;
    }
    if (endDate) {
      query += ` AND pm.start_date<= @endDate`;
    }

    query += ` ORDER BY pm.start_date DESC 
OFFSET @offset ROWS 
FETCH NEXT @limit ROWS ONLY`;

    let countQuery = `select pm.*,fm.function_name,fm.function_image,wm.wave_number from process_master pm 
left join function_master fm on pm.function_id = fm.id 
left join wave_master wm on pm.wave = wm.id where pm.is_active=1`;

    if (process_id) {
      countQuery += ` 
          AND pm.id = @process_id`;
    }
    if (wave_id) {
      countQuery += ` AND pm.wave = @wave_id`;
    }
    if (function_id) {
      countQuery += ` AND pm.function_id = @function_id`;
    }
    if (startDate) {
      countQuery += ` AND pm.start_date>= @startDate`;
    }
    if (endDate) {
      countQuery += ` AND pm.start_date<= @endDate`;
    }

    const [dataResult, countResult] = await Promise.all([
      pool
        .request()
        .input("process_id", sql.BigInt, process_id || null)
        .input("wave_id", sql.BigInt, wave_id || null)
        .input("function_id", sql.BigInt, function_id || null)
        .input("startDate", sql.Date, startDate || null)
        .input("endDate", sql.Date, endDate || null)
        .input("offset", offset)
        .input("limit", limit)
        .query(query),
      pool
        .request()
        .input("process_id", sql.BigInt, process_id || null)
        .input("wave_id", sql.BigInt, wave_id || null)
        .input("function_id", sql.BigInt, function_id || null)
        .input("startDate", sql.Date, startDate || null)
        .input("endDate", sql.Date, endDate || null)
        .query(countQuery),
    ]);

    const total = countResult.recordset[0].total || 0;
    const totalPages = Math.ceil(total / limit);

    console.log(dataResult);

    return res.status(200).json({
      data: dataResult.recordset,
      total,
      totalPages,
      currentPage: page,
      limit,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
};

const GetProcessName = async (req, res) => {
  try {
    const pool = await poolPromise;
    const query = `select pm.id as value ,pm.process_name as label from dbo.process_master pm where pm.is_active=1`;
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

const CreateProcess = async (req, res) => {
  const {
    process_name,
    process_owner,
    process_description,
    problem_statement,
    solution,
    complexity,
    purpose,
    goal,
    start_date,
    end_date,
    onetime_cost,
    support_cost,
    annual_hour_saved,
    annual_savings,
    wave,
    function_id,
    scope,
    frequency,
    avg_volume,
    avg_time,
    status,
    stage,
    rpa_id,
    application_id,
    technology_id,
    transformationlever_id,
  } = req.body;
  console.log("Request body:", req.body);

  // Enhanced validation function
  const validateFields = () => {
    const requiredFields = { process_name, process_owner };
    const missingFields = Object.entries(requiredFields)
      .filter(([_, value]) => !value)
      .map(([key]) => key);

    if (missingFields.length) {
      return {
        status: 400,
        message: `Missing required fields: ${missingFields.join(", ")}.`,
      };
    }

    // Additional validation logic for other fields (e.g., start_date and end_date)
    if (new Date(start_date) > new Date(end_date)) {
      return { status: 400, message: "Start date must be before end date." };
    }
    return null;
  };

  const validationError = validateFields();
  if (validationError) {
    const payload = await apiResponseHandler("Failed", validationError.message);
    return res.status(validationError.status).json({ data: payload });
  }

  let pool;
  let transaction;

  try {
    // Get the database connection pool
    pool = await poolPromise;

    // Start a transaction
    transaction = pool.transaction();
    await transaction.begin();

    // Check if the process_name already exists
    const checkResult = await transaction
      .request()
      .input("process_name", sql.VarChar, process_name)
      .query(checkProcessNameAlreadyExistQuery);

    if (checkResult.recordset.length > 0) {
      await transaction.rollback();
      const payload = await apiResponseHandler(
        "Failed",
        "Process already exists."
      );
      return res.status(400).json({ data: payload });
    }

    // Insert the new process
    const request = transaction.request();
    request
      .input("process_name", sql.VarChar, process_name)
      .input("process_owner", sql.VarChar, process_owner)
      .input("process_description", sql.Text, process_description || null)
      .input("problem_statement", sql.Text, problem_statement || null)
      .input("solution", sql.Text, solution || null)
      .input("complexity", sql.VarChar, complexity || null)
      .input("purpose", sql.Text, purpose || null)
      .input("goal", sql.Text, goal || null)
      .input("start_date", sql.Date, start_date)
      .input("end_date", sql.Date, end_date || null)
      .input("onetime_cost", sql.Decimal, onetime_cost || null)
      .input("support_cost", sql.Decimal, support_cost || null)
      .input("annual_hour_saved", sql.BigInt, annual_hour_saved || null)
      .input("annual_savings", sql.Decimal, annual_savings || null)
      .input("wave", sql.BigInt, wave || null)
      .input("function_id", sql.BigInt, function_id || null)
      .input("scope", sql.Text, scope || null)
      .input("frequency", sql.VarChar, frequency || null)
      .input("avg_volume", sql.VarChar, avg_volume || null)
      .input("avg_time", sql.VarChar, avg_time || null)
      .input("status", sql.VarChar, status || null)
      .input("stage", sql.VarChar, stage || null)
      .input("rpa_id", sql.VarChar, rpa_id || null);

    // Execute the query
    const addProcessResult = await request.query(insertProcessQuery);

    const process_id = addProcessResult.recordset[0].process_id;

    console.log("Newly inserted process_id:", process_id);

    // Insert into process_technology_mapping for each technology_id
    if (Array.isArray(technology_id) && technology_id.length > 0) {
      for (const techId of technology_id) {
        const insertTechnologyMappingQuery = `
          INSERT INTO dbo.process_technology_mapping (process_id, technology_id, created_by, is_active)
          VALUES (@process_id, @technology_id, 1, 1);
        `;
        await transaction
          .request()
          .input("process_id", sql.BigInt, process_id)
          .input("technology_id", sql.VarChar, techId)
          .query(insertTechnologyMappingQuery);
      }
    }

    // Insert into process_application_mapping for each application_id
    if (Array.isArray(application_id) && application_id.length > 0) {
      for (const applicationId of application_id) {
        const insertApplicationMappingQuery = `
          INSERT INTO dbo.process_application_mapping (process_id, application_id, created_by, is_active)
          VALUES (@process_id, @application_id, 1, 1);
        `;
        await transaction
          .request()
          .input("process_id", sql.BigInt, process_id)
          .input("application_id", sql.VarChar, applicationId)
          .query(insertApplicationMappingQuery);
      }
    }

    // Insert into process_transformationlever_mapping for each transformationlever_id
    if (
      Array.isArray(transformationlever_id) &&
      transformationlever_id.length > 0
    ) {
      for (const transformationleverId of transformationlever_id) {
        const insertTransformationleverMappingQuery = `
          INSERT INTO dbo.process_transformationlever_mapping (process_id, transformationlever_id, created_by, is_active)
          VALUES (@process_id, @transformationlever_id, 1, 1);
        `;
        await transaction
          .request()
          .input("process_id", sql.BigInt, process_id)
          .input("transformationlever_id", sql.VarChar, transformationleverId)
          .query(insertTransformationleverMappingQuery);
      }
    }

    // **Insert the Process Name in sub_process table**
    const insertSubProcessQuery = `
     INSERT INTO dbo.subprocess_master (process_id, subprocess_name,created_by,is_active)
     VALUES (@process_id, @subprocess_name,1,1);
   `;
    await transaction
      .request()
      .input("process_id", sql.BigInt, process_id)
      .input("subprocess_name", sql.VarChar, process_name)
      .query(insertSubProcessQuery);

    // Commit the transaction
    await transaction.commit();

    const payload = await apiResponseHandler("Success", 2002, addProcessResult);
    return res.status(200).json({ data: payload });
  } catch (error) {
    console.error("Error occurred:", error);

    if (transaction) {
      try {
        await transaction.rollback();
      } catch (rollbackError) {
        console.error("Error during transaction rollback:", rollbackError);
      }
    }

    const errorMessage =
      error.code === "ETIMEOUT"
        ? "Database connection timeout."
        : "An error occurred during the process creation.";

    const payload = await apiResponseHandler("Failed", errorMessage);
    return res.status(500).json({ data: payload });
  } finally {
    // Optional: Close the database connection pool if necessary
    if (pool) {
      pool.close();
    }
  }
};

const UpdateFunction = async (req, res) => {
  const { id, function_name, is_active, modified_by } = req.body;
  try {
    const pool = await poolPromise;

    const modifiedAt = new Date().toISOString().replace("T", " ").slice(0, 23);
    console.log(modifiedAt);

    const updateQuery = `
      UPDATE dbo.function_master
      SET 
       function_name = @function_name,
        is_active = @is_active,
        modified_by = @modified_by,
        modified_at = @modified_at
      WHERE id = @id
    `;
    const result = await pool
      .request()
      .input("id", sql.BigInt, id)
      .input("function_name", sql.VarChar, function_name)
      .input("is_active", sql.Bit, is_active)
      .input("modified_by", sql.BigInt, modified_by)
      .input("modified_at", sql.DateTime, modifiedAt)
      .query(updateQuery);

    if (result.rowsAffected[0] === 1) {
      res.status(201).json({ message: "Function updated successfully." });
    } else {
      res.status(404).json({ error: "Function not found." });
    }
  } catch (error) {
    console.error("Error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while processing your request." });
  }
};

module.exports = {
  GetProcess,
  GetProcessName,
  CreateProcess,
};

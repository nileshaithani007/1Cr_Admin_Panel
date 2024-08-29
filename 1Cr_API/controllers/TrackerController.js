const { now } = require("moment-timezone");
const { poolPromise } = require("../data/dbconfig");
const sql = require("mssql");


const GetTrackerData = async (req, res) => {
    const { page = 1, limit = 10, process_id, wave_id, function_id,startDate,endDate } = req.body;

    console.log(req.body);


    try {
        const offset = (page - 1) * limit;
        const pool = await poolPromise;

        let query = `SELECT at.*, 
        pm.process_name, 
        fm.id AS function_id, 
        fm.function_name, 
        wm.id AS wave_id, 
        wm.wave_number 
 FROM dbo.automation_tracker at 
 LEFT JOIN dbo.process_master pm ON pm.id = at.process_id 
 LEFT JOIN dbo.wave_master wm ON wm.id = pm.wave
 LEFT JOIN dbo.function_master fm ON fm.id = pm.function_id
 WHERE at.is_active = 1`;

        if (process_id) {
            query += ` 
AND at.process_id = @process_id
`;
        }
        if (wave_id) {
            query += ` AND wm.id = @wave_id`;
        }
        if (function_id) {
            query += ` AND fm.id = @function_id`;
        }
        if(startDate){
            query += ` AND at.date>= @startDate`;
        }
        if(endDate){
            query += ` AND at.date<= @endDate`;
        }

        query += ` ORDER BY at.date DESC 
OFFSET @offset ROWS 
FETCH NEXT @limit ROWS ONLY`;

        let countQuery = `SELECT COUNT(*) AS total
                          FROM dbo.automation_tracker at 
                          LEFT JOIN dbo.process_master pm ON pm.id = at.process_id 
                          LEFT JOIN dbo.wave_master wm ON wm.id = pm.wave
                          LEFT JOIN dbo.function_master fm ON fm.id = pm.function_id
                          WHERE at.is_active=1`;

        if (process_id) {
            console.log(process_id, "second");

            countQuery += ` 
            AND at.process_id = @process_id`;
        }
        if (wave_id) {
            countQuery += ` AND wm.id = @wave_id`;
        }
        if (function_id) {
            countQuery += ` AND fm.id = @function_id`;
        }
        if(startDate){
            countQuery += ` AND at.date>= @startDate`;
        }
        if(endDate){
            countQuery += ` AND at.date<= @endDate`;
        }

        const [dataResult, countResult] = await Promise.all([
            pool.request()
                .input('process_id', process_id || null)
                .input('wave_id', wave_id || null)
                .input('function_id', function_id || null)
                .input('startDate',startDate||null)
                .input('endDate',endDate||null)
                .input('offset', offset)
                .input('limit', limit)
                .query(query),
            pool.request()
                .input('process_id', process_id || null)
                .input('wave_id', wave_id || null)
                .input('function_id', function_id || null)
                .input('startDate',startDate||null)
                .input('endDate',endDate||null)
                .query(countQuery)
        ]);

        const total = countResult.recordset[0].total;
        const totalPages = Math.ceil(total / limit);

        console.log(dataResult);


        return res.status(200).json({
            data: dataResult.recordset,
            total,
            totalPages,
            currentPage: page,
            limit
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};

const CreateTrackerData = async (req, res) => {
    try {
        const { process_id, date, count, created_by } = req.body.data;

        if (process_id === undefined || date === undefined || count === undefined || created_by === undefined) {
            return res.status(400).json({ message: 'All data are required' });
        }

        const pool = await poolPromise;

        const insertQuery = `INSERT INTO dbo.automation_tracker (process_id,date,count,created_by, is_active) VALUES (@process_id, @date, @count,@created_by, 1)`;
        const result = await pool
            .request()
            .input("process_id", sql.BigInt, process_id)
            .input('date', sql.Date, date)
            .input('count', sql.BigInt, count)
            .input("created_by", sql.BigInt, created_by)
            .query(insertQuery);

        return res.status(200).json({ message: 'Data added successfully' });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};


const UpdateTrackerData = async (req, res) => {

    const { id, process_id, date, count, modified_by } = req.body.data;

    try {

        const pool = await poolPromise;

        const modifiedAt = new Date().toISOString().replace('T', ' ').slice(0, 23);
        console.log(modifiedAt);


        const updateQuery = `
      UPDATE dbo.automation_tracker
      SET 
       process_id = @process_id,
       date = @date,
       count=@count,
        modified_by = @modified_by,
        modified_at = @modified_at
      WHERE id = @id
    `;
        const result = await pool
            .request()
            .input("id", sql.BigInt, id)
            .input("process_id", sql.BigInt, process_id)
            .input('date', sql.DateTime, date)
            .input('count', sql.BigInt, count)
            .input("modified_by", sql.BigInt, modified_by)
            .input("modified_at", sql.DateTime, modifiedAt)
            .query(updateQuery);

        if (result.rowsAffected[0] === 1) {
            res.status(201).json({ message: "Tracker Data updated successfully." });
        } else {
            res.status(404).json({ error: "Tracker Data not found." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}

const DeactivateTrackerData = async (req, res) => {

    const { id,modified_by } = req.body.data;

    try {

        const pool = await poolPromise;

        const modifiedAt = new Date().toISOString().replace('T', ' ').slice(0, 23);
        console.log(modifiedAt);


        const updateQuery = `
      UPDATE dbo.automation_tracker
      SET 
       is_active = 0,
        modified_by = @modified_by,
        modified_at = @modified_at
      WHERE id = @id
    `;
        const result = await pool
            .request()
            .input("id", sql.BigInt, id)
            .input("modified_by", sql.BigInt, modified_by)
            .input("modified_at", sql.DateTime, modifiedAt)
            .query(updateQuery);

        if (result.rowsAffected[0] === 1) {
            res.status(201).json({ message: "Tracker Data deactivated successfully." });
        } else {
            res.status(404).json({ error: "Tracker Data not found." });
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}


module.exports = {
    GetTrackerData, CreateTrackerData, UpdateTrackerData, DeactivateTrackerData
};
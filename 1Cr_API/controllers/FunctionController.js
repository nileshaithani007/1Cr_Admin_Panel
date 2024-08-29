const { now } = require("moment-timezone");
const { poolPromise } = require("../data/dbconfig");
const sql = require("mssql");


const GetFunction = async (req, res) => {
   
    try {
    
        const pool = await poolPromise;
        const query = `SELECT * from dbo.function_master;`
        const result = await pool
            .request()
            .query(query);
      
        if(query){
           return res.status(200).json(result.recordset);
        }
        else{
            return res.status(404).json({message:'No function found'});
        }

    } catch (error) {

        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}

const GetActiveFunction = async (req, res) => {
   

    console.log('working');
    
    try {
    
        const pool = await poolPromise;
        const query = `SELECT id as value,function_name as label from dbo.function_master where is_active=1;`
        const result = await pool
            .request()
            .query(query);
      
        if(result){
           return res.status(200).json(result.recordset);
        }
        else{
            return res.status(404).json({message:'No function found'});
        }

    } catch (error) {

        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
}

const CreateFunction = async (req, res) => {
    try {        
        const { function_name, created_by } = req.body.data;

        if (function_name === undefined || created_by === undefined) {
            return res.status(400).json({ message: 'function_name and created_by are required' });
        }

        const pool = await poolPromise;

        const checkQuery = `SELECT COUNT(*) as count FROM dbo.function_master WHERE function_name = @function_name`;
        const checkResult = await pool
            .request()
            .input("function_name", sql.VarChar, function_name)
            .query(checkQuery);

        if (checkResult.recordset[0].count > 0) {
            return res.status(400).json({ message: 'Function already exists' });
        }

        const insertQuery = `INSERT INTO dbo.function_master (function_name, created_by, is_active) VALUES (@function_name, @created_by, 1)`;
        const result = await pool
            .request()
            .input("function_name", sql.VarChar, function_name)
            .input("created_by", sql.BigInt, created_by)
            .query(insertQuery);

        return res.status(200).json({ message: 'Function added successfully' });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
};


const UpdateFunction = async (req, res) => {
   
    const {id,function_name,is_active,modified_by}= req.body
    try {

        const pool = await poolPromise;

        const modifiedAt = new Date().toISOString().replace('T', ' ').slice(0, 23);
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
            .input("id",sql.BigInt,id)
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
        res.status(500).json({ error: "An error occurred while processing your request." });
    }
}


module.exports = {
    GetFunction,CreateFunction,UpdateFunction,GetActiveFunction
};
//========================Technologies Routes========================
const selectAllTrackings = `
  SELECT *
  FROM Tracking_Master
  `;

const selectTrackingByTrackingName = `
  SELECT *
  FROM dbo.Tracking_Master
  where tracking_name =@tracking_name and is_active =1`;

const InsertTracking = `
  INSERT INTO Tracking_Master (tracking_name, is_active, created_by)
  VALUES (
    @tracking_name, 1, 1);`;

const selectAllActiveTrackings = `
    Select * from Tracking_Master where is_active =1`;

const UpdateTracking = `
    Update Tracking_Master
    set tracking_name =@tracking_name,
    is_active =@is_active
    where id = @id `;

const DeactivateTracking = `Update Tracking_Master
    Set is_active = 0 where id = @id`;

const ActivateTracking = `Update Tracking_Master
    Set is_active = 1 where id = @id`;

//=====================================Wave Master=====================

const selectAllWaves = `
  SELECT *
  FROM Wave_Master
  `;

const selectWaveByWaveNumber = `
  SELECT *
  FROM dbo.Wave_Master
  WHERE wave_number = @wave_number AND is_active = 1`;

const InsertWave = `
  INSERT INTO Wave_Master (wave_number,wave_duration, is_active, created_by)
  VALUES (
    @wave_number,@wave_duration, 1, 1);`;

const selectAllActiveWaves = `
  SELECT id as value , wave_number as label
  FROM Wave_Master
  WHERE is_active = 1`;

const UpdateWave = `
  UPDATE Wave_Master
  SET wave_number = @wave_number,
  wave_duration = @wave_duration,
  is_active = @is_active
  WHERE id = @id`;

const DeactivateWave = `
  UPDATE Wave_Master
  SET is_active = 0 
  WHERE id = @id`;

const ActivateWave = `
  UPDATE Wave_Master
  SET is_active = 1 
  WHERE id = @id`;

//========================Technologies========================
const selectAllTechnologies = `
SELECT *
FROM dbo.Technology_Master
`;

const selectTechnologyByTechnologyName = `
SELECT *
FROM Technology_Master
where technology_name =@technology_name and is_active =1`;

const InsertTechnology = `
INSERT INTO Technology_Master (technology_name, is_active, created_by)
VALUES (
  @technology_name, 1, 1);`;

const selectAllActiveTechnologies = `
  Select * from Technology_Master where is_active =1`;

const UpdateTechnology = `
  Update Technology_Master
  set technology_name =@technology_name,
  is_active =@is_active
  where technology_id = @technology_id `;

const DeactivateTechnology = `Update Technology_Master
  Set is_active = 0 where technology_id = @technology_id`;

const ActivateTechnology = `Update Technology_Master
  Set is_active = 1 where technology_id = @technology_id`;

//==========Transformation Lever================================

const addTransformationLever = `
INSERT INTO dbo.transformation_lever_master (transformation_name, created_by, is_active)
VALUES (@transformation_name,1,1);
`;

const getAllTransformationLever = `
SELECT * FROM dbo.transformation_lever_master;
`;

const getAllActiveTransformationLever = `
SELECT * FROM dbo.transformation_lever_master where is_active =1;
`;

const fetchTransformationLeverById = `
SELECT * FROM dbo.transformation_lever_master
WHERE transformation_id = @transformation_id;
`;

const updateTransformation = `
UPDATE dbo.transformation_lever_master
SET lever_name = @lever_name,
is_active = @is_active
where lever_id=@lever_id
`;

const activatetransformation = `
UPDATE dbo.transformation_lever_master
SET is_active = 1
where transformation_id = @transformation_id
`;

const deactivatetransformation = `
UPDATE dbo.transformation_lever_master
SET is_active = 0
  where transformation_id = @transformation_id
`;

const CheckTransformationName = `
SELECT * FROM dbo.transformation_lever_master
WHERE lever_name = @lever_name;
`;

//=============================Stage Master=========================
const getAllStages = `
SELECT *
FROM dbo.stage_master
`;
const CheckStageByStageName = `
select * 
FROM dbo.stage_master 
WHERE stage_name = @stage_name;
`;

const addStage = `
INSERT INTO dbo.stage_master
(stage_name, created_by,is_active)
VALUES(@stage_name,1,1);
`;

const updateStage = `
UPDATE dbo.stage_master
SET stage_name=@stage_name, modified_by = 1,is_active=1
WHERE stage_id=@stage_id;
`;

//===========================Processes =================
const checkProcessNameAlreadyExistQuery = `select * from dbo.process_master 
where process_name=@process_name and is_active=1
`;

const insertProcessQuery = `
INSERT INTO dbo.process_master (
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
  created_by,
  created_at,
  is_active
)OUTPUT inserted.id AS process_id VALUES (
  @process_name,
  @process_owner,
  @process_description,
  @problem_statement,
  @solution,
  @complexity,
  @purpose,
  @goal,
  @start_date,
  @end_date,
  @onetime_cost,
  @support_cost,
  @annual_hour_saved,
  @annual_savings,
  @wave,
  @function_id,
  @scope,
  @frequency,
  @avg_volume,
  @avg_time,
  @status,
  @stage,
  @rpa_id,
  1,
  GETDATE(),
  1
)
`;

module.exports = {
  selectAllTrackings,
  selectTrackingByTrackingName,
  InsertTracking,
  UpdateTracking,
  DeactivateTracking,
  ActivateTracking,
  selectAllActiveTrackings,

  selectWaveByWaveNumber,
  InsertWave,
  selectAllWaves,
  selectAllActiveWaves,
  UpdateWave,
  DeactivateWave,
  ActivateWave,

  selectAllTechnologies,
  selectAllActiveTechnologies,
  selectTechnologyByTechnologyName,
  InsertTechnology,
  UpdateTechnology,
  DeactivateTechnology,
  ActivateTechnology,

  addTransformationLever,
  getAllTransformationLever,
  getAllActiveTransformationLever,
  fetchTransformationLeverById,
  updateTransformation,
  deactivatetransformation,
  activatetransformation,
  CheckTransformationName,

  getAllStages,
  CheckStageByStageName,
  addStage,
  updateStage,

  checkProcessNameAlreadyExistQuery,
  insertProcessQuery,
};

const {
  addWave,
  getAllWaves,
  getAllActiveWaves,
  updateWave,
  deactivateWave,
  activateWave,
  GetWaveNumber,
} = require("../controllers/waveController");

const WaveRoute = require("express").Router();

WaveRoute.get("/getAllWave", getAllWaves);
WaveRoute.get("/getAllActiveWave", getAllActiveWaves);
WaveRoute.post("/createWave", addWave);
WaveRoute.post("/updateWave", updateWave);
WaveRoute.post("/deactivateWave", deactivateWave);
WaveRoute.post("/activateWave", activateWave);
WaveRoute.get("/get/wavenumber", GetWaveNumber);

module.exports = WaveRoute;

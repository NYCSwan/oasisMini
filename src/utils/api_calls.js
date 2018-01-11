import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


function getSensorMeasurementsBy5() {
  const url = `${BASE_URL}/api/v1/sensor_measurements`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurements() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_all`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_chamber_1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_chamber_2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_chamber_3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsTemperatureChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_temperature_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsHumidityChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_humidity_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPhChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ph_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPpmChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ppm_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsImagesChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_imgs_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsWaterLevelChamber1() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_water_c1`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsTemperatureChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_temperature_c2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsHumidityChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_humidity_c2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPhChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ph_c2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPpmChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ppm_c2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsImagesChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_imgs_c2`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsWaterLevelChamber2() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_water_c2`;
  return axios.get(url).then(response => response.data);
}
function getAllSensorMeasurementsTemperatureChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_temperature_c3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsHumidityChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_humidity_c3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPhChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ph_c3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsPpmChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_ppm_c3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsImagesChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_imgs_c3`;
  return axios.get(url).then(response => response.data);
}

function getAllSensorMeasurementsWaterLevelChamber3() {
  const url = `${BASE_URL}/api/v1/sensor_measurements_water_c3`;
  return axios.get(url).then(response => response.data);
}
function getClimateData() {
  const url = `${BASE_URL}/api/v1/climates`;
  return axios.get(url).then(response => response.data);
}

function getChamberData() {
  const url = `${BASE_URL}/api/v1/chambers`;
  return axios.get(url).then(response => response.data);
}

function getGrowingPlants() {
  const url = `${BASE_URL}/api/v1/growing_plants`;
  return axios.get(url).then(response => response.data);
}
// not sure it works
function postNewGrowingPlant(data) {
  const url = `${BASE_URL}/api/v1/growing_plants`;
  return axios.post(url, data).then(response => response.data);
}

function getPlantRecipeData() {
  const url = `${BASE_URL}/api/v1/plant_recipes`;
  return axios.get(url).then(response => response.data);
}

export { getAllSensorMeasurements, getClimateData, getChamberData, getPlantRecipeData, getGrowingPlants, postNewGrowingPlant, getSensorMeasurementsBy5, getAllSensorMeasurementsChamber3, getAllSensorMeasurementsChamber2, getAllSensorMeasurementsChamber1, getAllSensorMeasurementsPhChamber1, getAllSensorMeasurementsPpmChamber1, getAllSensorMeasurementsImagesChamber1, getAllSensorMeasurementsHumidityChamber1, getAllSensorMeasurementsTemperatureChamber1, getAllSensorMeasurementsWaterLevelChamber1, getAllSensorMeasurementsPhChamber2, getAllSensorMeasurementsPpmChamber2, getAllSensorMeasurementsImagesChamber2, getAllSensorMeasurementsHumidityChamber2, getAllSensorMeasurementsTemperatureChamber2, getAllSensorMeasurementsWaterLevelChamber2, getAllSensorMeasurementsPhChamber3, getAllSensorMeasurementsPpmChamber3, getAllSensorMeasurementsImagesChamber3, getAllSensorMeasurementsHumidityChamber3, getAllSensorMeasurementsTemperatureChamber3, getAllSensorMeasurementsWaterLevelChamber3 };

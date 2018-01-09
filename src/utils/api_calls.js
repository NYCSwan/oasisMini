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

export { getAllSensorMeasurements, getClimateData, getChamberData, getPlantRecipeData, getGrowingPlants, postNewGrowingPlant, getSensorMeasurementsBy5, getAllSensorMeasurementsChamber3, getAllSensorMeasurementsChamber2, getAllSensorMeasurementsChamber1};

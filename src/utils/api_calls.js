import axios from 'axios';

const BASE_URL = 'http://localhost:3000';


function getSensorMeasurements() {
  const url = `${BASE_URL}/api/v1/sensor_measurements`;
  return axios.get(url).then(response => response.data);
}

function getClimates() {
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

function getPlantRecipeData() {
  const url = `${BASE_URL}/api/v1/plant_recipes`;
  // debugger
  return axios.get(url).then(response => response.data);
}

export { getSensorMeasurements, getClimates, getChamberData, getPlantRecipeData, getGrowingPlants };

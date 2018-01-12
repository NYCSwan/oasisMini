const Router = require('express-promise-router');
const db = require('../db');

const router = new Router();
module.exports = router;

router.post('/v1/sensor_measurements', async (req, res, next) => {
  const params = req.body;

  const q = 'INSERT INTO sensor_measurements(value, chamber_id, sensor_id, device_id) values($1, $2, $3, $4, $5)';
  const data = ['NOW()', params.value, params.chamber_id, params.sensor_id, params.device_id]
  const {rows} = await db.query(q, data);
  res.send('done');
});

router.get('/v1/sensor_measurements', async (req, res, next) => {
 const { rows } = await db.query("SELECT time_bucket('5 minutes', time) as five_min, avg(value) FROM sensor_measurements GROUP BY time;");
 res.send(rows);
});

router.post('/v1/growing_plants', async (req, res, next) => {
  const params = req.body;

  const q = 'INSERT INTO growing_plants(started_datetime, updated_datetime, chamber_id, plant_recipe_id, user_id) values($1, $2, $3, $4)';
  const data = [ params.started_datetime, 'NOW()', params.chamber_id, params.plant_recipe_id, params.device_id, params.user_id];

  const {rows} = await db.query(q, data);
  res.send('done'+ params.id);
});

router.get('/v1/growing_plants', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM growing_plants;");
 res.send(rows);
});

router.get('/v1/photos', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM photos;");
 res.send(rows);
});

router.get('/v1/oasis_mini_devices', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM oasis_mini_devices;");
 res.send(rows);
});

router.get('/v1/chambers', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM chambers;");
 res.send(rows);
});

router.get('/v1/sensors', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM sensors;");
 res.send(rows);
});

router.get('/v1/climates', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM climates;");
 res.send(rows);
});

router.get('/v1/plant_recipes', async (req, res, next) => {
 const { rows } = await db.query("SELECT * FROM plant_recipes;");
 res.send(rows);
});

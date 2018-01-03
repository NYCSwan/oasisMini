DROP TABLE IF EXISTS "sensor_measurements";

CREATE TABLE "sensor_measurements"(
    sensor_id TEXT NOT NULL,
    measurement_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    chamber_id  INTEGER NOT NULL,
    name TEXT NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    device_id INTEGER NOT NULL
);

SELECT create_hypertable('sensors', 'pickup_datetime', 'payment_type', 2, create_default_indexes=>FALSE);
CREATE INDEX ON sensor_measurements (name, measurement_datetime desc);
CREATE INDEX ON sensor_measurements (measurement_datetime desc, name);
-- CREATE INDEX ON rides (sensor_id, pickup_datetime DESC);
CREATE INDEX ON sensor_measurements (chamber_id, pickup_datetime desc);

CREATE TABLE IF NOT EXISTS "images"(
    id INTEGER NOT NULL,
    url TEXT NOT NULL,
    size TEXT NOT NULL,
    chamber_id INTEGER NOT NULL,
    device_id INTEGER NOT NULL,
    capture_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL

);

CREATE TABLE IF NOT EXISTS "oasis_minis"(
    id INTEGER NOT NULL,
    location TEXT NOT NULL,
    is_on BOOLEAN,
    user_id INTEGER NOT NULL

);

CREATE TABLE IF NOT EXISTS "plants_growing"(
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    day_of_cycle INTEGER NOT NULL,
    chamber_id INTEGER NOT NULL,
    started_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    image TEXT,
    plant_recipe_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "chambers"(
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    is_filled BOOLEAN
);

CREATE TABLE IF NOT EXISTS "plant_recipes"(
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    phMin INTEGER,
    phMax INTEGER,
    ppmMin INTEGER,
    ppmMax INTEGER,
    temperatureMin INTEGER,
    temperatureMax INTEGER,
    humidityMin INTEGER,
    humidityMax INTEGER,
    chamber_directions TEXT,
    planting_directions TEXT
);

INSERT INTO chambers(chambers, name) VALUES
(1, 'Chamber 1'),
(2, 'Chamber 2'),
(3, 'Chamber 3');

CREATE TABLE IF NOT EXISTS "users"(
    username TEXT,
    email_address TEXT,
    password ??,
    device_id INTEGER

);
2

DROP TABLE IF EXISTS "sensor_measurements";
DROP TABLE IF EXISTS "photos";
DROP TABLE IF EXISTS "oasis_mini_devices";
DROP TABLE IF EXISTS "growing_plants";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "climates";
DROP TABLE IF EXISTS "chambers";
DROP TABLE IF EXISTS "sensors";
DROP TABLE IF EXISTS "plant_recipes";


CREATE TABLE IF NOT EXISTS photos (
    p_id SERIAL PRIMARY KEY,
    url TEXT NOT NULL UNIQUE,
    size TEXT NOT NULL,
    chamber_id INTEGER NOT NULL,
    device_id INTEGER NOT NULL,
    capture_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS oasis_mini_devices (
    d_id SERIAL PRIMARY KEY,
    location TEXT NOT NULL,
    is_on BOOLEAN,
    user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS growing_plants (
    g_id SERIAL PRIMARY KEY,
    chamber_id INTEGER NOT NULL,
    started_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    plant_recipe_id INTEGER NOT NULL,
    climate_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS chambers (
    c_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    is_filled BOOLEAN
);

CREATE TABLE IF NOT EXISTS plant_recipes (
    r_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    ph DOUBLE PRECISION NOT NULL,
    ppm DOUBLE PRECISION NOT NULL,
    temperature_range TEXT NOT NULL,
    humidity_range TEXT NOT NULL,
    chamber_directions TEXT NOT NULL,
    planting_directions TEXT NOT NULL,
    image TEXT,
    climate_id INTEGER NOT NULL,
    market_price DOUBLE PRECISION NOT NULL,
    days_to_maturity INTEGER NOT NULL,
    height TEXT NOT NULL,
    fruit_size TEXT,
    yield TEXT NOT NULL,
    uses TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS sensors (
    s_id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    device_id INTEGER

);

CREATE TABLE IF NOT EXISTS users (
    u_id SERIAL PRIMARY KEY,
    username TEXT UNIQUE,
    email_address TEXT UNIQUE,
    password TEXT
);

CREATE TABLE IF NOT EXISTS climates (
    cl_id SERIAL PRIMARY KEY,
    type TEXT NOT NULL,
    temperatureMin DOUBLE PRECISION NOT NULL,
    temperatureMax DOUBLE PRECISION NOT NULL,
    humidityMin DOUBLE PRECISION NOT NULL,
    humidityMax DOUBLE PRECISION NOT NULL,
    phMin DOUBLE PRECISION NOT NULL,
    phMax DOUBLE PRECISION NOT NULL
);

CREATE TABLE sensor_measurements (
    time TIMESTAMPTZ,
    m_id SERIAL,
    value DOUBLE PRECISION,
    chamber_id INTEGER,
    sensor_id INTEGER,
    device_id INTEGER,

    FOREIGN KEY(chamber_id) REFERENCES chambers(c_id),
    FOREIGN KEY(sensor_id) REFERENCES sensors(s_id),
    FOREIGN KEY(device_id) REFERENCES oasis_mini_devices(d_id)
);

GRANT ALL PRIVILEGES ON TABLE sensor_measurements TO "Swan";

SELECT create_hypertable('sensor_measurements', 'time', create_default_indexes=>FALSE, if_not_exists=>TRUE);
CREATE INDEX ON sensor_measurements (time DESC, value);
CREATE INDEX ON sensor_measurements (sensor_id, time DESC);
CREATE INDEX ON sensor_measurements (chamber_id, time DESC);

INSERT INTO sensors(name)
VALUES('humidity'),
('temperature'),
('ph'),
('ppm'),
('camera'),
('water');

INSERT INTO chambers(name)
VALUES('Chamber 1'),
('Chamber 2'),
('Chamber 3');

INSERT INTO climates(type, temperatureMin, temperatureMax, humidityMin, humidityMax, phMin, phMax )
VALUES('tropical', 75.00, 95.00, 55.00, 70.00, 5.40, 6.00),
('temperate', 65.00, 75.00, 40.00, 65.00, 5.40, 6.30),
('customize', 0.00, 100.00, 20.00, 100.00, 5.40, 6.00);

INSERT INTO plant_recipes(name, description, image, days_to_maturity, height, fruit_size, yield, uses, market_price, ph, temperature_range, humidity_range, climate_id, ppm, chamber_directions, planting_directions)
VALUES('Red Robin Tomato', 'description', 'tomato.jpeg', 50, '8-12 inches', '1-1.5 inches', 'high yield density for snall plants', 'salads, snacking', 3.50, 6.00, '65-75', '65-75', 1, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Red Iceberg Lettuce', 'description', 'lettuce.jpeg', 30, '6-10 inches', null, 'high yield density, whole plant is edible', 'salads, lettuce wraps, sandwiches', 2.00, 5.90, '60-70', '60-75', 1, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Kale', 'description', 'kale.jpeg', 65, '6-10 inches', null, 'high yield density, whole plant is edible', 'salads, side dishes, juice', 2.10, 6.00, '60-65', '65-75', 1, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Green Beans', 'description', 'Green_Beans.jpg', 60, '10-24 inches', '3-6 inches', 'medium yield density', 'salads, side dishes, snacking', 2.25, 6.2, '60-70', '55-70', 2, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Cilantro', 'description', 'cilantro.jpeg', 45, '6-10 inches', null, 'high density yield, whole plant is edible', 'dips, juice, aromatherapy, seasoning', 6.00, 5.8, '50-70', '65-75', 2, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Broccoli (short hybrid)', 'description', 'broccoli.jpg', 75, '24-36 inches', '2-6 inches', 'medium yield density', 'side dishes, snacking', 3.20, 6.0, '60-65', '50-65', 2, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Bell Pepper', 'description', 'bell_pepper.jpeg', 70, '20-40 inches', '3-6 inches', 'Low- medium yield density. Flower and stem are edible', 'side dishes, salads, snacking', 2.50, 5.8, '70- 85', '55- 65', 1, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!'),
('Basil', 'description', 'basil.jpeg', 60, '18-24 inches', null, 'high yield density. Whole plant is edible', 'juice, salads, seasoning', 3.40, 5.8, '75-85', '65-75', 1, 300.00, 'Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.', 'Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!');

INSERT INTO oasis_mini_devices(location, user_id)
VALUES('kitchen', 1);

INSERT INTO users(username, password, email_address)
VALUES('test', 'password', 'test@gmail.com');

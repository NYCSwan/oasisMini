DROP TABLE IF EXISTS "sensor_measurements";
DROP TABLE IF EXISTS "photos";
DROP TABLE IF EXISTS "oasis_mini_devices";
DROP TABLE IF EXISTS "growing_plants";
DROP TABLE IF EXISTS "users";
DROP TABLE IF EXISTS "climates";
DROP TABLE IF EXISTS "chambers";
DROP TABLE IF EXISTS "sensors";
DROP TABLE IF EXISTS "plant_recipes";


CREATE TABLE "sensor_measurements"(
    id INTEGER NOT NULL,
    measurement_enteredAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    measurement_updatedAt TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    value DOUBLE PRECISION NOT NULL,
    chamber_id  INTEGER NOT NULL,
    sensor_id  INTEGER NOT NULL,
    device_id INTEGER NOT NULL
);

SELECT create_hypertable('sensor_measurements', 'measurement_updatedAt');
CREATE INDEX ON sensor_measurements (name, measurement_updatedAt DESC);
CREATE INDEX ON sensor_measurements (measurement_updatedAt DESC, value);
CREATE INDEX ON sensor_measurements (sensor_id, measurement_updatedAt DESC);
CREATE INDEX ON sensor_measurements (chamber_id, measurement_updatedAt DESC);

CREATE TABLE IF NOT EXISTS "photos"(
    id INTEGER NOT NULL,
    url TEXT NOT NULL,
    size TEXT NOT NULL,
    chamber_id INTEGER NOT NULL,
    device_id INTEGER NOT NULL,
    capture_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL
);

CREATE TABLE IF NOT EXISTS "oasis_mini_devices" (
    device_id INTEGER NOT NULL,
    location TEXT NOT NULL,
    is_on BOOLEAN,
    user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "growing_plants"(
    id INTEGER NOT NULL,
    day_of_cycle INTEGER NOT NULL,
    chamber_id INTEGER NOT NULL,
    started_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    updated_datetime TIMESTAMP WITHOUT TIME ZONE NOT NULL,
    plant_recipe_id INTEGER NOT NULL,
    climate_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS "chambers"(
    chamber_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    is_filled BOOLEAN
);

CREATE TABLE IF NOT EXISTS "plant_recipes"(
    id INTEGER NOT NULL,
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

CREATE TABLE IF NOT EXISTS "sensors" (
    sensor_id INTEGER NOT NULL,
    name TEXT NOT NULL,
    device_id INTEGER
);

CREATE TABLE IF NOT EXISTS "users"(
    user_id INTEGER NOT NULL,
    username TEXT,
    email_address TEXT,
    password TEXT
);

CREATE TABLE IF NOT EXISTS "climates" (
    climate_id INTEGER NOT NULL,
    type TEXT NOT NULL,
    temperatureMin DOUBLE PRECISION NOT NULL,
    temperatureMax DOUBLE PRECISION NOT NULL,
    humidityMin DOUBLE PRECISION NOT NULL,
    humidityMax DOUBLE PRECISION NOT NULL,
    phMin DOUBLE PRECISION NOT NULL,
    phMax DOUBLE PRECISION NOT NULL
);

INSERT INTO sensors(sensor_id, name)
VALUES(1, 'humidity'),
(2, 'temperature'),
(3, 'ph'),
(4, 'ppm'),
(5, 'camera'),
(6, 'water');

INSERT INTO chambers(chamber_id, name)
VALUES(1, 'Chamber 1'),
(2, 'Chamber 2'),
(3, 'Chamber 3');

INSERT INTO climates(climate_id, type, temperatureMin, temperatureMax, humidityMin, humidityMax, phMin, phMax )
VALUES(1, 'tropical', 75.00, 95.00, 55.00, 70.00, 5.40, 6.00),
(2, 'temperate', 65.00, 75.00, 40.00, 65.00, 5.40, 6.30),
(3, 'customize', 0.00, 100.00, 20.00, 100.00, 5.40, 6.00);

INSERT INTO plant_recipes(id, name, description, image, days_to_maturity, height, fruit_size, yield, uses, market_price, ph, temperature_range, humidity_range, climate_id, ppm, chamber_directions, planting_directions)
VALUES(1, 'Red Robin Tomato', 'description', 'tomato.jpeg', 50, '8-12 inches', '1-1.5 inches', 'high yield density for snall plants', 'salads, snacking', 3.50, 6.00, '65-75', '65-75', 1, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(2, 'Red Iceberg Lettuce', 'description', 'lettuce.jpeg', 30, '6-10 inches', null, 'high yield density, whole plant is edible', 'salads, lettuce wraps, sandwiches', 2.00, 5.90, '60-70', '60-75', 1, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(3, 'Kale', 'description', 'kale.jpeg', 65, '6-10 inches', null, 'high yield density, whole plant is edible', 'salads, side dishes, juice', 2.10, 6.00, '60-65', '65-75', 1, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(4, 'Green Beans', 'description', 'Green_Beans.jpg', 60, '10-24 inches', '3-6 inches', 'medium yield density', 'salads, side dishes, snacking', 2.25, 6.2, '60-70', '55-70', 2, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(5, "Cilantro", 'description', 'cilantro.jpeg', 45, '6-10 inches', null, 'high density yield, whole plant is edible', 'dips, juice, aromatherapy, seasoning', 6.00, 5.8, '50-70', '65-75', 2, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(6, 'Broccoli (short hybrid)', 'description', 'broccoli.jpg', 75, '24-36 inches', '2-6 inches', 'medium yield density', 'side dishes, snacking', 3.20, 6.0, '60-65', '50-65', 2, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(7, 'Bell Pepper', 'description', 'bell_pepper.jpeg', 70, '20-40 inches', '3-6 inches', 'Low- medium yield density. Flower and stem are edible', 'side dishes, salads, snacking', 2.50, 5.8, '70- 85', '55- 65', 1, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!"),
(8, 'Basil', 'description', 'basil.jpeg', 60, '18-24 inches', null, 'high yield density. Whole plant is edible', 'juice, salads, seasoning', 3.40, 5.8, '75-85', '65-75', 1, 300, "Fill chamber water reservoir with clean water, then put the water reservoir back inside the chamber and initiate pH balancing.", "Transplant seedlings in rockwool cubes from propagation chamber to net pots and put net pots in chamber lid holes. \nYour plants are ready!");

INSERT INTO oasis_mini_devices(device_id, location, user_id)
VALUES(1, 'kitchen', 1);

INSERT INTO users(user_id, username, password, email_address)
VALUES(1, 'test', 'password', 'test@gmail.com');

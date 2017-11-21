import '../../data.json';


const prepareSensorData = (rawData = {}, selectedSensors = []) => {
  // prepare data
  let minX = null;
  let maxX = null;
  let minY = null;
  let maxY = null;

  const data = rawData.reduce((acc, cur) => {
    // is the current line part of a selected country ?
    if (selectedSensors.indexOf(cur.Country) > -1) {
      // prepare non existing countries
      acc[cur.Country] = acc[cur.Country] || [];
      // extract min & max
      minX = (minX === null || cur.Year < minX) ? cur.Year : minX;
      maxX = (maxX === null || cur.Year > maxX) ? cur.Year : maxX;
      minY = (minY === null || cur['Life Expectancy at Birth (both genders)'] < minY) ? cur['Life Expectancy at Birth (both genders)'] : minY;
      maxY = (maxY === null || cur['Life Expectancy at Birth (both genders)'] > maxY) ? cur['Life Expectancy at Birth (both genders)'] : maxY;
      // the current line is part of a selected country, add it to the final accumulator, format it like {x, y}
      acc[cur.Country].push({ x: parseInt(cur.Year, 10), y: parseFloat(cur['Life Expectancy at Birth (both genders)'], 10) });
    }
    return acc;
  }, {});
  // correctly cast
  minX = parseInt(minX, 10);
  maxX = parseInt(maxX, 10);
  minY = parseFloat(minY, 10);
  maxY = parseFloat(maxY, 10);
  return {
    data,
    minX,
    maxX,
    minY,
    maxY
  };
};

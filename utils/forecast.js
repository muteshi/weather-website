const request = require("request");

const forecast = (location, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=06cb779babb0f7fde143cfd776563c31&query=${location}`;
  request({ url, json: true }, (err, { body } = {}) => {
    if (err) {
      callback("Unable to connect to weather services", undefined);
    } else if (err) {
      callback(body.error.info, undefined);
    } else {
      callback(
        undefined,
        `Forecast is ${
          body.current.weather_descriptions[0]
        }, current temperature is ${
          body.current.temperature
        } degrees, though it feels like ${
          body.current.feelslike
        } degrees. ${new Date(body.location.localtime)}`
      );
    }
  });
};

module.exports = forecast;

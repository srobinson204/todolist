const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ exteded: true }));

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', function (req, res) {
  const query = 'cityName';
  const apiKey = '4f2a8c30a9698b0f50d4a817089d3012';
  const units = 'metric';
  const url =
    'https://api.openweathermap.org/data/2.5/weather?q=' +
    query +
    '&appid=' +
    apiKey +
    '&units=' +
    units;
  https.get('/', function (response) {
    response.on('data', function (data) {
      const weatherData = JSON.parse(data);
      const temp = Math.round(weatherData.main.temp);
      const description = weatherData.weather[0].description;
      const icon = weatherData.weather[0].icon;
      const imageURL = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

      res.write(
        '<h1>The weather in ' + query + ' today is: ' + temp + ' degrees.</h1>'
      );
      res.write('<h3> With ' + description + ' throughout the afternoon</h3>');
      res.write('<img src=' + imageURL + '>');
      res.send();
    });
  });
});

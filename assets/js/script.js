var city = "Temecula";
var currentWeatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}`;
fetch(currentWeatherUrl)
  .then((data) => data.json())
  .then(function (weather) {
    console.log(weather);
    var lat = weather.coord.lat;
    var lon = weather.coord.lon;
    var onecallURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${api_key}`;
    fetch(onecallURL)
      .then((data) => data.json())
      .then(function (oneCallData) {
        //   oneCallData has all the information that we need
        console.log(oneCallData);
      });
  });

var api_key = "5b2963263d0e52254e9221fe50f4224e";
var city = "Tempe";
var lat = "33.4148";
var lon = "-111.9093"
var citySearchEl = document.querySelector("#city-search");
var cityInputEl = document.querySelector("#city-input");
var cityList = document.querySelector("#cityList");
var currentCity = document.querySelector("#currentCity");
var currentTitle = document.querySelector("#currTitle");
var currentTemp = document.querySelector("#currTemp");
var currentHumidity = document.querySelector("#currHumidity");
var currentUV = document.querySelector("#currUV");


var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=" + api_key;
var fiveDayForecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=Tempe&appid=" + api_key   
var oneCallURL =  "https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=" + api_key;
   
  // fetch(fiveDayForecastURL)
  // .then((data) => data.json())
  // .then(function (fiveDayWeather){
  //   console.log(fiveDayWeather);
  // });

  function saveSearch(city){
    //check local store for saved items
    var stored = (JSON.parse(localStorage.getItem("cities")) !== null) ? JSON.parse(localStorage.getItem("cities")) : [];
    stored.push(city);
    localStorage.setItem("cities", JSON.stringify(stored));
    stored.forEach(el => {
      list = document.createElement("button");
      list.textContent = el;
      cityList.appendChild(list);
    });

    cityInputEl.value = "";
  }

  var formSubmitHandler = function (event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();
    if(cityName) {
      getCityData(cityName);
      console.log(cityName);
      saveSearch(cityName);
    }
  }
var getCityData = function (city) {
  var url = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + api_key;

  fetch(url)
  .then(function (response) {
    if (response.ok){
      console.log(response);
      response.json().then(function (weather){
        console.log(weather);
        //set current city data
        setCurrentCity(weather);
      })
    }
    else{
      alert("error" + response.statusText);
    }
  })
  .catch(function (error){
    alert("can't connect");
  });
  
}
function setCurrentCity(city){
  currentCity.style.visibility = "visible";
  currentTitle.textContent = city.city.name;
  currentTemp.textContent = city.list[0].main.temp;
  currentHumidity.textContent = city.list[0].main.humidity;

}

citySearchEl.addEventListener('submit', formSubmitHandler);
  
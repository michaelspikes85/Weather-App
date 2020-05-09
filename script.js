var APIKey = "2ccc9fbf4c317cb8c39fb0142ddb39c2";
var cityInput = $("#city")
var stateInput = $("#state")
var queryURL = "https://api.openweathermap.org/data/2.5/weather?" +
  "q={cityInput},{stateInput}&appid=" + APIKey;

  $.ajax({
    url: queryURL,
    method: "GET"
  })

  .then(function(response) {
console.log(response)
  });
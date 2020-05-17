$(document).ready(function () {
  var searches = [];
  var APIKey = "2ccc9fbf4c317cb8c39fb0142ddb39c2";
  function getWeather() {
    var currentCity = $(this).attr("data-name");
    if (!currentCity) {
      currentCity = $("#current-city").val().trim();
    }

    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      currentCity +
      "&units=imperial" +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.weather[0].icon + ".png");
      $(".city").text(response.name).append(icon);
      $(".wind").text("Wind Speed: " + response.wind.speed + " MPH");
      $(".humidity").text(
        "Humidity: " + response.main.humidity + "%"
      );
      $(".temp").text("Temperature: " + response.main.temp + " F");
    });
  }

  function getForecast() {
    var currentCity = $(this).attr("data-name");
    if (!currentCity) {
      currentCity = $("#current-city").val().trim();
    }
    var queryURL =
      "https://api.openweathermap.org/data/2.5/forecast?q=" +
      currentCity +
      "&units=imperial" +
      "&appid=" +
      APIKey;

    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      $("#forecast").empty();
      for (let i = 0; i < response.list.length; i += 8) {
        var days = [
          "Sunday",
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ];
        var forecastCard = $("<div>").addClass("card-body");
        var dayOfWeek = $("<h4>").text(days[new Date(response.list[i].dt * 1000).getDay()]);
        var humidity = $("<p>").text(
          "Humidity: " + response.list[i].main.humidity + "%"
        );
        var tempDay = $("<p>").text(
          "Temperature: " + response.list[i].main.temp + " F"
        );
        var icon = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.list[i].weather[0].icon + ".png");

        $("#forecast").append(forecastCard);
        forecastCard.append(dayOfWeek);
        forecastCard.append(icon);
        forecastCard.append(tempDay);
        forecastCard.append(humidity);
      }
    });
  }

  function makeSearchHistory() {
    $(".list-group").empty();
    for (var i = 0; i < searches.length; i++) {
      var li = $("<li>").addClass('list-group-item').css("background-color", "black").css("color", "gold").css("border-color", "gold");
      li.addClass("btn");
      li.attr("data-name", searches[i]);
      li.text(searches[i]);
      $(".list-group").append(li);
    }
  }

  $(".btn").on("click", function (event) {
    event.preventDefault();
    var city = $("#current-city").val().trim();
    searches.push(city);
    makeSearchHistory();
    getWeather();
    getForecast();
  });

  $(document).on("click", ".list-group-item", getWeather);
  $(document).on("click", ".list-group-item", getForecast);

  makeSearchHistory();
});

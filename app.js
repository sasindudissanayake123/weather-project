
const apiKey = "d2cf62b62ab0bf67c7d067d9f1aa4a31";

// Get Weather Details

function getWeather() {

    let city = document.getElementById("cityInput").value;

    if (city === "") {
        alert("Please enter a city name!");
        return;
    }

    fetchWeather(city);
}


// Fetch Weather API

function fetchWeather(city) {

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {

            if (!response.ok) {
                throw new Error("City not found!");
            }

            return response.json();

        })

        .then(data => {

            // City Name
            document.getElementById("cityName").innerHTML =
                data.name + ", " + data.sys.country;

            // Temperature
            document.getElementById("temperature").innerHTML =
                Math.round(data.main.temp) + "°";

            // Weather Description
            document.getElementById("description").innerHTML =
                data.weather[0].description;

            // Feels Like
            document.getElementById("feelsLike").innerHTML =
                Math.round(data.main.feels_like) + "°";

            // Humidity
            document.getElementById("humidity").innerHTML =
                data.main.humidity + "%";

            // Wind Speed
            document.getElementById("wind").innerHTML =
                data.wind.speed + " m/s";

            // Maximum Temperature
            document.getElementById("maxTemp").innerHTML =
                Math.round(data.main.temp_max) + "°";

            // Minimum Temperature
            document.getElementById("minTemp").innerHTML =
                Math.round(data.main.temp_min) + "°";

            // Weather Type
            document.getElementById("weatherType").innerHTML =
                data.weather[0].main;

            // Weather Icon
            let weather = data.weather[0].main;

            let icon = "☁️";

            if (weather === "Clear") {
                icon = "☀️";
            }
            else if (weather === "Clouds") {
                icon = "☁️";
            }
            else if (weather === "Rain") {
                icon = "🌧️";
            }
            else if (weather === "Drizzle") {
                icon = "🌦️";
            }
            else if (weather === "Thunderstorm") {
                icon = "⛈️";
            }
            else if (weather === "Snow") {
                icon = "❄️";
            }
            else if (weather === "Mist" || weather === "Fog") {
                icon = "🌫️";
            }

            document.getElementById("weatherIcon").innerHTML = icon;

        })

        .catch(error => {

            alert(error.message);

        });
}


// Search Popular Cities

function searchCity(city) {

    document.getElementById("cityInput").value = city;

    fetchWeather(city);

}


// Enter Key Event

document.getElementById("cityInput").addEventListener("keypress", function(event) {

    if (event.key === "Enter") {
        getWeather();
    }

});


// Display Current Date

let today = new Date();

document.getElementById("date").innerHTML =
    today.toDateString();


// Default City

fetchWeather("Colombo");

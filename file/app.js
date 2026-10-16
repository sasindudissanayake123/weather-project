
const apiKey = "d2cf62b62ab0bf67c7d067d9f1aa4a31";

function getWeather() {

    let city = document.getElementById("city").value;

    if (city == "") {
        document.getElementById("message").innerText =
            "Please enter a city name";
        return;
    }

    let url = "https://api.openweathermap.org/data/2.5/weather?q="
        + city + "&appid=" + apiKey + "&units=metric";

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {

            document.getElementById("weatherInfo").style.display = "block";

            document.getElementById("message").innerText = "";

            document.getElementById("cityName").innerText =
                data.name + ", " + data.sys.country;

            document.getElementById("temperature").innerText =
                Math.round(data.main.temp) + "°C";

            document.getElementById("description").innerText =
                data.weather[0].description;

            document.getElementById("humidity").innerText =
                data.main.humidity + "%";

            document.getElementById("wind").innerText =
                data.wind.speed + " m/s";

            document.getElementById("weatherIcon").src =
                "https://openweathermap.org/img/wn/"
                + data.weather[0].icon + "@2x.png";

        })
        .catch(error => {
            document.getElementById("weatherInfo").style.display = "none";
            document.getElementById("message").innerText =
                "City not found! Try again.";
        });
}

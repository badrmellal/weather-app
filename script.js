const apiSecret = "1974622256f4440699c95800230511"; // API key from WeatherAPI.com
const apiUrl = "https://api.weatherapi.com/v1/current.json"; // the API endpoint
const forecastApiUrl = "https://api.weatherapi.com/v1/forecast.json"; // Declare forecastApiUrl here

const searchField = document.querySelector(".search-field input");
const searchButton = document.querySelector(".search-field button");


async function getWeatherDetails(city) {

  try {

    const response = await fetch(`${apiUrl}?key=${apiSecret}&q=${city}`);
    const data = await response.json();

    // Checking here if the request was successful
    if (response.ok) {
      document.querySelector(".city").innerHTML = data.location.name;
      document.querySelector(".temperature").innerHTML =
        data.current.temp_c + " °C";
      
      document.querySelector(".condition").innerHTML =
        data.current.condition.text;

      document.querySelector(".wind-speed").innerHTML =
        data.current.wind_kph + " KM/H";

      document.querySelector(".weatherIcon").src = `https:${data.current.condition.icon}`;

      document.querySelector(".weather-details").style.display = "flex";
      getForecastData(city);

    } else {
      console.error(`Error: ${data.error.message}`);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  } 


  async function getForecastData(city) {
    try {
      const response = await fetch(`${forecastApiUrl}?key=${apiSecret}&q=${city}&days=3`);
      const data = await response.json();
  
      // Checking here if the request was successful
      if (response.ok) {
        // Call a function to display the forecast data
        displayForecast(data.forecast);
      } else {
        console.error(`Error fetching forecast data: ${data.error.message}`);
      }
    } catch (error) {
      console.error("An error occurred while fetching forecast data:", error);
    }
  }
  

  function displayForecast(forecastData) {
    const daysContainer = document.querySelector(".forecast-container");
  
    forecastData.forecastday.forEach(day => {
      const dayElement = document.createElement("div");
      dayElement.innerHTML = `
      </br>
        <p>Date: ${day.date}</p>
        <p>Temperature: ${day.day.avgtemp_c} °C</p>
        <p>Condition: ${day.day.condition.text}</p>
      </br>
        <!-- other forecast details as needed here -->
      `;
      daysContainer.appendChild(dayElement);
    });
  }


}
function searchButtonClick() {
  getWeatherDetails(searchField.value);
}

document.addEventListener('DOMContentLoaded', function() {
    const searchButton = document.querySelector(".search-field button");
    const searchField = document.querySelector(".search-field input");
    let isRefreshClicked = false;

    searchButton.addEventListener("click", () => {
      if (isRefreshClicked) {
        location.reload(); // Reloading the page when the button is clicked
      } else {
        getWeatherDetails(searchField.value);
        searchButton.innerHTML = "Refresh"; // changing the button text to "Refresh" after search is clicked
        isRefreshClicked = true; // flag here to true after search is clicked
      }
    });
    
});


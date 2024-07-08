const apiKey = '1acdfc8a05d682218c14c60c826b5fcf';

async function fetchData(city) {
    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`);
        if (!response.ok) {
            throw new Error(`City not found: ${city}`);
        }
        const data = await response.json();
        console.log('Data fetched successfully:', data);
        updateUI(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

const cityElement = document.querySelector(".city h2");
const temperatureElement = document.querySelector(".temp .temp-value");
const windSpeedElement = document.querySelector(".wind-speed");
const humidityElement = document.querySelector(".humidity");
const visibilityElement = document.querySelector(".visibility-distance");
const descriptionTextElement = document.querySelector(".sky .icon-text");
const descriptionIconElement = document.querySelector("#sun");

function updateUI(data) {
    console.log('Updating UI with data:', data);
    cityElement.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°`;
    windSpeedElement.textContent = `${data.wind.speed} km/h`;
    humidityElement.textContent = `${data.main.humidity}%`;
    visibilityElement.textContent = `${data.visibility / 1000} km`;
    descriptionTextElement.textContent = data.weather[0].description;
    const weatherIconName = getWeatherIconName(data.weather[0].main);
    descriptionIconElement.textContent = weatherIconName;
    console.log('UI updated successfully');
}

const formElement = document.querySelector(".search");
const inputElement = document.querySelector("#input");

formElement.addEventListener("submit", function (e) {
    e.preventDefault();
    const city = inputElement.value.trim();
    if (city !== "") {
        console.log(`Fetching data for city: ${city}`);
        fetchData(city);
        inputElement.value = "";
    }
});

function getWeatherIconName(weatherCondition) {
    const iconMap = {
        Clear: "wb_sunny",
        Clouds: "wb_cloudy",
        Rain: "umbrella",
        Thunderstorm: "flash_on",
        Drizzle: "grain",
        Snow: "ac_unit",
        Mist: "cloud",
        Smoke: "cloud",
        Haze: "cloud",
        Fog: "cloud",
    };
    return iconMap[weatherCondition] || "help";
}

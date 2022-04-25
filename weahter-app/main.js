const searchBtn = document.querySelector('.btn');
const currentCity = document.querySelector('.current-city');
const currentCityLocation = document.querySelector('.current-city-location');
const currentTemp = document.querySelector('.current-temp');
const currentIcon = document.querySelector('.current-icon');
const weatherDescription = document.querySelector('.weather-description');

searchBtn.addEventListener('click', fetchWeather);
const API_KEY = '0a0a00077254b920fcee144964349838';

async function fetchWeather() {
	// Saving the data from our fetchLatLon() function.
	const location = await fetchLatLon();

	// destructuring the data, for us to use in a new fetch
	const [lat, lon, searchInput] = location;

	// fetching the weather data providing a specific lat and lon.
	const resWeather = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	);
	const dataWeather = await resWeather.json();
	console.log(dataWeather);

	// destructuring the data we receive back from our fetch (after we parse)
	let { name, main, wind, weather } = dataWeather;

	// Inserting data into the DOM.
	currentCity.innerText = `${searchInput},`;
	currentCityLocation.innerText = ` ${name}`;
	currentTemp.innerText = `${main.temp.toFixed(1)} °C`;
	currentIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png
	`;

	weatherDescription.innerText = weather[0].main;

	console.log(weather.icon);
}

// In order for us to fetch the weather, we need lattitude and longtitude for the city/location we are inputting.

async function fetchLatLon() {
	// Getting the value from the text input (what the user is searching for)
	const searchInput = document.querySelector('input').value;
	// Fetching the data, using the fetch API (using await cause this is async)
	const resLanLon = await fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${searchInput}&limit=1&appid=${API_KEY}`
	);
	// parsing the json to a javascript object. .json() method also returns a promise, so we await this to get resolved.
	const dataLanLon = await resLanLon.json();

	// Destructuring the lat and lon properties from the first array element in the object.
	const { lat, lon } = dataLanLon[0];

	// returning the lat, lon and searchInput variables which will be used in our other function to fetch the weather.
	return [lat, lon, searchInput];
}

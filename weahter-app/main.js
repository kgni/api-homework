const searchBtn = document.querySelector('.btn');
const currentCity = document.querySelector('.current-city');
const currentCityLocation = document.querySelector('.current-city-location');
const currentTemp = document.querySelector('.current-temp');
const currentIcon = document.querySelector('.current-icon');
const weatherDescription = document.querySelector('.weather-description');
const windText = document.querySelector('.wind');
const humidText = document.querySelector('.humid');

const loader = document.querySelector('.loader');

searchBtn.addEventListener('click', fetchWeather);
const API_KEY = '0a0a00077254b920fcee144964349838';

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

async function fetchWeather() {
	loader.classList.remove('hide');
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

	// Formatting searchInput

	// Inserting data into the DOM.
	currentCity.innerText = `${searchInput}`;
	currentTemp.innerText = `${main.temp.toFixed(0)}°`;
	currentIcon.src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png
	`;

	weatherDescription.innerText = weather[0].main;
	windText.innerText = `${wind.speed.toFixed(1)} m/s`;
	humidText.innerText = `${main.humidity} %`;
	await fetchForecast();

	setTimeout(() => {
		loader.classList.add('hide');
	}, 150);
}

// TODO - Fetch forecast

async function fetchForecast() {
	// Saving the data from our fetchLatLon() function.
	const location = await fetchLatLon();

	// destructuring the data, for us to use in a new fetch
	const [lat, lon] = location;
	const resForecast = await fetch(
		`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=${API_KEY}&units=metric`
	);

	const dataForecast = await resForecast.json();

	console.log(dataForecast);

	const card = document.querySelectorAll('.card');
	card.forEach((el) => {
		el.remove();
	});

	dataForecast.daily.forEach((day) => {
		const forecast = document.querySelector('.forecast');
		const card = document.createElement('div');
		card.classList.add('card');
		forecast.appendChild(card);
		// const dayEl = document.createElement('h3');
		// dayEl.innerText = new Date(day.dt);
		// dayEl.classList.add('day');
		// forecast.appendChild(dayEl);

		const icon = document.createElement('img');
		icon.src = `http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`;
		icon.classList.add('current-icon');

		const weather = document.createElement('h3');
		weather.innerText = day.weather[0].main;
		weather.classList.add('weather-description');

		const temp = document.createElement('h2');
		temp.innerText = `${day.temp.day.toFixed(1)}°C`;
		temp.classList.add('temp');

		const windHumidContainer = document.createElement('div');
		windHumidContainer.classList.add('wind-humid-container');

		const windContainer = document.createElement('div');
		windContainer.classList.add('wind-container');

		const windIcon = document.createElement('i');
		windIcon.classList.add('fa-solid', 'fa-wind');
		const wind = document.createElement('h4');
		wind.innerText = `${day.wind_speed.toFixed(1)} m/s`;

		const humidContainer = document.createElement('div');
		humidContainer.classList.add('humid-container');

		const humidIcon = document.createElement('i');
		humidIcon.classList.add('fa-solid', 'fa-droplet');

		const humid = document.createElement('h4');
		humid.innerText = `${day.humidity}%`;

		card.appendChild(icon);
		card.appendChild(weather);
		card.appendChild(temp);
		card.appendChild(windHumidContainer);
		windHumidContainer.appendChild(windContainer);
		windHumidContainer.appendChild(humidContainer);
		windContainer.appendChild(windIcon);
		windContainer.appendChild(wind);

		humidContainer.appendChild(humidIcon);
		humidContainer.appendChild(humid);
	});

	// console.log(day1.toLocaleString('en-us', { weekday: 'long' }));
}

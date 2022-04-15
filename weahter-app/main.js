const btn = document.querySelector('button');
btn.addEventListener('click', fetchWeather);
const API_KEY = '0a0a00077254b920fcee144964349838';

function fetchLatLon() {
	const input = document.querySelector('input').value;
	return fetch(
		`http://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=1&appid=${API_KEY}`
	)
		.then((res) => res.json())
		.then((data) => {
			let lat = data[0].lat;
			let lon = data[0].lon;
			return [lat, lon];
		});
}

async function fetchWeather() {
	let latLon = await fetchLatLon();
	let lat = latLon[0];
	let lon = latLon[1];

	fetch(
		`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`
	)
		.then((res) => res.json())
		.then((data) => {
			document.querySelector('.place').innerText = data.name;
			document.querySelector('.weather').innerText = data.weather[0].main;

			document.querySelector(
				'.weather-icon'
			).src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
			document.querySelector(
				'.temperature'
			).innerText = `${data.main.temp.toFixed(1)} ℃`;
			document.querySelector(
				'.chill-factor'
			).innerText = `Feels like: ${data.main.feels_like.toFixed(1)} ℃`;
			document.querySelector(
				'.wind'
			).innerText = `Wind: ${data.wind.speed.toFixed(1)}ms`;

			const dateSunrise = new Date(data.sys.sunrise);
			const timeSunrise = dateSunrise.toLocaleTimeString([], {
				hourCycle: 'h23',
				hour: '2-digit',
				minute: '2-digit',
			});

			let dateSunset = new Date(data.sys.sunset);
			let timeSunset = dateSunset.toLocaleTimeString('en-GB', {
				hourCycle: 'h23',
				hour: '2-digit',
				minute: '2-digit',
			});
			document.querySelector('.sunrise-img').src = 'img/sunrise.png';
			document.querySelector('.sunset-img').src = 'img/sunset.png';
			document.querySelector('.sunrise').innerText = `${timeSunrise}`;
			document.querySelector('.sunset').innerText = `${timeSunset}`;
		})
		.catch((err) => console.log(err));
}

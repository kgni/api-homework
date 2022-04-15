//Example fetch using pokemonapi.co
document.querySelector('button').addEventListener('click', getFetch);

function getFetch() {
	const choice = document.querySelector('input').value;
	console.log(choice);
	const url = `https://api.nasa.gov/planetary/apod?api_key=a9fvNMFgCjcEs4tRHJIZqS7UPGeGYWuF5hOdqsOn&date=${choice}`;

	fetch(url)
		.then((res) => res.json()) // parse response as JSON
		.then((data) => {
			console.log(data);
			document.querySelector('h2').innerText = data.date;

			if (data.media_type === 'image') {
				document.querySelector('img').src = data.hdurl;
				document.querySelector('iframe').src = null;
			} else if (data.media_type === 'video') {
				document.querySelector('img').src = null;
				document.querySelector('iframe').src = data.url;
			}
			document.querySelector('p').innerText = data.explanation;
		})
		.catch((err) => {
			console.log(`error ${err}`);
		});
}

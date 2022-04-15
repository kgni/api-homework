const ul = document.querySelector('ul');

document.querySelector('button').addEventListener('click', randomCat);

function randomCat() {
	const gridContainer = document.querySelector('.grid');
	fetch('https://api.thecatapi.com/v1/images/search')
		.then((res) => res.json())
		.then((data) => {
			let img = document.createElement('img');
			img.src = data[0].url;
			gridContainer.appendChild(img);
		});
}

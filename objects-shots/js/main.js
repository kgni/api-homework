//The user will enter a cocktail. Get a cocktail name, photo, and instructions and place them in the DOM
// document.querySelector('button').addEventListener('click', getDrink);
document.querySelector('input').addEventListener('keyup', getDrink);

function getDrink() {
	if (document.querySelector('input').value == '') {
		reset();
	} else {
		let drink = document.querySelector('input').value;
		const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${drink}`;
		fetch(url)
			.then((res) => res.json())
			.then((data) => {
				document.querySelector('h2').innerText = data.drinks[0].strDrink;
				document.querySelector('img').src = data.drinks[0].strDrinkThumb;
				document.querySelector('h3').innerText = 'Instructions';
				document.querySelector('p').innerText = data.drinks[0].strInstructions;

				// Add instructional video if it is not equal to null
				if (data.drinks[0].strVideo === null) {
					document.querySelector('a').style.display = 'none';
					document.querySelector('a').innerText = '';
				} else {
					document.querySelector('a').style.display = 'inline-block';
					document.querySelector('a').href = data.drinks[0].strVideo;
					document.querySelector('a').innerText = 'Instructional Video';
				}

				document.querySelector('.ingredients').innerText = 'Ingredients';

				let ul = document.querySelector('ul');

				for (let i = 1; i <= 15; i++) {
					let strIngredient = 'strIngredient' + i;
					if (data.drinks[0][strIngredient] === null) {
						break;
					} else {
						let li = document.createElement('li');
						li.innerText = data.drinks[0][strIngredient];
						ul.appendChild(li);

						console.log(data.drinks[0][strIngredient]);
					}
				}
			})
			.catch((err) => {
				console.log(`error ${err}`);
			});
	}
}

function reset() {
	document.querySelector('h2').innerText = '';
	document.querySelector('img').src = '';
	document.querySelector('h3').innerText = '';
	document.querySelector('p').innerText = '';
	document.querySelector('a').href = '';
	document.querySelector('a').innerText = '';
	document.querySelector('.ingredients').innerText = '';
}

// name.innerText = `${data.strDrink}`;
// strInstructions;

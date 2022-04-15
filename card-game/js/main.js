if (!localStorage.getItem('deckId')) {
	let deckId = '';
	fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			deckId = data.deck_id;
			localStorage.setItem('deckId', deckId);
			document.querySelector('p').innerText = data.remaining;

			localStorage.setItem('playerOneCount', 0);
			localStorage.setItem('playerTwoCount', 0);
		});
} else {
	let deckId = localStorage.getItem('deckId');
	fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			document.querySelector('p').innerText = data.remaining;
		});
	document.querySelector(
		'.playerOneScore'
	).innerText = `Player 1 cards: ${localStorage.getItem('playerOneCount')}`;
	document.querySelector(
		'.playerTwoScore'
	).innerText = `Player 2 cards: ${localStorage.getItem('playerTwoCount')}`;
}

document.querySelector('button').addEventListener('click', drawTwo);
document.querySelector('.new-deck').addEventListener('click', newDeck);
document.querySelector('.reset').addEventListener('click', reset);

function drawTwo() {
	let deckId = localStorage.getItem('deckId');
	let playerOneCount = Number(localStorage.getItem('playerOneCount'));
	let playerTwoCount = Number(localStorage.getItem('playerTwoCount'));
	fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
		.then((res) => res.json())
		.then((data) => {
			if (data.remaining === 0) {
				document.querySelector('p').innerText = data.remaining;
				alert('No more cards!');
				console.log('No more cards');
				return;
			}

			document.querySelector('p').innerText = data.remaining;

			let playerOne = convertToNum(data.cards[0].value);
			let playerTwo = convertToNum(data.cards[1].value);
			document.querySelector('#player1').src = data.cards[0].image;
			document.querySelector('#player2').src = data.cards[1].image;

			document.querySelector('#player2').src = data.cards[1].image;
			if (playerOne > playerTwo) {
				document.querySelector('.winner').innerText = 'Player 1 wins';
				playerOneCount += 2;
				localStorage.setItem('playerOneCount', playerOneCount);
				document.querySelector(
					'.playerOneScore'
				).innerText = `Player 1 cards: ${playerOneCount}`;
			} else if (playerOne < playerTwo) {
				document.querySelector('.winner').innerText = 'Player 2 wins';
				playerTwoCount += 2;
				localStorage.setItem('playerTwoCount', playerTwoCount);
				document.querySelector(
					'.playerTwoScore'
				).innerText = `Player 2 cards: ${playerTwoCount}`;
			} else {
				alert('WAR!!!');
			}
		});
}

function convertToNum(val) {
	if (val === 'ACE') {
		return 14;
	} else if (val === 'KING') {
		return 13;
	} else if (val === 'QUEEN') {
		return 12;
	} else if (val === 'JACK') {
		return 11;
	} else {
		return Number(val);
	}
}

function newDeck() {
	let deckId = '';
	fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			deckId = data.deck_id;
			localStorage.setItem('deckId', deckId);
			document.querySelector('p').innerText = data.remaining;
		});
}

function reset() {
	let deckId = '';
	fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
		.then((res) => res.json())
		.then((data) => {
			console.log(data);
			deckId = data.deck_id;
			localStorage.setItem('deckId', deckId);
			document.querySelector('p').innerText = data.remaining;
			localStorage.setItem('playerOneCount', 0);
			localStorage.setItem('playerTwoCount', 0);

			document.querySelector('.playerOneScore').innerText = `Player 1 cards: 0`;
			document.querySelector('.playerTwoScore').innerText = `Player 2 cards: 0`;
		});
}

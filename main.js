// This file is part of the little memory game.
// It is free and open source.
// Written in plain JavaScript.
// Author: Nazımcan İslam

// Get the element that will cover the game's cards via its ID.
const container = document.getElementById('container');

// Oyundaki semboller ve onlara özel olarak seçtiğim şarkı tutan bir tanımla.
const symbols = {
	'love': ['fas fa-heart', '#9b59b6'],
	'python': ['fab fa-python', '#3498db'],
	'java': ['fab fa-java', '#e67e22'],
	'apple': ['fab fa-apple', '#bdc3c7'],
	'android': ['fab fa-android', '#2ecc71'],
	'google': ['fab fa-google', '#e74c3c']
}

// Since this is a memory game with matching one, two cards, double the card symbols and mix them in the list.
let cardNames = [];
for (let i = 0; i < 2; i++) {
	for (let item in symbols) {
		cardNames.push(item);
	}
}
cardNames = cardNames.sort(() => Math.random() - 0.5);

// Create a loop that will spin the number of cards.
// Each time, create new cards using the names and colors of the shuffled cards in order and add them to the main container.
// Finally, delete any unused variables.
let index = 0;
for (let i = 0; i < 12; i++) {
	/* Example
	<div class="box">
		<div class="box-inner">
			<div class="box-front">
				<i class="fas fa-heart"></i>
			</div>
			<div class="box-back">
				<i class="fas fa-question"></i>
			</div>
		</div>
	</div>
	*/

	let boxNode = document.createElement('div');
	let boxInnerNode = document.createElement('div');
	let boxFrontNode = document.createElement('div');
	let iconNode = document.createElement('i');
	let backIconNode = document.createElement('i');
	let boxBackNode = document.createElement('div');

	boxNode.setAttribute('class', 'box flip');
	boxInnerNode.setAttribute('class', 'box-inner');
	boxFrontNode.setAttribute('class', 'box-front');
	boxFrontNode.style.backgroundColor = symbols[cardNames[index]][1];
	iconNode.setAttribute('class', symbols[cardNames[index]][0]);
	backIconNode.setAttribute('class', 'fas fa-question');
	boxBackNode.setAttribute('class', 'box-back');

	boxNode.appendChild(boxInnerNode);
	boxInnerNode.appendChild(boxFrontNode);
	boxBackNode.appendChild(backIconNode);
	boxInnerNode.appendChild(boxBackNode);
	boxFrontNode.appendChild(iconNode);

	container.appendChild(boxNode);

	index++;
}
delete index;
delete cardNames;

let firstSelected = null;
let secondSelected = null;
let playable = true;

const allCards = document.querySelectorAll('.box');
allCards.forEach((card, index) => {
	card.addEventListener('click', () => {
		if (playable) {
			if (!card.classList.contains('done')) {
				card.classList.toggle('flip');

				if (firstSelected == null) {
					firstSelected = card;
				} else {
					if (firstSelected != null && secondSelected == null) {
						secondSelected = card;
					}
				}

				if (firstSelected != null && secondSelected != null) {
					playable = false;

					if (firstSelected.querySelector('.box-inner .box-front i').classList.value === secondSelected.querySelector('.box-inner .box-front i').classList.value) {
						firstSelected.classList.add('done');
						secondSelected.classList.add('done');
						firstSelected = null;
						secondSelected = null;

						playable = true;
					} else {
						setTimeout(() => {
							firstSelected.classList.toggle('flip');
							secondSelected.classList.toggle('flip');
							firstSelected = null;
							secondSelected = null;

							playable = true;
						}, 1000);
					}
				}
			}
		}
	});
});

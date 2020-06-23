import React from 'react';

// Components
import Card from './Card';

// TEMP FOR TESTING ONLY!!!
const testArray = [
	{
		text: 'card #1'
	},
	{
		text: 'card #2'
	},
	{
		text: 'card #3'
	},
	{
		text: 'card #4'
	},
	{
		text: 'card #5'
	}
];

function CardGrid(props) {
	let cardCount = testArray.length;

	console.log('cardCount: ', cardCount);
	return (
		<div className="cardgrid-wrapper">
			<h1>Card Grid Component</h1>
			<Card cards={testArray} />
		</div>
	);
}

export default CardGrid;

import React from 'react';

// Components
import Card from './Card';

function CardGrid(props) {
	// let cardCount = testArray.length;
	let { cardCount, cardContent } = props;

	console.log('cardCount: ', cardCount);
	return (
		<div className="cardgrid-wrapper">
			<h1>Card Grid Component</h1>
			<Card cards={cardContent} />
		</div>
	);
}

export default CardGrid;

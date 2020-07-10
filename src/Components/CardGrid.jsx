import React from 'react';

// Components
import Card from './Card';

function CardGrid(props) {
	let { cardCount, cardContent, contentType } = props;

	let title = '';

	if (contentType === 'search') title = 'Search Results Found on Wikipedia...';
	else if (contentType === 'tweets') title = 'Top Trending Tweet topics found on Wikipedia...';
	else if (contentType === 'loading') title = 'Loading results...';

	return (
		<div className="cardgrid-container">
			<p className="cardgrid-title">{title}</p>
			<div className="cardgrid-wrapper masonry">
				<Card cards={cardContent} />
			</div>
		</div>
	);
}

export default CardGrid;

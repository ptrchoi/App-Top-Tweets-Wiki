import React from 'react';

// Components
import Card from './Card';

function CardGrid(props) {
	let { cardCount, cardContent, contentType } = props;

	let title = '';
	let spinnerClass = 'spinning-anim';
	let titleClass = 'title';

	// console.log('<Cardgrid > contentType: ', contentType);

	if (contentType === 'search') title = 'Search Results Found on Wikipedia';
	else if (contentType === 'tweets') title = 'Top Trending Tweet Topics Found on Wikipedia';
	else if (contentType === 'loading') {
		title = 'Searching Wikipedia';
		titleClass += '--animate';
		spinnerClass += '--show';
	}

	return (
		<div className="cardgrid-container">
			<div className="cardgrid-banner">
				<div className={spinnerClass} />
				<div className={titleClass}>{title}</div>
			</div>
			<div className="cardgrid-wrapper masonry">
				<Card cards={cardContent} />
			</div>
		</div>
	);
}

export default CardGrid;
